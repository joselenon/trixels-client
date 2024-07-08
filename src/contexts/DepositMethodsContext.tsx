/* import React, { createContext, useContext, useEffect, useState } from 'react';

import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export type TMethodInfo = {
  networks: { description: string; walletAddress: string; minimumAmount: number }[];
};

export interface IDepositMethods {
  [symbol: string]: TMethodInfo;
}

const DepositMethodsContext = createContext<IDepositMethods | undefined>(undefined);

export const DepositMethodsContextProvider: React.FC = ({ children }) => {
  const [depositMethods, setDepositMethods] = useState<IDepositMethods | undefined>(undefined);

  useEffect(() => {
    const fetchDepositMethods = async () => {
      try {
        const depositMethodsResponse = await MyAxiosServiceInstance.request<IDepositMethods>({
          url: URLS.ENDPOINTS.DEPOSIT.GET_DEPOSIT_METHODS,
          method: 'get',
          data: null,
        });

        if (depositMethodsResponse) {
          setDepositMethods(depositMethodsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching available items:', error);
      }
    };

    fetchDepositMethods();
  }, []);

  return <DepositMethodsContext.Provider value={depositMethods}>{children}</DepositMethodsContext.Provider>;
};

export const useDepositMethodsContext = () => useContext(DepositMethodsContext);
 */
