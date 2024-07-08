import { useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { IGoogleAuthResponse } from '../components/Modals/AuthModal/LoginForm';
import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';

interface IUseLoginThroughGoogleProps {
  onMessageReceived: (data: IGoogleAuthResponse) => void;
}

const useLoginThroughGoogle = ({ onMessageReceived }: IUseLoginThroughGoogleProps) => {
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const { origin, data } = event;

      if (origin === 'http://localhost:3000' && data?.state) {
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
    const stateAuth = uuid();

    const res = await MyAxiosServiceInstance.request<{ authorizeUrl: string }>({
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
