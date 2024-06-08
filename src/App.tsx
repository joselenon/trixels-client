import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import Modal from './components/Modal';
import AuthModal from './components/Modals/AuthModal/AuthModal';
import { useAuthModalContext } from './contexts/AuthModalContext';
import BalanceContextProvider from './contexts/BalanceContext';
import MessagesContextProvider from './contexts/MessagesContext';
import RafflesContextProvider from './contexts/RafflesContext';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import useGetUserCredentials from './hooks/useGetUserCredentials';
import AppRoutes from './routes/AppRoutes';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const { setShowModal, showModal } = useAuthModalContext();
  const fetchLoggedUserCredentials = useGetUserCredentials(); // Renomeie para algo mais descritivo

  const [credentials, setCredentials] = useState<any>(undefined);

  useEffect(() => {
    const fetchCredentials = async () => {
      const userCredentials = await fetchLoggedUserCredentials();

      if (userCredentials) {
        setCredentials(userCredentials);
      }
    };

    fetchCredentials();
  }, []);

  return (
    <>
      <ScreenConfigProvider>
        <>
          {/* ARRUMAR ESSA SAFADEZA AQUI */}
          {credentials ? (
            <RafflesContextProvider>
              <MessagesContextProvider>
                <BalanceContextProvider>
                  <Header />
                  <AppRoutes />
                </BalanceContextProvider>
              </MessagesContextProvider>
            </RafflesContextProvider>
          ) : (
            <>
              <RafflesContextProvider>
                <Header />
                <AppRoutes />
              </RafflesContextProvider>
            </>
          )}

          <Modal setShowModal={setShowModal} showModal={showModal}>
            <AuthModal />
          </Modal>
        </>
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
        theme="light"
      />
    </>
  );
}

export default App;
