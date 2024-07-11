import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import URLS from '../config/constants/URLS';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

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
        const availableItemsResponse = await TrixelsAxiosServiceInstance.request<IItemsInfoResponse>({
          requestConfig: { url: URLS.ENDPOINTS.RAFFLES.GET_AVAILABLE_ITEMS, method: 'get', data: null },
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
