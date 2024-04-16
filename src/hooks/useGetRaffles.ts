import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useRafflesContext } from '../contexts/RafflesContext';
import { TGetRafflesResponseTreated } from '../interfaces/IGQLResponses';
import { IRaffleToFrontEndTreated, TRaffleWinnersPrizes } from '../interfaces/IRaffles';

export default function useGetRaffles() {
  const { raffles } = useRafflesContext();
  const { data, liveData, refetch } = raffles;

  const [updatedRaffles, setUpdatedRaffles] = useState<TGetRafflesResponseTreated | undefined>(undefined);

  const errorAlreadyDisplayed = useRef(false);

  useEffect(() => {
    if (liveData) {
      if (liveData.getLiveRaffles.success) {
        errorAlreadyDisplayed.current = false;

        const activeRafflesTreated: IRaffleToFrontEndTreated[] = liveData.getLiveRaffles.data.activeRaffles.map(
          (raffle) => ({
            ...raffle,
            createdAt: parseInt(raffle.createdAt),
            finishedAt: raffle.finishedAt ? parseInt(raffle.finishedAt) : undefined,
            info: {
              ...raffle.info,
              prizes: JSON.parse(raffle.info.prizes) as TRaffleWinnersPrizes,
            },
          }),
        );

        const endedRafflesTreated: IRaffleToFrontEndTreated[] = liveData.getLiveRaffles.data.endedRaffles.map(
          (raffle) => ({
            ...raffle,
            createdAt: parseInt(raffle.createdAt),
            finishedAt: raffle.finishedAt ? parseInt(raffle.finishedAt) : undefined,
            info: {
              ...raffle.info,
              prizes: JSON.parse(raffle.info.prizes) as TRaffleWinnersPrizes,
            },
          }),
        );

        return setUpdatedRaffles({
          activeRaffles: activeRafflesTreated,
          endedRaffles: endedRafflesTreated,
        });
      } else {
        !errorAlreadyDisplayed.current && toast.error(liveData.getLiveRaffles.message);
        errorAlreadyDisplayed.current = true;
        return;
      }
    }

    if (data) {
      if (data.getRaffles.success) {
        errorAlreadyDisplayed.current = false;

        const activeRafflesTreated: IRaffleToFrontEndTreated[] = data.getRaffles.data.activeRaffles.map((raffle) => ({
          ...raffle,
          createdAt: parseInt(raffle.createdAt),
          finishedAt: raffle.finishedAt ? parseInt(raffle.finishedAt) : undefined,
          info: {
            ...raffle.info,
            prizes: JSON.parse(raffle.info.prizes) as TRaffleWinnersPrizes,
          },
        }));

        const endedRafflesTreated: IRaffleToFrontEndTreated[] = data.getRaffles.data.endedRaffles.map((raffle) => ({
          ...raffle,
          createdAt: parseInt(raffle.createdAt),
          finishedAt: raffle.finishedAt ? parseInt(raffle.finishedAt) : undefined,
          info: {
            ...raffle.info,
            prizes: JSON.parse(raffle.info.prizes) as TRaffleWinnersPrizes,
          },
        }));

        return setUpdatedRaffles({
          activeRaffles: activeRafflesTreated,
          endedRaffles: endedRafflesTreated,
        });
      } else {
        !errorAlreadyDisplayed.current && toast.error(data.getRaffles.message);
        errorAlreadyDisplayed.current = true;
        return;
      }
    }
  }, [raffles, data]);

  return { updatedRaffles };
}
