import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import AuthModal from './components/AuthModal';
import Header from './components/Header/Header';
import Modal from './components/Modal';
import { JWTCookie } from './config/app/CookiesConfig';
import { AuthModalProvider } from './contexts/AuthModalContext';
import BalanceContextProvider from './contexts/BalanceContext';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import { IReduxStore } from './interfaces/IRedux';
import { IUser } from './interfaces/IUser';
import { setToken } from './redux/features/authSlice';
import AppRoutes from './routes/AppRoutes';
import { MyAxiosService } from './services/MyAxiosService';
import GlobalStyles, { Body } from './styles/GlobalStyles';

function App() {
  const userCredentials = useSelector<IReduxStore>((state) => state.auth.userCredentials);
  const reduxDispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove(JWTCookie.key);
    reduxDispatch(setToken(undefined));

    return window.location.reload();
  };

  const getUserCredentials = async () => {
    const credentialsResponse = await MyAxiosService<IUser>({ endpoint: '/user' });

    if (credentialsResponse) {
      return reduxDispatch(setToken(credentialsResponse.data));
    }

    handleLogout();
  };

  useEffect(() => {
    const authToken = Cookies.get(JWTCookie.key);

    if (authToken) {
      getUserCredentials();
    }
  }, [reduxDispatch]);

  return (
    <>
      <AuthModalProvider>
        <ScreenConfigProvider>
          <Body>
            {userCredentials ? (
              <BalanceContextProvider>
                <Header />
                <AppRoutes />
              </BalanceContextProvider>
            ) : (
              <>
                <Header />
                <AppRoutes />
              </>
            )}

            <Modal>
              <AuthModal />
            </Modal>
          </Body>
        </ScreenConfigProvider>
      </AuthModalProvider>

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
    </>
  );
}

export default App;
