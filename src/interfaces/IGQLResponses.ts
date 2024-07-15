import { RESPONSE_CONFIG } from '../config/constants/RESPONSES';
import { IRaffleToFrontEnd, IRaffleToFrontEndTreated } from './IRaffles';

type TSuccessMessage = keyof typeof RESPONSE_CONFIG.SUCCESS;
type TErrorMessage = keyof typeof RESPONSE_CONFIG.ERROR.CLIENT_ERROR_MSGS;
export type TMessages = TSuccessMessage | TErrorMessage;

export interface IPubSubCreateRaffleData {
  gameId: string;
}

export type TGQLResponsesTypes =
  | 'CREATE_RAFFLE'
  | 'GET_LIVE_RAFFLES'
  | 'GET_LIVE_BALANCE'
  | 'GET_AVAILABLE_ITEMS'
  | 'BUY_RAFFLE_TICKET'
  | 'REGISTER_USER'
  | 'LOG_USER'
  | 'GET_USER_INFO'
  | 'UPDATE_USER_CREDENTIALS'
  | 'GET_BALANCE'
  | 'GET_USER_TRANSACTIONS'
  | 'REDEEM_CODE'
  | 'REFRESH_ACCESS_TOKEN'
  | 'WALLET_VERIFICATION'
  | 'GET_DEPOSIT_METHODS';

export interface IGQLResponses<D> {
  success: boolean;
  type: TGQLResponsesTypes;
  request: string;
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
