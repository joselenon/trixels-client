import ENVIRONMENT from './ENVIRONMENT';

export const HTTP_PROTOCOL = ENVIRONMENT.VITE_APP_HTTPS ? 'https://' : 'http://';
export const WS_PROTOCOL = ENVIRONMENT.VITE_APP_HTTPS ? 'wss://' : 'ws://';

// 'localhost' | 'jds.gamblance'
const SERVER_DOMAIN = `${ENVIRONMENT.VITE_APP_SERVER_DOMAIN}`;

// '4000'
const SERVER_PORT = ENVIRONMENT.VITE_APP_SERVER_PORT;

// 'http://localhost:4000' | 'https://jds.gamblance.com'
const SERVER_FULL_URL =
  ENVIRONMENT.VITE_APP_MODE === 'PRODUCTION' ? `${SERVER_DOMAIN}.com` : `${SERVER_DOMAIN}:${SERVER_PORT}`;

export const API_BASE = '/api';
const API_URL = `${HTTP_PROTOCOL}${SERVER_FULL_URL}${API_BASE}`;
const WS_API_URL = `${WS_PROTOCOL}${SERVER_FULL_URL}${API_BASE}`;

const ENDPOINTS = {
  AUTH: '/auth',
  USER: '/user',
  RAFFLES: '/raffles',
  GRAPHQL: '/graphql',
  WEBHOOKS: '/webhooks',
  DEPOSIT: '/deposit',
  TRANSACTIONS: '/transactions',
};

const API_ENDPOINTS = {
  AUTH: {
    DISCORD: {
      initial: `${ENDPOINTS.AUTH}/discord`,
      callback: `${ENDPOINTS.AUTH}/discord/callback`,
    },
    REGISTER: `${ENDPOINTS.AUTH}/register`,
    LOGIN: `${ENDPOINTS.AUTH}/login`,
    GOOGLE_LOGIN: {
      initial: `${ENDPOINTS.AUTH}/google`,
      callback: `${ENDPOINTS.AUTH}/google/callback`,
    },
  },
  USER: {
    GET_USER_INFO: `${ENDPOINTS.USER}`,
    GET_USER_CREDENTIALS: `${ENDPOINTS.USER}/credentials`,
    UPDATE_USER_CREDENTIALS: `${ENDPOINTS.USER}/credentials`,
    VERIFY_WALLET: `${ENDPOINTS.USER}/verifywallet`,
    VERIFY_WALLET_CHECK: `${ENDPOINTS.USER}/verifywallet/check`,
    GET_USER_TRANSACTIONS: `${ENDPOINTS.TRANSACTIONS}`,
  },
  RAFFLES: {
    GET_AVAILABLE_ITEMS: `${ENDPOINTS.RAFFLES}/items`,
    CREATE_RAFFLE: `${ENDPOINTS.RAFFLES}/create`,
    BUY_TICKETS: `${ENDPOINTS.RAFFLES}/buy`,
  },
  GRAPHQL: `${ENDPOINTS.GRAPHQL}`,
  WEBHOOKS: {
    SKY_MAVIS: `${ENDPOINTS.WEBHOOKS}/skymavis`,
  },
  DEPOSIT: {
    REDEEM_CODE: `${ENDPOINTS.DEPOSIT}/redeemcode`,
    GET_DEPOSIT_WALLET: `${ENDPOINTS.DEPOSIT}/getwallet`,
  },
  TRANSACTIONS: {},
};

const URLS = {
  ENDPOINTS: API_ENDPOINTS,
  MAIN_URLS: { SERVER_DOMAIN, API_URL, WS_API_URL },
};

export default URLS;
