import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IReduxStore } from '../interfaces/IRedux';
import { IUserToFrontEnd } from '../interfaces/IUser';
import { TParams } from '../routes/AppRoutes';
import { MyAxiosService } from '../services/MyAxiosService';

export default function useGetUserProfile() {
  const urlParams = useParams<TParams>();
  const { username: usernameToQuery } = urlParams;

  const userCredentials = useSelector<
    IReduxStore,
    IReduxStore['auth']['userCredentials']
  >((state) => state.auth.userCredentials);

  const [userProfileInfo, setUserProfileInfo] = useState<IUserToFrontEnd | undefined>(
    undefined,
  );

  const queryUsername = async () => {
    if (usernameToQuery === userCredentials?.username) {
      return setUserProfileInfo(userCredentials);
    }

    const response = await MyAxiosService<IUserToFrontEnd>({
      endpoint: `/user?username=${usernameToQuery}`,
      data: usernameToQuery,
    });
    if (response) {
      setUserProfileInfo(response.data);
    }
  };

  useEffect(() => {
    queryUsername();
  }, []);

  return userProfileInfo;
}
