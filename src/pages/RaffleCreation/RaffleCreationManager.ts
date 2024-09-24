import { v4 } from 'uuid';

import { IRaffleCreationPayload } from '../../interfaces/IRaffleCreation';
import { TRaffleWinnerPrizes } from '../../interfaces/IRaffles';

export class RaffleCreationManager {
  private config: IRaffleCreationPayload;

  constructor(initialConfig?: Partial<IRaffleCreationPayload>) {
    this.config = {
      totalTickets: 10,
      discountPercentage: 0,
      privacy: { mode: 'public', type: 'public' },
      prizes: [{ items: [] }],
      description: 'This is a fun raffle!',
      request: v4(),
      maxTicketsPerUser: null,
      ...initialConfig,
    };
  }

  public getConfig(): IRaffleCreationPayload {
    return this.config;
  }

  public setTotalTickets(amount: number): void {
    this.config.totalTickets = amount;
    console.log(this.getConfig());
  }

  public setMaxTicketsPerUser(amount: number | null): void {
    console.log(this.getConfig());
    this.config.maxTicketsPerUser = amount;
  }

  public setPrivacyMode(mode: 'public' | 'guildMembers'): void {
    console.log(this.getConfig());
    this.config.privacy = { ...this.config.privacy, mode };
  }

  public setPrivacyType(type: 'public' | 'private'): void {
    console.log(this.getConfig());
    this.config.privacy = { ...this.config.privacy, type };
  }

  public setWinnerPrize(winnerIndex: number, _prize: { itemId: string; action: 'add' | 'sub' }): void {
    console.log(this.getConfig());
    if (winnerIndex >= 0 && winnerIndex < this.config.prizes.length) {
      let winnerPrizeItems = this.config.prizes[winnerIndex].items;

      const findItem = winnerPrizeItems.find((prize) => prize.itemId === _prize.itemId);
      if (findItem) {
        switch (_prize.action) {
          case 'add':
            findItem.quantity++;
            break;
          case 'sub':
            findItem.quantity--;
            break;
        }

        winnerPrizeItems = winnerPrizeItems.filter((prize) => prize.itemId !== _prize.itemId);

        if (findItem.quantity > 0) {
          winnerPrizeItems = [...winnerPrizeItems, findItem];
        }
      }

      if (!findItem) {
        winnerPrizeItems = [...winnerPrizeItems, { itemId: _prize.itemId, quantity: 1 }];
      }

      this.config.prizes[winnerIndex] = { items: winnerPrizeItems };
    } else {
      throw new Error('Invalid winner index');
    }
  }

  public pushPrize(prize: TRaffleWinnerPrizes) {
    this.config.prizes.push(prize);
  }

  public setDescription(description: string): void {
    this.config.description = description;
  }

  public setDiscountPercentage(percentage: number): void {
    this.config.discountPercentage = percentage;
  }
}
