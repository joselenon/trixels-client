import React, { useEffect, useState } from 'react';

import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export type TItemInfos = { id: string; img: string; name: string; price: number };

export interface IItemsInfoResponse {
  [itemId: string]: TItemInfos;
}

export default function useGetAvailableItems() {
  const [availableItems, setAvailableItems] = useState<IItemsInfoResponse | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchItems = async () => {
      const availableItemsResponse =
        await MyAxiosServiceInstance.request<IItemsInfoResponse>({
          endpoint: URLS.ENDPOINTS.RAFFLES.GET_AVAILABLE_ITEMS,
          method: 'get',
          data: null,
        });

      if (availableItemsResponse) {
        setAvailableItems(availableItemsResponse.data);
      }
    };

    fetchItems();
  }, []);

  return { availableItems };
}
