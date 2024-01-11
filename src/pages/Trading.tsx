/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ItemStatsDetails from '../components/Item/ItemStatsDetails';
import TradingSearchInput from '../components/SearchInput/TradingSearchInput';
import { useLoadItemsAndMetrics } from '../contexts/LoadItemsAndMetricsContext';
import {
  ItemMarketData,
  ItemMetricsProps,
  ItemProp,
} from '../interfaces/ItemStatsComponentsProps';
import { AxiosService } from '../services/AxiosService';
import getDiffFromCurrentPrice from '../utils/getDiffFromCurrentPrice';
import treatItemListings from '../utils/treatItemListings';

const TradingTypesContainer = styled.div`
  width: 100%;
  gap: 1rem;
  display: grid;
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
`;

const TypeContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  h3 {
    text-transform: uppercase;
  }
`;

const TypeTitleContainer = styled.div`
  margin-bottom: 20px;
`;

const ListingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function Trading() {
  const { allItemsInfo } = useLoadItemsAndMetrics();

  const [allItemsInfoUpdated, setAllItemsInfoUpdated] = useState<ItemProp | undefined>(
    undefined,
  );
  const [itemsToShow, setItemsToShow] = useState<string[]>([]);
  const [elementsOrdered, setElementsOrdered] = useState<JSX.Element[] | undefined>();

  useEffect(() => {
    setAllItemsInfoUpdated(allItemsInfo);
  }, [allItemsInfo]);

  const sortBy1h = () => {
    if (allItemsInfoUpdated) {
      const sortedItemsToShowTreated = [...itemsToShow];
      sortedItemsToShowTreated.sort((itemName1, itemName2) => {
        const infoItem1 = allItemsInfoUpdated[itemName1];
        const infoItem2 = allItemsInfoUpdated[itemName2];

        const { metrics: metricsInfo1 } = infoItem1;
        const { metrics: metricsInfo2 } = infoItem2;

        if (metricsInfo1 && metricsInfo2) {
          const diffCalc1 = getDiffFromCurrentPrice(
            metricsInfo1.cheapestListing.price,
            metricsInfo1.averages.averagePrice1d.metricValue,
          );

          const diffCalc2 = getDiffFromCurrentPrice(
            metricsInfo2.cheapestListing.price,
            metricsInfo2.averages.averagePrice1d.metricValue,
          );

          return diffCalc2 - diffCalc1;
        }

        return 0;
      });

      const elements = sortedItemsToShowTreated
        .map((itemName) => {
          return (
            <div key={itemName}>
              <ItemStatsDetails
                itemName={itemName}
                showMetrics={['averagePrice1d'] as Array<keyof ItemMetricsProps>}
                itemInfoUpdated={{ [itemName]: allItemsInfoUpdated[itemName] }}
              />
            </div>
          );
        })
        .slice(0, 10);

      return setElementsOrdered(elements);
    }
  };

  const fetchItemMarketData = async (itemName: string) => {
    const fetchedData = await AxiosService<ItemMarketData>({
      url: `https://pixels-server.pixels.xyz/v1/marketplace/item/${itemName}`,
    });

    if (fetchedData) {
      setAllItemsInfoUpdated((prev: ItemProp | undefined) => {
        if (prev && itemName) {
          const newItemListingsTreated = treatItemListings(fetchedData.listings);
          const newItemInfo: ItemProp = {
            [itemName]: {
              ...prev[itemName],
              market: {
                listings: newItemListingsTreated ? newItemListingsTreated : [],
                ownerUsernames: fetchedData.ownerUsernames,
              },
              metrics: {
                averages: prev[itemName].metrics?.averages, // TODOS ITENS TEM A CHAVE METRICS (ARRUMAR A DUVIDA)
                cheapestListing: newItemListingsTreated![0], // FIX
              },
            },
          };

          return { ...prev, ...newItemInfo };
        } else {
          return prev;
        }
      });
    }
  };

  useEffect(() => {
    sortBy1h();
  }, [allItemsInfoUpdated]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3008');
    socket.addEventListener('open', (event) => {
      console.log('Conectado ao servidor WS.');
      socket.send(JSON.stringify(itemsToShow));
    });

    socket.addEventListener('message', (event) => {
      console.log('Mensagem Recebida: ', event.data);
    });

    const fetchDataAndUpdate = async () => {
      const fetchPromises = itemsToShow.map(async (itemName) => {
        await fetchItemMarketData(itemName);
      });

      await Promise.all(fetchPromises);
    };

    fetchDataAndUpdate();

    const updateItemsInterval = setInterval(fetchDataAndUpdate, 5000);
    return () => clearInterval(updateItemsInterval);
  }, [itemsToShow, allItemsInfo]);

  return (
    <div style={{ display: 'flex' }}>
      <TradingTypesContainer>
        <TypeContainer>
          <TypeTitleContainer>
            <h4>Avg. 7d.</h4>
            <h3>Long-term</h3>
          </TypeTitleContainer>

          <TradingSearchInput itemsToShow={itemsToShow} setItemsToShow={setItemsToShow} />
        </TypeContainer>

        <TypeContainer>
          <TypeTitleContainer>
            <h4>Avg. 1d.</h4>
            <h3>Short-term</h3>
          </TypeTitleContainer>

          <TradingSearchInput itemsToShow={itemsToShow} setItemsToShow={setItemsToShow} />

          <ListingsContainer>{elementsOrdered}</ListingsContainer>
        </TypeContainer>

        <TypeContainer>
          <TypeTitleContainer>
            <h4>All Metrics Considered</h4>
            <h3>VIP-Term</h3>
          </TypeTitleContainer>

          <TradingSearchInput itemsToShow={itemsToShow} setItemsToShow={setItemsToShow} />
        </TypeContainer>
      </TradingTypesContainer>
    </div>
  );
}
