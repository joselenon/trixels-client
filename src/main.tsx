import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reduxStore from './redux';
import GraphQLClientService from './services/GraphQLClientService';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={reduxStore}>
    <ApolloProvider client={GraphQLClientService.getClient()}>
      {/*       <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/*       </React.StrictMode> */}
    </ApolloProvider>
  </Provider>,
);
