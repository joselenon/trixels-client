const ENVIRONMENT = {
  VITE_APP_MODE: (import.meta.env.VITE_APP_MODE || 'DEVELOPMENT') as 'DEVELOPMENT' | 'PRODUCTION',
  VITE_APP_HTTPS: import.meta.env.VITE_APP_HTTPS === 'true' ? true : false,
  VITE_APP_SERVER_DOMAIN: import.meta.env.VITE_APP_SERVER_DOMAIN || 'localhost',
  VITE_APP_SERVER_PORT: import.meta.env.VITE_APP_SERVER_PORT as string,
  VITE_APP_CLIENT_PORT: import.meta.env.VITE_APP_CLIENT_PORT as string,
  VITE_APP_SENTRY_DSN: import.meta.env.VITE_APP_SENTRY_DSN as string,
  VITE_APP_SERVER_SUBDOMAIN_DOMAIN: import.meta.env.VITE_APP_SERVER_SUBDOMAIN_DOMAIN as string,
  VITE_APP_CLIENT_SUBDOMAIN_DOMAIN: import.meta.env.VITE_APP_CLIENT_SUBDOMAIN_DOMAIN as string,
};

const requiredVariables = [
  'VITE_APP_HTTPS',
  'VITE_APP_MODE',
  'VITE_APP_SENTRY_DSN',
  'VITE_APP_SERVER_SUBDOMAIN_DOMAIN',
  'VITE_APP_CLIENT_SUBDOMAIN_DOMAIN',
  'VITE_APP_CLIENT_PORT',
];

const missingVariables = requiredVariables.filter((variable) => !import.meta.env[variable]);

if (missingVariables.length > 0) {
  throw new Error(`Environment variable missing. - ${missingVariables}`);
}

export default ENVIRONMENT;
