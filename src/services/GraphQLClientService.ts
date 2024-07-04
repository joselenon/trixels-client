import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Client, createClient } from 'graphql-ws';
import { JWTCookie } from '../config/app/CookiesConfig';
import URLS from '../config/constants/URLS';
import CookiesService from './CookiesService';

class GraphQLClientService {
  private httpLink: HttpLink;
  private wsLink: GraphQLWsLink | null = null;
  private splitLink: any;
  private apolloClient: ApolloClient<any>;
  private wsClient: Client | null = null;

  constructor() {
    this.httpLink = this.createHttpLink();
    this.wsLink = new GraphQLWsLink(this.createWsClient());
    this.splitLink = this.createSplitLink(this.httpLink, this.wsLink);

    this.apolloClient = this.createApolloClient(this.splitLink);

    CookiesService.addChangeListener(() => this.updateLinks());
  }

  private createHttpLink() {
    return new HttpLink({
      uri: `${URLS.MAIN_URLS.API_URL}${URLS.ENDPOINTS.GRAPHQL}`,
    });
  }

  private createWsClient() {
    const token = CookiesService.get(JWTCookie.key);

    return createClient({
      url: `${URLS.MAIN_URLS.WS_API_URL}${URLS.ENDPOINTS.GRAPHQL}`,
      connectionParams: { Authorization: `Bearer ${token}` },
      lazy: true,
    });
  }

  private createWsLink() {
    if (this.wsClient) {
      this.wsClient.dispose();
    }
    this.wsClient = this.createWsClient();
    return new GraphQLWsLink(this.wsClient);
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

  private updateLinks() {
    this.httpLink = this.createHttpLink();
    this.wsLink = this.createWsLink();
    this.splitLink = this.createSplitLink(this.httpLink, this.wsLink);
    this.apolloClient = this.createApolloClient(this.splitLink);
  }

  getClient() {
    return this.apolloClient;
  }
}

export default new GraphQLClientService();
