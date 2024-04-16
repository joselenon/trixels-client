import { IJackpotBetPayload } from './IPayloads';
import { IUserJWTPayload } from './IUser';

export interface IBetControllerGQL {
  makeBetOnJackpot(userInfo: IUserJWTPayload, payload: IJackpotBetPayload): Promise<void>;
}

export interface IBetRedisCreate {
  userInfo: IUserJWTPayload;
  intervals?: number[];
  amountBet: number;
  gameId: string;
  createdAt: number;
}

export interface IBetToFrontEnd {
  amountBet: number;
  createdAt: number;
  gameId: string;
  info: { randomTicket: boolean; tickets: number[]; type: 'raffles' | 'jackpots' };
  prize: number;
  userRef: {
    avatar: string;
    username: string;
    userId: string;
  };
}

export interface IBuyRaffleTicketsPayload {
  gameId: string;
  info: { randomTicket: boolean; quantityOfTickets?: number; ticketNumbers: number[] };
}

/* NOT UPDATED */
// Difference between this and 'IBetRedisCreate' is that this one has docId (since it was created later)
/*
export interface IBetRedis {
  docId: string;
  intervals: number[];
  amountBet: number;
  createdAt: number;
  gameId: string;
  userInfo: IUserJWTPayload;
}
 */
