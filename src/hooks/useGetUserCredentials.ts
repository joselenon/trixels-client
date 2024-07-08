import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IReduxStore } from '../interfaces/IRedux';
import { IUserToFrontEnd } from '../interfaces/IUser';

export type TUserProfileInfo = IUserToFrontEnd | undefined | null;

export default function useGetUserCredentials() {
  const userCredentialsState = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const [userCredentials, setUserProfileInfo] = useState<TUserProfileInfo>(undefined);

  useEffect(() => {
    setUserProfileInfo(userCredentialsState);
  }, [userCredentialsState]);

  return { userCredentials };
}
