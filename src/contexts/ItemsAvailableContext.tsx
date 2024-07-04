import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export type TItemInfos = { id: string; img: string; name: string; price: number };

export interface IItemsInfoResponse {
  [itemId: string]: TItemInfos;
}

const AvailableItemsContext = createContext<IItemsInfoResponse | undefined>(undefined);

export default function AvailableItemsContextProvider({ children }: { children: ReactNode }) {
  const [availableItems, setAvailableItems] = useState<IItemsInfoResponse | undefined>(undefined);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const availableItemsResponse = await MyAxiosServiceInstance.request<IItemsInfoResponse>({
          endpoint: URLS.ENDPOINTS.RAFFLES.GET_AVAILABLE_ITEMS,
          method: 'get',
          data: null,
        });

        if (availableItemsResponse && availableItemsResponse.data) {
          setAvailableItems(availableItemsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching available items:', error);
      }
    };

    fetchItems();
  }, []);

  return <AvailableItemsContext.Provider value={availableItems}>{children}</AvailableItemsContext.Provider>;
}

export const useAvailableItemsContext = () => useContext(AvailableItemsContext);
