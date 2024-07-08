import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { IReduxStore } from '../interfaces/IRedux';

export default function useRequireLogin() {
  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const requireLogin = (showMessage = true): boolean => {
    if (!userCredentials) {
      showMessage && toast.error('You should log in first');
      return false;
    }
    return true;
  };

  return requireLogin;
}
