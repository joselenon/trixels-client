import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

import { IRaffleCreationPayload } from '../../interfaces/IRaffleCreation';

const useRaffleCreationManager = (initialConfig?: Partial<IRaffleCreationPayload>) => {
  const [config, setConfig] = useState<IRaffleCreationPayload>({
    totalTickets: 10,
    discountPercentage: 0,
    privacy: { mode: 'public', type: 'public' },
    prizes: [{ items: [] }],
    description: 'This is a fun raffle!',
    request: v4(),
    maxTicketsPerUser: null,
    ...initialConfig,
  });

  const setTotalTickets = useCallback((amount: number) => {
    setConfig((prevConfig) => ({ ...prevConfig, totalTickets: amount }));
  }, []);

  const setMaxTicketsPerUser = useCallback((amount: number | null) => {
    setConfig((prevConfig) => ({ ...prevConfig, maxTicketsPerUser: amount }));
  }, []);

  const setPrivacyMode = useCallback((mode: 'public' | 'guildMembers') => {
    setConfig((prevConfig) => ({ ...prevConfig, privacy: { ...prevConfig.privacy, mode } }));
  }, []);

  const setPrivacyType = useCallback((type: 'public' | 'private') => {
    setConfig((prevConfig) => ({ ...prevConfig, privacy: { ...prevConfig.privacy, type } }));
  }, []);

  const setWinnerPrize = useCallback((winnerIndex: number, prize: { itemId: string; action: 'add' | 'sub' }) => {
    setConfig((prevConfig) => {
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
    setConfig((prevConfig) => ({ ...prevConfig, description }));
  }, []);

  const setDiscountPercentage = useCallback((percentage: number) => {
    setConfig((prevConfig) => ({ ...prevConfig, discountPercentage: percentage }));
  }, []);

  return {
    config,
    setTotalTickets,
    setMaxTicketsPerUser,
    setPrivacyMode,
    setPrivacyType,
    setWinnerPrize,
    setDescription,
    setDiscountPercentage,
  };
};

export default useRaffleCreationManager;
