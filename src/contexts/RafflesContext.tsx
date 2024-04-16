import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import React, { ReactNode, useContext } from 'react';

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
  const { data, refetch } = gqlQuery<TGetRafflesResponseRaw, 'getRaffles'>({
    gql: RafflesGQL.GET_RAFFLES,
  });

  const { data: liveData } = gqlSubscription<TGetRafflesResponseRaw, 'getLiveRaffles'>({
    gql: RafflesGQL.GET_LIVE_RAFFLES,
  });

  return <RafflesContext.Provider value={{ raffles: { data, liveData, refetch } }}>{children}</RafflesContext.Provider>;
}

export function useRafflesContext() {
  return useContext(RafflesContext);
}
