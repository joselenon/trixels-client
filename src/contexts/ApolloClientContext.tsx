import React, { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { ApolloProvider } from '@apollo/client';
import GraphQLClientService from '../services/GraphQLClientService';
import CookiesService from '../services/CookiesService';

export const ApolloClientContext = createContext(GraphQLClientService.getClient());

export function ApolloClientProvider({ children }: { children: ReactNode }) {
  const [apolloClient, setApolloClient] = useState(GraphQLClientService.getClient());

  useEffect(() => {
    function updateApolloClient() {
      console.log('Cookie changed');
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
