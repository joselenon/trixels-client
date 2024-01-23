import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { IUser, IUserJWTPayload } from '../interfaces/IUser';

interface UserContextProps {
  isLogged: boolean;
  credentials?: IUser;
}

const UserContext = createContext<UserContextProps>({
  isLogged: false,
});

export function UserContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserContextProps>({ isLogged: false });

  useEffect(() => {
    const tokenCookie = Cookies.get('token');

    if (tokenCookie !== undefined) {
      try {
        const decodedToken = jwtDecode<IUserJWTPayload>(tokenCookie);

        setUser({ isLogged: true, credentials: decodedToken });
      } catch (error) {
        console.error('Error decoding token:', error);
        Cookies.remove('token');
      }
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
