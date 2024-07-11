import { useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { IGoogleAuthResponse } from '../components/Modals/AuthModal/LoginForm';
import URLS from '../config/constants/URLS';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

interface IUseLoginThroughGoogleProps {
  onMessageReceived: (data: IGoogleAuthResponse) => void;
}

const useLoginThroughGoogle = ({ onMessageReceived }: IUseLoginThroughGoogleProps) => {
  /* Identificador de janela que mandou a mensagem */
  const stateAuth = uuid();

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const { origin, data } = event;

      if (origin === `http://localhost:3000` && data?.state === stateAuth) {
        onMessageReceived(data as IGoogleAuthResponse);
      }
    },
    [onMessageReceived],
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  const initiateGoogleAuth = async () => {
    const res = await TrixelsAxiosServiceInstance.request<{ authorizeUrl: string }>({
      requestConfig: { method: 'post', url: URLS.ENDPOINTS.AUTH.GOOGLE_LOGIN.initial, data: { stateAuth } },
    });

    if (res && res.data) {
      const newPopup = window.open(res.data.authorizeUrl, '_blank', 'width=600,height=400');

      if (newPopup) {
        newPopup.focus();
      }
    }
  };

  return {
    initiateGoogleAuth,
  };
};

export default useLoginThroughGoogle;
