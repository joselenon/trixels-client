import React, { ReactNode, useContext, useEffect, useState } from 'react';

import RafflesGQL from '../graphql/RafflesGQL';
import { gqlQuery, gqlSubscription } from '../hooks/useGraphQLService';
import { TGetRafflesResponseRaw, TGetRafflesResponseTreated } from '../interfaces/IGQLResponses';
import { IRaffleToFrontEndTreated, TRaffleWinnersPrizes } from '../interfaces/IRaffles';

const RafflesContext = React.createContext<{
  updatedRaffles: TGetRafflesResponseTreated | undefined;
}>({
  updatedRaffles: undefined,
});

export default function RafflesContextProvider({ children }: { children: ReactNode }) {
  const [updatedRaffles, setUpdatedRaffles] = useState<TGetRafflesResponseTreated | undefined>(undefined);

  const queryResponse = gqlQuery<TGetRafflesResponseRaw, 'getRaffles'>({
    gql: RafflesGQL.GET_RAFFLES,
    loginRequired: false,
  });

  const subscriptionResponse = gqlSubscription<TGetRafflesResponseRaw, 'getLiveRaffles'>({
    gql: RafflesGQL.GET_LIVE_RAFFLES,
    loginRequired: false,
  });

  useEffect(() => {
    const handleData = (data: TGetRafflesResponseRaw) => {
      const activeRafflesTreated: IRaffleToFrontEndTreated[] = data.activeRaffles.map((raffle) => ({
        ...raffle,
        createdAt: parseInt(raffle.createdAt),
        finishedAt: raffle.finishedAt ? parseInt(raffle.finishedAt) : undefined,
        info: {
          ...raffle.info,
          prizes: JSON.parse(raffle.info.prizes) as TRaffleWinnersPrizes,
        },
      }));

      const endedRafflesTreated: IRaffleToFrontEndTreated[] = data.endedRaffles.map((raffle) => ({
        ...raffle,
        createdAt: parseInt(raffle.createdAt),
        finishedAt: raffle.finishedAt ? parseInt(raffle.finishedAt) : undefined,
        info: {
          ...raffle.info,
          prizes: JSON.parse(raffle.info.prizes) as TRaffleWinnersPrizes,
        },
      }));

      setUpdatedRaffles({
        activeRaffles: activeRafflesTreated,
        endedRaffles: endedRafflesTreated,
      });
    };

    if (subscriptionResponse?.data?.getLiveRaffles?.data) {
      handleData(subscriptionResponse.data.getLiveRaffles.data);
    } else if (queryResponse?.data?.getRaffles?.data) {
      handleData(queryResponse.data.getRaffles.data);
    }
  }, [queryResponse?.data, subscriptionResponse?.data]);

  return <RafflesContext.Provider value={{ updatedRaffles }}>{children}</RafflesContext.Provider>;
}

export function useRafflesContext() {
  return useContext(RafflesContext);
}
