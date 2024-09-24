const ENVIRONMENT = {
  VITE_APP_MODE: (import.meta.env.VITE_APP_MODE || 'DEVELOPMENT') as 'DEVELOPMENT' | 'PRODUCTION',
  VITE_APP_HTTPS: import.meta.env.VITE_APP_HTTPS === 'true', // Converta para booleano
  VITE_APP_SERVER_DOMAIN: import.meta.env.VITE_APP_SERVER_DOMAIN,
  VITE_APP_SERVER_PORT: parseInt(import.meta.env.VITE_APP_SERVER_PORT || '', 10), // Converta para número
  VITE_APP_CLIENT_PORT: parseInt(import.meta.env.VITE_APP_CLIENT_PORT || '', 10), // Converta para número
  VITE_APP_SERVER_URL: import.meta.env.VITE_APP_SERVER_URL || '', // Certifique-se de que é uma string
  VITE_APP_CLIENT_URL: import.meta.env.VITE_APP_CLIENT_URL || '', // Certifique-se de que é uma string
};

// Validação das variáveis de ambiente
const validateEnv = () => {
  const errors: string[] = [];

  // Validação para VITE_APP_MODE
  const validModes = ['DEVELOPMENT', 'PRODUCTION'];
  if (!validModes.includes(ENVIRONMENT.VITE_APP_MODE)) {
    errors.push(
      `Invalid value for VITE_APP_MODE. Expected 'DEVELOPMENT' or 'PRODUCTION', got '${ENVIRONMENT.VITE_APP_MODE}'.`,
    );
  }

  // Validação para VITE_APP_HTTPS
  if (
    typeof import.meta.env.VITE_APP_HTTPS !== 'string' ||
    !['true', 'false'].includes(import.meta.env.VITE_APP_HTTPS.toLowerCase())
  ) {
    errors.push(
      `Invalid value for VITE_APP_HTTPS. Expected 'true' or 'false', got '${import.meta.env.VITE_APP_HTTPS}'.`,
    );
  }

  // Validação para VITE_APP_SERVER_PORT e VITE_APP_CLIENT_PORT
  if (isNaN(ENVIRONMENT.VITE_APP_SERVER_PORT) || ENVIRONMENT.VITE_APP_SERVER_PORT <= 0) {
    errors.push(
      `Invalid value for VITE_APP_SERVER_PORT. Expected a positive integer, got '${
        import.meta.env.VITE_APP_SERVER_PORT
      }'.`,
    );
  }

  if (isNaN(ENVIRONMENT.VITE_APP_CLIENT_PORT) || ENVIRONMENT.VITE_APP_CLIENT_PORT <= 0) {
    errors.push(
      `Invalid value for VITE_APP_CLIENT_PORT. Expected a positive integer, got '${
        import.meta.env.VITE_APP_CLIENT_PORT
      }'.`,
    );
  }

  // Validação para VITE_APP_SERVER_URL e VITE_APP_CLIENT_URL
  if (typeof ENVIRONMENT.VITE_APP_SERVER_URL !== 'string' || ENVIRONMENT.VITE_APP_SERVER_URL.trim() === '') {
    errors.push(
      `Invalid value for VITE_APP_SERVER_URL. Expected a non-empty string, got '${ENVIRONMENT.VITE_APP_SERVER_URL}'.`,
    );
  }

  // Validação para VITE_APP_SERVER_URL e VITE_APP_CLIENT_URL
  if (typeof ENVIRONMENT.VITE_APP_SERVER_DOMAIN !== 'string' || ENVIRONMENT.VITE_APP_SERVER_URL.trim() === '') {
    errors.push(
      `Invalid value for VITE_APP_SERVER_DOMAIN. Expected a non-empty string, got '${ENVIRONMENT.VITE_APP_SERVER_DOMAIN}'.`,
    );
  }

  if (typeof ENVIRONMENT.VITE_APP_CLIENT_URL !== 'string' || ENVIRONMENT.VITE_APP_CLIENT_URL.trim() === '') {
    errors.push(
      `Invalid value for VITE_APP_CLIENT_URL. Expected a non-empty string, got '${ENVIRONMENT.VITE_APP_CLIENT_URL}'.`,
    );
  }

  // Se houver erros, lança uma exceção
  if (errors.length > 0) {
    throw new Error(`Configuration error:\n${errors.join('\n')}`);
  }
};

validateEnv();

export default ENVIRONMENT;
