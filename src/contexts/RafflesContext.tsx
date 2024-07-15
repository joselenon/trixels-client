import React, { ReactNode, useContext, useEffect, useState } from 'react';

import RafflesGQL from '../graphql/RafflesGQL';
import { gqlQuery, gqlSubscription } from '../hooks/useGraphQLService';
import { TGetRafflesResponseRaw } from '../interfaces/IGQLResponses';
import { IRaffleToFrontEndTreated, TRaffleWinnersPrizes } from '../interfaces/IRaffles';

const RafflesContext = React.createContext<{
  activeRaffles: IRaffleToFrontEndTreated[] | null;
  endedRaffles: IRaffleToFrontEndTreated[] | null;
}>({
  activeRaffles: null,
  endedRaffles: null,
});

export default function RafflesContextProvider({ children }: { children: ReactNode }) {
  const [activeRaffles, setActiveRaffles] = useState<IRaffleToFrontEndTreated[] | null>(null);
  const [endedRaffles, setEndedRaffles] = useState<IRaffleToFrontEndTreated[] | null>(null);
  const [initialQueryDone, setInitialQueryDone] = useState(false);

  const queryResponse = gqlQuery<TGetRafflesResponseRaw, 'getRaffles'>({
    gql: RafflesGQL.GET_RAFFLES,
    loginRequired: false,
  });

  const subscriptionResponse = gqlSubscription<TGetRafflesResponseRaw, 'getLiveRaffles'>({
    gql: RafflesGQL.GET_LIVE_RAFFLES,
    loginRequired: false,
  });

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

    setActiveRaffles(activeRafflesTreated);
    setEndedRaffles(endedRafflesTreated);
  };

  useEffect(() => {
    if (!initialQueryDone && queryResponse?.data?.getRaffles?.data) {
      handleData(queryResponse.data.getRaffles.data);
      setInitialQueryDone(true);
    }
  }, [queryResponse?.data, initialQueryDone]);

  useEffect(() => {
    if (initialQueryDone && subscriptionResponse?.data?.getLiveRaffles?.data) {
      handleData(subscriptionResponse.data.getLiveRaffles.data);
    }
  }, [subscriptionResponse?.data, initialQueryDone]);

  return <RafflesContext.Provider value={{ activeRaffles, endedRaffles }}>{children}</RafflesContext.Provider>;
}

export function useRafflesContext() {
  return useContext(RafflesContext);
}
