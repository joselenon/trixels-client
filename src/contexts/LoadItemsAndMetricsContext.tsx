import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import gameLibItemsJSON from '../assets/gameLibItems.json';
import { GameLibItemsProps } from '../interfaces/GameLibItemsProps';
import {
  GetItemsListingsProps,
  ItemHistoryPricesData,
  ItemMarketData,
  ItemProp,
  MetricsProps,
} from '../interfaces/ItemStatsComponentsProps';
import { MyAxiosService } from '../services/MyAxiosService';
import historyPricesTreatment from '../utils/historyPricesTreatment';

interface LoadItemsAndMetricsState {
  allItemsInfo: ItemProp | undefined;
  setAllItemsInfo: React.Dispatch<React.SetStateAction<ItemProp | undefined>>;
}

const gameLibItems: GameLibItemsProps = gameLibItemsJSON;

const LoadItemsAndMetricsContext = createContext<LoadItemsAndMetricsState | undefined>(
  undefined,
);

const LoadItemsAndMetricsContextProvider = ({ children }: { children: ReactElement }) => {
  const [allItemsInfo, setAllItemsInfo] = useState<ItemProp | undefined>(undefined);

  const getAllHistoryPrices = async (): Promise<ItemHistoryPricesData | undefined> => {
    const response = await MyAxiosService<ItemHistoryPricesData>({
      endpoint: `/historyprices`,
      method: 'get',
    });

    if (response.api.data) return response.api.data; // FIX THIS
  };

  const getAllItemsListings = async () => {
    const responseData = await MyAxiosService<string>({
      endpoint: `/itemslistings`,
      method: 'get',
    });

    if (responseData.api.data) {
      const responseDataParsed = JSON.parse(
        responseData.api.data,
      ) as GetItemsListingsProps;
      return responseDataParsed;
    }
  };

  const allItemsAndMetrics = async () => {
    const items: ItemProp = {};

    const allItems = Object.keys(gameLibItems);

    const allHistoryPrices = await getAllHistoryPrices();
    const allItemsListings = await getAllItemsListings();

    const itemsWithError = [];

    for (const itemName of allItems) {
      if (allItemsListings && allItemsListings[itemName] && allHistoryPrices) {
        const itemListingsInfo = allItemsListings[itemName];

        const getItemMarketAndMetrics = (): {
          market: ItemMarketData;
          metrics: MetricsProps;
        } => {
          const itemListings = itemListingsInfo.listings;
          const itemOwnerUsernames = itemListingsInfo.ownerUsernames;

          const cheapestListing = itemListingsInfo.listings[0];

          const averages = historyPricesTreatment(allHistoryPrices[itemName]);

          return {
            metrics: { averages, cheapestListing },
            market: { listings: itemListings, ownerUsernames: itemOwnerUsernames },
          };
        };

        const putItemInItemsObj = () => {
          const { market, metrics } = getItemMarketAndMetrics();

          items[itemName] = {
            image: gameLibItems[itemName].image,
            metrics,
            market,
          };
        };

        putItemInItemsObj();
      } else {
        itemsWithError.push({ itemName });
      }

      setAllItemsInfo(items);
    }

    if (itemsWithError.length > 0) {
      /* toast.error(
        'Some errors related to items listings and metrics. \n Check console for more details.',
      );
      console.log(itemsWithError); */
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      await allItemsAndMetrics();
    };

    loadItems();

    /*     const getItemsLoop = setInterval(loadItems, 10000);
    return () => {
      clearInterval(getItemsLoop);
    }; */
  }, []);

  return (
    <LoadItemsAndMetricsContext.Provider value={{ allItemsInfo, setAllItemsInfo }}>
      {children}
    </LoadItemsAndMetricsContext.Provider>
  );
};

// Criar um hook customizado para usar o contexto
const useLoadItemsAndMetrics = () => {
  const context = useContext(LoadItemsAndMetricsContext);
  if (!context) {
    throw new Error('useMyContext deve ser usado dentro de um MyContextProvider');
  }
  return context;
};

export { LoadItemsAndMetricsContextProvider, useLoadItemsAndMetrics };

/*
// Exemplo de uso do contexto
const MeuComponente = () => {
  const { myData, setMyData } = useMyContext();

  return (
    <div>
      <p>{myData}</p>
      <button onClick={() => setMyData('Novo valor')}>Atualizar Valor</button>
    </div>
  );
};

// Para utilizar o contexto, envolva sua aplicação com o provedor
const App = () => {
  return (
    <MyContextProvider>
      <MeuComponente />
    </MyContextProvider>
  );
};

export default App;
 */
