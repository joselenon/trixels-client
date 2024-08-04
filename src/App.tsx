import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import { useAuthContext } from './contexts/AuthContext';
import BalanceContextProvider from './contexts/BalanceContext';
import MessagesContextProvider from './contexts/MessagesContext';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import AppRoutes from './routes/AppRoutes';
import GlobalStyles from './styles/GlobalStyles';
import ScrollToTop from './utils/scrollToTop';

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <ScrollToTop />

      {isAuthenticated ? (
        <MessagesContextProvider>
          <>
            <BalanceContextProvider>
              <ScreenConfigProvider>
                <Header />
              </ScreenConfigProvider>
            </BalanceContextProvider>

            <ScreenConfigProvider>
              <MobileMenu />
            </ScreenConfigProvider>
          </>

          <AppRoutes />
          <Footer />
        </MessagesContextProvider>
      ) : (
        <>
          <>
            <Header />

            <ScreenConfigProvider>
              <MobileMenu />
            </ScreenConfigProvider>
          </>

          <AppRoutes />
          <Footer />
        </>
      )}

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
