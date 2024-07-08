import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import USER_QUERIES from '../graphql/UserInfoGQL';
import { gqlQuery, gqlSubscription } from '../hooks/useGraphQLService';
import { IGQLResponses } from '../interfaces/IGQLResponses';

interface BalanceContextType {
  balance: {
    data: { getBalance: IGQLResponses<{ balance: number }> } | undefined;
    liveData: { getLiveBalance: IGQLResponses<{ balance: number }> } | undefined;
    refetch: ((variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>) | undefined;
  };
}

const BalanceContext = React.createContext<BalanceContextType>({
  balance: { data: undefined, liveData: undefined, refetch: undefined },
});

export default function BalanceContextProvider({ children }: { children: ReactNode }) {
  const [balanceData, setBalanceData] = useState<{ getBalance: IGQLResponses<{ balance: number }> } | undefined>(
    undefined,
  );
  const [liveBalanceData, setLiveBalanceData] = useState<
    { getLiveBalance: IGQLResponses<{ balance: number }> } | undefined
  >(undefined);

  const queryResponse = gqlQuery<{ balance: number }, 'getBalance'>({
    gql: USER_QUERIES.GET_BALANCE,
    loginRequired: true,
  });

  const subscriptionResponse = gqlSubscription<{ balance: number }, 'getLiveBalance'>({
    gql: USER_QUERIES.GET_LIVE_BALANCE,
    loginRequired: true,
  });

  useEffect(() => {
    if (queryResponse && queryResponse.data) {
      setBalanceData(queryResponse.data);
    }
  }, [queryResponse && queryResponse.data]);

  useEffect(() => {
    if (subscriptionResponse && subscriptionResponse.data) {
      setLiveBalanceData(subscriptionResponse.data);
    }
  }, [subscriptionResponse && subscriptionResponse.data]);

  return (
    <BalanceContext.Provider
      value={{
        balance: {
          data: balanceData,
          liveData: liveBalanceData,
          refetch: queryResponse?.refetch ? queryResponse.refetch : undefined,
        },
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalanceContext() {
  return useContext(BalanceContext);
}
