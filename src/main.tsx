import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import SentryConfig from './config/app/SentryConfig';
import { ApolloClientProvider } from './contexts/ApolloClientContext';
import { AuthContextProvider } from './contexts/AuthContext';
import reduxStore from './redux';

Sentry.init(SentryConfig());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={reduxStore}>
    <ApolloClientProvider>
      {/*       <React.StrictMode> */}

      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>

      {/*       </React.StrictMode> */}
    </ApolloClientProvider>
  </Provider>,
);
