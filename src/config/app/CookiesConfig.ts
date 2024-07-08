import { CookieSetOptions } from 'universal-cookie';

import ENVIRONMENT from '../constants/ENVIRONMENT';

const expiresDate = new Date();
expiresDate.setTime(expiresDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 dias em milissegundos

export const JWTCookie: { key: string; config: CookieSetOptions } = {
  key: 'accessToken',
  config: {
    expires: expiresDate, // Utiliza a data calculada
    secure: ENVIRONMENT.VITE_APP_MODE === 'PRODUCTION',
    domain: ENVIRONMENT.VITE_APP_SERVER_DOMAIN /* Verifique isso mais tarde*/,
    httpOnly: true,
  },
};
