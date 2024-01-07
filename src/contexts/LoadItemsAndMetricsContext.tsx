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
  ItemHistoryPricesData,
  ItemMarketData,
  ItemProp,
  MetricsProps,
} from '../interfaces/ItemStatsComponentsProps';
import AxiosService from '../services/AxiosService';
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

  const getAllHistoryPrices = async () => {
    const { data } = await AxiosService<{ data: ItemHistoryPricesData }>({
      url: `http://localhost:3008/api/historyprices`,
      method: 'get',
    });

    if (data) return data.data; // FIX THIS
  };

  const getAllItemsListings = async () => {
    const { data } = await AxiosService({
      url: `http://localhost:3008/api/itemslistings`,
      method: 'get',
    });

    if (data) return data.data; // FIX THIS
  };

  const allItemsAndMetrics = async () => {
    const items: ItemProp = {};

    const allItems = Object.keys(gameLibItems);

    const allHistoryPrices = await getAllHistoryPrices();
    const itemsListingsJSON = await getAllItemsListings();

    const itemsListings: { [itemName: string]: ItemMarketData } =
      itemsListingsJSON && JSON.parse(itemsListingsJSON);

    for (const itemName of allItems) {
      const itemListingsInfo = itemsListings[itemName];

      const getItemMarketAndMetrics = (): {
        market: ItemMarketData;
        metrics: MetricsProps;
      } => {
        const isItemsListingsEmpty =
          !itemListingsInfo?.listings || itemListingsInfo?.listings.length <= 0;

        const itemListings = isItemsListingsEmpty ? null : itemListingsInfo.listings;

        const itemOwnerUsernames = isItemsListingsEmpty
          ? null
          : itemListingsInfo.ownerUsernames;

        const cheapestListing = isItemsListingsEmpty
          ? null
          : itemListingsInfo.listings?.[0];

        const averages =
          isItemsListingsEmpty || !allHistoryPrices
            ? null
            : historyPricesTreatment(allHistoryPrices.prices[itemName]);

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
    }

    setAllItemsInfo(items);
  };

  useEffect(() => {
    const loadItems = async () => {
      allItemsAndMetrics();
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
