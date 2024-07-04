import { ApolloProvider } from '@apollo/client';
import React from 'react';
import * as Sentry from '@sentry/react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import reduxStore from './redux';
import SentryConfig from './config/app/SentryConfig';
import { ApolloClientProvider } from './contexts/ApolloClientContext';

Sentry.init(SentryConfig());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={reduxStore}>
    <ApolloClientProvider>
      {/*       <React.StrictMode> */}
      <BrowserRouter>
        <ScreenConfigProvider>
          <App />
        </ScreenConfigProvider>
      </BrowserRouter>
      {/*       </React.StrictMode> */}
    </ApolloClientProvider>
  </Provider>,
);
