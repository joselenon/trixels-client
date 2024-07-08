import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IReduxStore } from '../interfaces/IRedux';
import { IUserToFrontEnd } from '../interfaces/IUser';
import { TParams } from '../routes/AppRoutes';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export type TUserProfileInfo = IUserToFrontEnd | undefined | null;

export default function useGetUserProfile() {
  const urlParams = useParams<TParams>();
  const { username: usernameToQuery } = urlParams;

  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const [userProfileInfo, setUserProfileInfo] = useState<TUserProfileInfo>(undefined);

  const queryUsername = async () => {
    try {
      if (usernameToQuery === userCredentials?.username) {
        return setUserProfileInfo(userCredentials);
      }

      const response = await MyAxiosServiceInstance.request<IUserToFrontEnd>({
        requestConfig: { method: 'get', url: `/user?username=${usernameToQuery}`, data: { usernameToQuery } },
      });

      if (response && response.data) {
        setUserProfileInfo(response.data);
      } else {
        setUserProfileInfo(null);
      }
    } catch (err) {
      setUserProfileInfo(null);
    }
  };

  return { userProfileInfo, queryUsername };
}
