import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import AuthModal from './components/AuthModal';
import Header from './components/Header/Header';
import Modal from './components/Modal';
import { JWTCookie } from './config/app/CookiesConfig';
import { AuthModalProvider } from './contexts/AuthModalContext';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import { UserContextProvider } from './contexts/UserContext';
import { IUser } from './interfaces/IUser';
import { setToken } from './redux/features/authSlice';
import AppRoutes from './routes/AppRoutes';
import { MyAxiosService } from './services/MyAxiosService';
import GlobalStyles, { Body } from './styles/GlobalStyles';

function App() {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    const authToken = Cookies.get(JWTCookie.key);

    if (authToken) {
      const getUserCredentials = async () => {
        try {
          const credentials = await MyAxiosService<IUser>({ endpoint: '/' });

          if (credentials.api.data) {
            reduxDispatch(setToken(credentials.api.data));
          }
        } catch (err) {
          toast.error('Something went wrong.');
        }
      };

      getUserCredentials();
    }
  }, [reduxDispatch]);

  return (
    <BrowserRouter>
      <UserContextProvider>
        <AuthModalProvider>
          <ScreenConfigProvider>
            <Body>
              <Header />
              <AppRoutes />

              <Modal children={<AuthModal />} />
            </Body>
          </ScreenConfigProvider>
        </AuthModalProvider>
      </UserContextProvider>

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
