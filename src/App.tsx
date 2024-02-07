import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import Modal from './components/Modal';
import AuthModal from './components/Modals/AuthModal/AuthModal';
import { useAuthModalContext } from './contexts/AuthModalContext';
import BalanceContextProvider from './contexts/BalanceContext';
import { ScreenConfigProvider } from './contexts/ScreenConfigContext';
import useGetLoggedUserCredentials from './hooks/useGetLoggedUserCredentials';
import AppRoutes from './routes/AppRoutes';
import GlobalStyles, { Body } from './styles/GlobalStyles';

function App() {
  const { setShowModal, showModal } = useAuthModalContext();
  const fetchLoggedUserCredentials = useGetLoggedUserCredentials(); // Renomeie para algo mais descritivo

  const [credentials, setCredentials] = useState<any>(undefined);

  useEffect(() => {
    const f = async () => {
      const userCredentials = await fetchLoggedUserCredentials();

      if (userCredentials) {
        setCredentials(userCredentials);
      }
    };

    f();
  }, []);

  return (
    <>
      <ScreenConfigProvider>
        <Body>
          {credentials ? (
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

          <Modal setShowModal={setShowModal} showModal={showModal}>
            <AuthModal />
          </Modal>
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
        theme="light"
      />
    </>
  );
}

export default App;
