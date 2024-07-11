import { IBetToFrontEnd } from './IBet';

export interface IRafflesControllerGQL {
  getAllRaffles(): Promise<{
    activeRaffles: IRaffleToFrontEnd[];
    endedRaffles: IRaffleToFrontEnd[];
  }>;
}

export type TRafflePrizeX = { prizeId: string; quantity: number; totalValue: number };

export type TRaffleWinnerPrizes = {
  totalValue: number;
  info: { [prizeX: string]: TRafflePrizeX };
};

export type TRaffleWinnersPrizes = {
  [winnerX: string]: TRaffleWinnerPrizes;
};

export type TWinnerBetInRedis = {
  betRef: IBetToFrontEnd;
  hash: string;
  drawnNumber: number;
};

export type TWinnerBetsInRedis = TWinnerBetInRedis[];

export interface IRaffleToFrontEnd {
  gameId: string;
  createdAt: string;
  createdBy: {
    avatar: string;
    username: string;
    userId: string;
  };
  finishedAt?: string;
  type: 'raffles';
  status: 'active' | 'cancelled' | 'ended';
  description: string;
  info: {
    bets: IBetToFrontEnd[];
    ticketPrice: number;
    totalTickets: number;
    ticketsBought: number;
    prizesTotalValue: number;
    privacy: {
      mode: 'public' | 'guildMembers';
      type: 'public' | 'private';
    };
    prizes: string /* MUDADO PARA STRING (JSON) MOMENTANEAMENTE, DEVIDO A VARIABILIDADE DE QUANTIDADE DE PREMIOS - GRAPHQL */;
    winnersBetsInfo?: TWinnerBetsInRedis;
  };
}

export interface IRaffleToFrontEndTreated {
  createdAt: number;
  createdBy: {
    avatar?: string;
    username: string;
    userId: string;
  };
  finishedAt?: number;
  gameId: string;
  type: 'raffles';
  description: string;
  info: {
    bets: IBetToFrontEnd[];
    ticketPrice: number;
    totalTickets: number;
    prizesTotalValue: number;
    privacy: {
      mode: 'public' | 'guildMembers';
      type: 'public' | 'private';
    };
    prizes: TRaffleWinnersPrizes;
    winnersBetsInfo?: TWinnerBetsInRedis;
  };
}
