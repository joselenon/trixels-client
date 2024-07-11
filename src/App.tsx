import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import BalanceContextProvider from './contexts/BalanceContext';
import MessagesContextProvider from './contexts/MessagesContext';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import AppRoutes from './routes/AppRoutes';
import AuthService from './services/AuthService';
import GlobalStyles from './styles/GlobalStyles';
import ScrollToTop from './utils/scrollToTop';

function App() {
  const reduxDispatch = useDispatch();
  AuthService.getUserCredentials(reduxDispatch);

  return (
    <>
      <ScrollToTop />

      <MessagesContextProvider>
        <ScreenConfigProvider>
          <>
            <BalanceContextProvider>
              <Header />
            </BalanceContextProvider>

            <MobileMenu />
          </>
        </ScreenConfigProvider>

        <AppRoutes />
        <Footer />
      </MessagesContextProvider>

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
