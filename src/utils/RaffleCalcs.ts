import {
  TRaffleCreationPrizesWinners,
  TRaffleCreationPrizeX,
  TRaffleCreationWinnerPrizes,
  TRaffleWinnerPrizes,
  TRaffleWinnersPrizes,
} from '../interfaces/IRaffles';

export interface IItemsInfo {
  [itemId: string]: {
    id: string;
    img: string;
    name: string;
    price: number;
  };
}

class RaffleCals {
  private availableItems: IItemsInfo;
  constructor(availableItems: IItemsInfo) {
    this.availableItems = availableItems;
  }

  calculatePrizeX(prizeX: TRaffleCreationPrizeX): number {
    const { prizeId, quantity } = prizeX;
    const itemValue = this.availableItems[prizeId].price;
    return itemValue * quantity;
  }

  getWinnerXPrize(info: TRaffleCreationWinnerPrizes['info']) {
    /* [prize1, prize2, prize3] */
    const prizesWinnerXKeys = Object.keys(info);

    const winnerXPrizeInfo: TRaffleWinnerPrizes['info'] = {};

    const totalValueOfWinnerXPrizes = prizesWinnerXKeys.reduce((totalValueWinnerXPrizes, prizeXKey) => {
      const prizeX = info[prizeXKey];
      const { prizeId, quantity } = prizeX;

      const totalValuePrizeX = this.calculatePrizeX(prizeX);
      winnerXPrizeInfo[prizeXKey] = { prizeId, quantity, totalValue: totalValuePrizeX };

      return totalValueWinnerXPrizes + totalValuePrizeX;
    }, 0);

    const winnerXPrizeObj: TRaffleWinnerPrizes = {
      info: winnerXPrizeInfo,
      totalValue: totalValueOfWinnerXPrizes,
    };

    return { winnerXPrizeObj };
  }

  getPrizesValues(prizes: TRaffleCreationPrizesWinners) {
    const winnersKeys = Object.keys(prizes);

    const winnersPrizesObj: TRaffleWinnersPrizes = {};

    const prizesTotalValue = winnersKeys.reduce((total, winnerXKey) => {
      const winnerXInfo = prizes[winnerXKey]['info'];
      const { winnerXPrizeObj } = this.getWinnerXPrize(winnerXInfo);
      const { totalValue } = winnerXPrizeObj;

      winnersPrizesObj[winnerXKey] = winnerXPrizeObj;

      return total + totalValue;
    }, 0);

    return { prizesTotalValue, winnersPrizesObj };
  }
}

export default RaffleCals;
