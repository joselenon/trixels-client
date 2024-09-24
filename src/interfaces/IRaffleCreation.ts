export type TRaffleCreationItem = { itemId: string; quantity: number };

/*
[
  { items: [ { itemId: 5123, quantity: 2 } ] },
  { items: [ { itemId: 1474, quantity: 4 } ] }
]
*/

export type TRaffleCreationWinnerPrize = {
  items: TRaffleCreationItem[];
};

export type TRaffleCreationItemsWinners = TRaffleCreationWinnerPrize[];

export interface IRaffleCreationPayload {
  totalTickets: number;
  discountPercentage: number;
  description: string;
  privacy: {
    mode: 'public' | 'guildMembers';
    type: 'public' | 'private';
  };
  prizes: TRaffleCreationItemsWinners;
  request: string;
  maxTicketsPerUser: number | null;
}
