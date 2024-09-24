import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Client, createClient } from 'graphql-ws';

import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';
import CookiesService from './CookiesService';

class GraphQLClientService {
  private httpLink: HttpLink;
  private wsClient: Client | null = null;
  private wsLink: GraphQLWsLink | null = null;
  private splitLink: any;
  private apolloClient: ApolloClient<any>;

  constructor() {
    this.httpLink = this.createHttpLink();
    this.wsLink = this.createWsLink();
    this.splitLink = this.createSplitLink(this.httpLink, this.wsLink);

    this.apolloClient = this.createApolloClient(this.splitLink);

    // Adiciona um listener para mudanças nos cookies JWT
    CookiesService.addChangeListener(() => this.handleCookieChange());
  }

  private handleCookieChange() {
    // Atualiza o httpLink com o novo token JWT
    this.httpLink = this.createHttpLink();

    // Recria o wsClient e wsLink com o novo token JWT
    this.wsLink = this.createWsLink();

    // Recria o splitLink com os links atualizados
    this.splitLink = this.createSplitLink(this.httpLink, this.wsLink);

    // Recria o Apollo Client com o novo splitLink
    this.apolloClient = this.createApolloClient(this.splitLink);
  }

  private createHttpLink() {
    const token = CookiesService.get(JWTCookie.key);

    return new HttpLink({
      uri: `${URLS.MAIN_URLS.API_URL}${URLS.ENDPOINTS.GRAPHQL}`,
      headers: {
        Authorization: token ? token : '',
      },
    });
  }

  private createWsClient(token: string) {
    return createClient({
      url: `${URLS.MAIN_URLS.WS_API_URL_WITH_PROTOCOl}${URLS.ENDPOINTS.GRAPHQL}`,
      connectionParams: { Authorization: token ? token : '' },
      lazy: true,
    });
  }

  private createWsLink() {
    const token = CookiesService.get(JWTCookie.key);

    if (token) {
      this.wsClient = this.createWsClient(token);
    }

    return new GraphQLWsLink(this.wsClient as Client);
  }

  private createSplitLink(httpLink: HttpLink, wsLink: GraphQLWsLink | null) {
    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink as any,
      httpLink,
    );
  }

  private createApolloClient(splitLink: any) {
    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              getUser: {
                merge(_, incoming) {
                  return incoming;
                },
              },
              getRaffles: {
                merge(_, incoming) {
                  return incoming;
                },
              },
            },
          },
          Subscription: {
            fields: {
              getBalance: {
                merge(_, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      }),
    });
  }

  getClient() {
    return this.apolloClient;
  }
}

export default new GraphQLClientService();
