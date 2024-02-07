import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthModalProvider } from './contexts/AuthModalContext';
import reduxStore from './redux';
import GraphQLClientService from './services/GraphQLClientService';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={reduxStore}>
    <ApolloProvider client={GraphQLClientService.getClient()}>
      {/*       <React.StrictMode> */}
      <BrowserRouter>
        <AuthModalProvider>
          <App />
        </AuthModalProvider>
      </BrowserRouter>
      {/*       </React.StrictMode> */}
    </ApolloProvider>
  </Provider>,
);
