import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useScreenConfig } from './contexts/ScreenConfigContext';
import GlobalStyles from './styles/GlobalStyles';
import BalanceContextProvider from './contexts/BalanceContext';
import MessagesContextProvider from './contexts/MessagesContext';
import RafflesContextProvider from './contexts/RafflesContext';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import AuthService from './services/AuthService';

function App() {
  const { isMobile } = useScreenConfig();
  const reduxDispatch = useDispatch();

  AuthService.getUserCredentials(reduxDispatch);

  return (
    <>
      <BalanceContextProvider>
        <MessagesContextProvider>
          <RafflesContextProvider>
            <Header />
            {isMobile && <MobileMenu />}
            <AppRoutes />
            <Footer />
          </RafflesContextProvider>
        </MessagesContextProvider>
      </BalanceContextProvider>

      <GlobalStyles />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
