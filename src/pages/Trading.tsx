/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ItemStatsDetails from '../components/Item/ItemStatsDetails';
import TradingSearchInput from '../components/SearchInput/TradingSearchInput';
import { useLoadItemsAndMetrics } from '../contexts/LoadItemsAndMetricsContext';
import {
  ItemMarketData,
  ItemMetricsProps,
  ItemProp,
} from '../interfaces/ItemStatsComponentsProps';
import AxiosService from '../services/AxiosService';
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
  const [itemsToShow, setItemsToShow] = useState<string[]>([]);
  const [allItemsInfoUpdated, setAllItemsInfoUpdated] = useState<ItemProp | undefined>(
    undefined,
  );
  const [elementsOrdered, setElementsOrdered] = useState<JSX.Element[] | undefined>();

  const { allItemsInfo } = useLoadItemsAndMetrics();

  useEffect(() => {
    setAllItemsInfoUpdated(allItemsInfo);
  }, [allItemsInfo]);

  const sortBy1h = () => {
    console.log('ORDENADO!!!');

    if (allItemsInfoUpdated) {
      const sortedItemsToShowTreated = [...itemsToShow];
      sortedItemsToShowTreated.sort((itemName1, itemName2) => {
        const infoItem1 = allItemsInfoUpdated[itemName1];
        const infoItem2 = allItemsInfoUpdated[itemName2];

        if (
          infoItem1.market.listings &&
          infoItem2.market.listings &&
          infoItem1.market.listings.length > 0 &&
          infoItem2.market.listings.length
        ) {
          const diffCalc1 = getDiffFromCurrentPrice(
            infoItem1.metrics.cheapestListing!.price,
            infoItem1.metrics.averages!.averagePrice1d.metricValue,
          );
          const diffCalc2 = getDiffFromCurrentPrice(
            infoItem2.metrics.cheapestListing!.price,
            infoItem2.metrics.averages!.averagePrice1d.metricValue,
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
    console.log(itemName, '- Fetching Item...');
    const { data } = await AxiosService<ItemMarketData>({
      method: 'get',
      url: `https://pixels-server.pixels.xyz/v1/marketplace/item/${itemName}`,
    });

    if (data) {
      console.log(itemName, '- Item fetched');

      setAllItemsInfoUpdated((prev: ItemProp | undefined) => {
        if (prev && itemName) {
          const newItemListingsTreated = treatItemListings(data.listings);
          const newItemInfo: ItemProp = {
            [itemName]: {
              ...prev[itemName],
              market: {
                listings: newItemListingsTreated,
                ownerUsernames: data.ownerUsernames,
              },
              metrics: {
                averages: prev[itemName].metrics.averages,
                cheapestListing: newItemListingsTreated![0], // FIX
              },
            },
          };

          return { ...prev, ...newItemInfo };
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      await Promise.all(
        itemsToShow.map(async (itemName) => {
          await fetchItemMarketData(itemName);
        }),
      );
      sortBy1h();
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
