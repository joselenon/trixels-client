import { ApolloProvider } from '@apollo/client';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import CookiesService from '../services/CookiesService';
import GraphQLClientService from '../services/GraphQLClientService';

export const ApolloClientContext = createContext(GraphQLClientService.getClient());

export function ApolloClientProvider({ children }: { children: ReactNode }) {
  const [apolloClient, setApolloClient] = useState(GraphQLClientService.getClient());

  useEffect(() => {
    function updateApolloClient() {
      setApolloClient(GraphQLClientService.getClient());
    }

    CookiesService.addChangeListener(updateApolloClient);

    return () => {
      CookiesService.removeChangeListener(updateApolloClient);
    };
  }, []);

  return (
    <ApolloClientContext.Provider value={apolloClient}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  );
}
