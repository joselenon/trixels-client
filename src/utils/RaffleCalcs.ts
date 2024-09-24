import {
  IRaffleCreationPayload,
  TRaffleCreationItem,
  TRaffleCreationItemsWinners,
  TRaffleCreationWinnerPrize,
} from '../interfaces/IRaffleCreation';
import { TRaffleWinnerPrizes, TRaffleWinnersPrizes } from '../interfaces/IRaffles';
import calcWithDecimalsService from './calcWithDecimals';
import formatIrrationalCryptoAmount from './formatIrrationalCryptoAmount';

export interface IItemsInfo {
  [itemId: string]: {
    id: string;
    img: string;
    name: string;
    price: number;
  };
}

export function CalculateItemValue(item: TRaffleCreationItem, availableItems: IItemsInfo): number {
  const { itemId, quantity } = item;
  const itemValue = availableItems[itemId].price;
  return itemValue * quantity;
}

export function GetWinnerItems(items: TRaffleCreationWinnerPrize['items'], availableItems: IItemsInfo) {
  const winnerItems: TRaffleWinnerPrizes['items'] = [];

  const winnerprizesTotalValue = items.reduce((totalValueWinnerXPrizes, item) => {
    const totalValuePrizeX = CalculateItemValue(item, availableItems);
    winnerItems.push({ itemId: item.itemId, quantity: item.quantity, totalValue: totalValuePrizeX });

    return totalValueWinnerXPrizes + totalValuePrizeX;
  }, 0);

  const winnerPrizeObj: TRaffleWinnerPrizes = {
    items: winnerItems,
    totalValue: winnerprizesTotalValue,
  };

  return { winnerPrizeObj };
}

export function GetPrizesValues(items: TRaffleCreationItemsWinners, availableItems: IItemsInfo) {
  const winnersPrizesObj: TRaffleWinnersPrizes = [];

  const prizesTotalValue = items.reduce((total, prize) => {
    const prizeInfo = prize.items;
    const { winnerPrizeObj } = GetWinnerItems(prizeInfo, availableItems);
    const { totalValue } = winnerPrizeObj;

    winnersPrizesObj.push(winnerPrizeObj);

    return total + totalValue;
  }, 0);

  return { prizesTotalValue, winnersPrizesObj };
}

export function CalculateTicketPriceAndRaffleOwnerCost(
  prizesTotalValue: number,
  discountPercentage: number,
  totalTickets: number,
) {
  const raffleDiscountValue = calcWithDecimalsService(prizesTotalValue, 'multiply', discountPercentage) / 100;
  const raffleDiscountValueRounded = formatIrrationalCryptoAmount(raffleDiscountValue);

  const totalRafflePriceAfterDiscount = calcWithDecimalsService(
    prizesTotalValue,
    'subtract',
    raffleDiscountValueRounded,
  );

  const ticketPrice = calcWithDecimalsService(totalRafflePriceAfterDiscount, 'divide', totalTickets);

  return { ticketPrice, raffleOwnerCost: raffleDiscountValueRounded };
}

export function GetRaffleDetails(payload: IRaffleCreationPayload, availableItems: IItemsInfo) {
  const { prizes, discountPercentage, totalTickets } = payload;

  const { prizesTotalValue, winnersPrizesObj } = GetPrizesValues(prizes, availableItems);

  const { ticketPrice, raffleOwnerCost } = CalculateTicketPriceAndRaffleOwnerCost(
    prizesTotalValue,
    discountPercentage,
    totalTickets,
  );

  return {
    raffleOwnerCost,
    winnersPrizesObj,
    prizesTotalValue,
    ticketPrice,
  };
}

// class RaffleCals {
//   private availableItems: IItemsInfo;
//   constructor(availableItems: IItemsInfo) {
//     this.availableItems = availableItems;
//   }

//   calculatePrizeX(prizeX: TRaffleCreationPrizeX): number {
//     const { prizeId, quantity } = prizeX;
//     const itemValue = this.availableItems[prizeId].price;
//     return itemValue * quantity;
//   }

//   getWinnerXPrize(info: TRaffleCreationWinnerPrize['info']) {
//     /* [prize1, prize2, prize3] */
//     const prizesWinnerXKeys = Object.keys(info);

//     const winnerXPrizeInfo: TRaffleWinnerPrizes['info'] = {};

//     const totalValueOfWinnerXPrizes = prizesWinnerXKeys.reduce((totalValueWinnerXPrizes, prizeXKey) => {
//       const prizeX = info[prizeXKey];
//       const { prizeId, quantity } = prizeX;

//       const totalValuePrizeX = this.calculatePrizeX(prizeX);
//       winnerXPrizeInfo[prizeXKey] = { prizeId, quantity, totalValue: totalValuePrizeX };

//       return totalValueWinnerXPrizes + totalValuePrizeX;
//     }, 0);

//     const winnerXPrizeObj: TRaffleWinnerPrizes = {
//       info: winnerXPrizeInfo,
//       totalValue: totalValueOfWinnerXPrizes,
//     };

//     return { winnerXPrizeObj };
//   }

//   getPrizesValues(prizes: TRaffleCreationPrizesWinners) {
//     const winnersKeys = Object.keys(prizes);

//     const winnersPrizesObj: TRaffleWinnersPrizes = {};

//     const prizesTotalValue = winnersKeys.reduce((total, winnerXKey) => {
//       const winnerXInfo = prizes[winnerXKey]['info'];
//       const { winnerXPrizeObj } = this.getWinnerXPrize(winnerXInfo);
//       const { totalValue } = winnerXPrizeObj;

//       winnersPrizesObj[winnerXKey] = winnerXPrizeObj;

//       return total + totalValue;
//     }, 0);

//     return { prizesTotalValue, winnersPrizesObj };
//   }

//   calculateTicketPriceAndRaffleOwnerCost(prizesTotalValue: number, discountPercentage: number, totalTickets: number) {
//     const raffleDiscountValue = calcWithDecimalsService(prizesTotalValue, 'multiply', discountPercentage) / 100;
//     const raffleDiscountValueRounded = formatIrrationalCryptoAmount(raffleDiscountValue);

//     const totalRafflePriceAfterDiscount = calcWithDecimalsService(
//       prizesTotalValue,
//       'subtract',
//       raffleDiscountValueRounded,
//     );

//     const ticketPrice = calcWithDecimalsService(totalRafflePriceAfterDiscount, 'divide', totalTickets);

//     return { ticketPrice, raffleOwnerCost: raffleDiscountValueRounded };
//   }

//   getRaffleDetails(payload: IRaffleCreationPayload) {
//     const { prizes, discountPercentage, totalTickets } = payload;

//     const { prizesTotalValue, winnersPrizesObj } = this.getPrizesValues(prizes);

//     const { ticketPrice, raffleOwnerCost } = this.calculateTicketPriceAndRaffleOwnerCost(
//       prizesTotalValue,
//       discountPercentage,
//       totalTickets,
//     );

//     return {
//       raffleOwnerCost,
//       winnersPrizesObj,
//       prizesTotalValue,
//       ticketPrice,
//     };
//   }
// }
