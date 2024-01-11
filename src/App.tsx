import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import { LoadItemsAndMetricsContextProvider } from './contexts/LoadItemsAndMetricsContext';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import AppRoutes from './routes/AppRoutes';
import GlobalStyles, { Body } from './styles/GlobalStyles';

function App() {
  return (
    <BrowserRouter>
      <ScreenConfigProvider>
        <Body>
          <Header />
          <LoadItemsAndMetricsContextProvider>
            <AppRoutes />
          </LoadItemsAndMetricsContextProvider>
        </Body>
      </ScreenConfigProvider>
      <GlobalStyles />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
