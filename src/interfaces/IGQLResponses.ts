import { IRaffleToFrontEnd, IRaffleToFrontEndTreated } from './IRaffles';

export interface IGQLResponses<T> {
  success: boolean;
  message: string;
  data: T;
}

export type TGetRafflesResponseRaw = {
  activeRaffles: IRaffleToFrontEnd[];
  endedRaffles: IRaffleToFrontEnd[];
};

export type TGetRafflesResponseTreated = {
  activeRaffles: IRaffleToFrontEndTreated[];
  endedRaffles: IRaffleToFrontEndTreated[];
};
