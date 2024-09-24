import ENVIRONMENT from '../constants/ENVIRONMENT';
import sentryBeforeSendConfig from './sentryBeforeSendConfig';

const SentryConfig = () => {
  return {
    dsn: 'ENVIRONMENT.VITE_APP_SENTRY_DSN',

    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
    beforeSend: sentryBeforeSendConfig,
  };
};

export default SentryConfig;
