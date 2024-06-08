import { RESPONSE_CONFIG } from '../config/constants/RESPONSES';
import { IRaffleToFrontEnd, IRaffleToFrontEndTreated } from './IRaffles';

type TSuccessMessage = keyof typeof RESPONSE_CONFIG.SUCCESS;
type TErrorMessage = keyof typeof RESPONSE_CONFIG.ERROR.CLIENT_ERROR_MSGS;
export type TMessages = TSuccessMessage | TErrorMessage;

export interface IPubSubCreateRaffleData {
  gameId: string;
}

export type TGQLResponsesTypes = 'CREATE_RAFFLE' | 'GET_LIVE_RAFFLES' | 'GET_LIVE_BALANCE';

export interface IGQLResponses<D> {
  success: boolean;
  type: TGQLResponsesTypes;
  message: TMessages;
  data?: D;
}

export type TGetRafflesResponseRaw = {
  activeRaffles: IRaffleToFrontEnd[];
  endedRaffles: IRaffleToFrontEnd[];
};

export type TGetRafflesResponseTreated = {
  activeRaffles: IRaffleToFrontEndTreated[];
  endedRaffles: IRaffleToFrontEndTreated[];
};
