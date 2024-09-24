import React, { createContext, ReactNode, useContext } from 'react';
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

import { IRaffleCreationPayload } from '../interfaces/IRaffleCreation';

interface RaffleCreationContextProps {
  raffleConfig: IRaffleCreationPayload;
  setTotalTickets: (amount: number) => void;
  setMaxTicketsPerUser: (amount: number | null) => void;
  setPrivacyMode: (mode: 'public' | 'guildMembers') => void;
  setPrivacyType: (type: 'public' | 'private') => void;
  setWinnerPrize: (winnerIndex: number, prize: { itemId: string; action: 'add' | 'sub' }) => void;
  setDescription: (description: string) => void;
  setDiscountPercentage: (percentage: number) => void;
}

const mockRaffleConfig: IRaffleCreationPayload = {
  totalTickets: 50,
  discountPercentage: 10,
  privacy: { mode: 'guildMembers', type: 'private' },
  prizes: [{ items: [{ itemId: 'item1', quantity: 5 }] }],
  description: 'Mock raffle for testing purposes.',
  request: v4(),
  maxTicketsPerUser: 5,
};

const RaffleCreationContext = createContext<RaffleCreationContextProps>({
  raffleConfig: mockRaffleConfig,
  setTotalTickets: () => {},
  setMaxTicketsPerUser: () => {},
  setPrivacyMode: () => {},
  setPrivacyType: () => {},
  setWinnerPrize: () => {},
  setDescription: () => {},
  setDiscountPercentage: () => {},
});

export const RaffleCreationContextProvider = ({
  children,
}: {
  children: ReactNode;
  initialConfig?: Partial<IRaffleCreationPayload>;
}) => {
  const [raffleConfig, setRaffleConfig] = useState<IRaffleCreationPayload>({
    totalTickets: 10,
    discountPercentage: 0,
    privacy: { mode: 'public', type: 'public' },
    prizes: [{ items: [] }],
    description: 'This is a fun raffle!',
    request: v4(),
    maxTicketsPerUser: null,
  });

  const setTotalTickets = useCallback((amount: number) => {
    setRaffleConfig((prevConfig) => ({ ...prevConfig, totalTickets: amount }));
  }, []);

  const setMaxTicketsPerUser = useCallback((amount: number | null) => {
    setRaffleConfig((prevConfig) => ({ ...prevConfig, maxTicketsPerUser: amount }));
  }, []);

  const setPrivacyMode = useCallback((mode: 'public' | 'guildMembers') => {
    setRaffleConfig((prevConfig) => ({ ...prevConfig, privacy: { ...prevConfig.privacy, mode } }));
  }, []);

  const setPrivacyType = useCallback((type: 'public' | 'private') => {
    setRaffleConfig((prevConfig) => ({ ...prevConfig, privacy: { ...prevConfig.privacy, type } }));
  }, []);

  const setWinnerPrize = useCallback((winnerIndex: number, prize: { itemId: string; action: 'add' | 'sub' }) => {
    setRaffleConfig((prevConfig) => {
      if (winnerIndex < 0 || winnerIndex >= prevConfig.prizes.length) {
        throw new Error('Invalid winner index');
      }

      const updatedPrizes = [...prevConfig.prizes];
      let winnerPrizeItems = updatedPrizes[winnerIndex].items;

      const findItem = winnerPrizeItems.find((prizeItem) => prizeItem.itemId === prize.itemId);
      if (findItem) {
        if (prize.action === 'add') {
          findItem.quantity++;
        } else if (prize.action === 'sub') {
          findItem.quantity--;
        }

        winnerPrizeItems = winnerPrizeItems.filter((prizeItem) => prizeItem.quantity > 0);
      } else if (prize.action === 'add') {
        winnerPrizeItems.push({ itemId: prize.itemId, quantity: 1 });
      }

      updatedPrizes[winnerIndex] = { items: winnerPrizeItems };

      return { ...prevConfig, prizes: updatedPrizes };
    });
  }, []);

  const setDescription = useCallback((description: string) => {
    setRaffleConfig((prevConfig) => ({ ...prevConfig, description }));
  }, []);

  const setDiscountPercentage = useCallback((percentage: number) => {
    setRaffleConfig((prevConfig) => ({ ...prevConfig, discountPercentage: percentage }));
  }, []);

  return (
    <RaffleCreationContext.Provider
      value={{
        raffleConfig,
        setTotalTickets,
        setMaxTicketsPerUser,
        setPrivacyMode,
        setPrivacyType,
        setWinnerPrize,
        setDescription,
        setDiscountPercentage,
      }}
    >
      {children}
    </RaffleCreationContext.Provider>
  );
};

export function useRaffleCreationContext() {
  return useContext(RaffleCreationContext);
}
