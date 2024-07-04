import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import React, { ReactNode, useContext, useState } from 'react';

import RafflesGQL from '../graphql/RafflesGQL';
import { gqlQuery, gqlSubscription } from '../hooks/useGraphQLService';
import { IGQLResponses, TGetRafflesResponseRaw } from '../interfaces/IGQLResponses';

const RafflesContext = React.createContext<{
  raffles: {
    data: { getRaffles: IGQLResponses<TGetRafflesResponseRaw> } | undefined;
    liveData: { getLiveRaffles: IGQLResponses<TGetRafflesResponseRaw> } | undefined;
    refetch: ((variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>) | undefined;
  };
}>({
  raffles: { data: undefined, liveData: undefined, refetch: undefined },
});

export default function RafflesContextProvider({ children }: { children: ReactNode }) {
  const queryResponse = gqlQuery<TGetRafflesResponseRaw, 'getRaffles'>({
    gql: RafflesGQL.GET_RAFFLES,
    loginRequired: false,
  });

  const subscriptionResponse = gqlSubscription<TGetRafflesResponseRaw, 'getLiveRaffles'>({
    gql: RafflesGQL.GET_LIVE_RAFFLES,
    loginRequired: false,
  });

  return (
    <RafflesContext.Provider
      value={{
        raffles: {
          data: queryResponse ? queryResponse.data : undefined,
          liveData: subscriptionResponse ? subscriptionResponse.data : undefined,
          refetch: queryResponse ? queryResponse.refetch : undefined,
        },
      }}
    >
      {children}
    </RafflesContext.Provider>
  );
}

export function useRafflesContext() {
  return useContext(RafflesContext);
}
