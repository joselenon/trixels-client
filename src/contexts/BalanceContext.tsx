import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import React, { ReactNode, useContext } from 'react';

import USER_QUERIES from '../graphql/UserInfoGQL';
import { gqlQuery, gqlSubscription } from '../hooks/useGraphQLService';
import { IGQLResponses } from '../interfaces/IGQLResponses';

const BalanceContext = React.createContext<{
  balance: {
    data: { getBalance: IGQLResponses<{ balance: number }> } | undefined;
    liveData: { getLiveBalance: IGQLResponses<{ balance: number }> } | undefined;
    refetch:
      | ((
          variables?: Partial<OperationVariables> | undefined,
        ) => Promise<ApolloQueryResult<any>>)
      | undefined;
  };
}>({
  balance: { data: undefined, liveData: undefined, refetch: undefined },
});

export default function BalanceContextProvider({ children }: { children: ReactNode }) {
  const { data, refetch } = gqlQuery<{ balance: number }, 'getBalance'>({
    gql: USER_QUERIES.GET_BALANCE,
  });

  const { data: liveData } = gqlSubscription<{ balance: number }, 'getLiveBalance'>({
    gql: USER_QUERIES.GET_LIVE_BALANCE,
  });

  console.log(data, liveData);

  return (
    <BalanceContext.Provider value={{ balance: { data, refetch, liveData } }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalanceContext() {
  return useContext(BalanceContext);
}
