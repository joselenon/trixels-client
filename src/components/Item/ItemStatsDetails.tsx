/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useLoadItemsAndMetrics } from '../../contexts/LoadItemsAndMetricsContext';
import { ItemProp, ItemStatsProps } from '../../interfaces/ItemStatsComponentsProps';
import ItemInfo from './ItemInfo';
import ItemListings from './ItemListings';

const ItemStatsDetailsContainer = styled.div`
  width: 100%;
  border: 1px solid #383838;
  align-self: flex-start;
  flex: 1;
  padding: 10px;
  border-radius: var(--default-br);
`;

export const DataAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 20px;
    height: 20px;
  }
`;

const LIButtonsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  button {
    padding: 10px;

    &.active {
      cursor: default;
    }
    &.inactive {
      background: #383838;
    }
  }

  h5 {
    text-transform: uppercase;
  }
`;

const ItemStatsContainer = styled.div`
  min-height: 260px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10;
  align-self: flex-start;
`;

export const ItemTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  img {
    width: 12px;
    height: 12px;
  }
`;

export default function ItemStatsDetails({
  itemName,
  showMetrics = ['averagePrice1d'],
  itemInfoUpdated,
}: ItemStatsProps) {
  const { allItemsInfo } = useLoadItemsAndMetrics();

  const [itemInfo, setItemInfo] = useState<ItemProp | undefined>(undefined);
  const [statsMode, setStatsMode] = useState('listings');

  useEffect(() => {
    const getItem = () => {
      if (allItemsInfo && itemName) {
        const itemInAllItems = allItemsInfo[itemName];
        setItemInfo({ [itemName]: itemInAllItems });
      }
    };
    getItem();
  }, [allItemsInfo, itemName]);

  const renderItemDetailsContent = () => {
    if ((itemInfo && itemName) || (itemInfoUpdated && itemName)) {
      switch (statsMode) {
        case 'listings':
          if (itemInfo) {
            return (
              <ItemListings
                itemName={itemName}
                itemInfo={itemInfoUpdated ? itemInfoUpdated : itemInfo}
                showMetrics={showMetrics}
              />
            );
          } else {
            return 'Loading...';
          }

        case 'info':
          if (itemInfo && itemInfo[itemName].metrics.averages) {
            const itemListings = itemInfo[itemName].market.listings;
            const itemAveragesMetrics = itemInfo[itemName].metrics.averages;

            return (
              <ItemInfo
                itemName={itemName}
                averages={itemAveragesMetrics}
                cheapestListing={itemListings?.[0]}
              />
            );
          } else {
            return 'Loading...';
          }
      }
    }
  };

  const renderItemDetails = () => {
    if (itemInfo && itemName && itemInfo[itemName]) {
      return (
        <ItemStatsDetailsContainer>
          <ItemTitleContainer>
            {itemInfo[itemName].image && <img src={itemInfo[itemName].image} alt="" />}
            <h4>{itemName}</h4>
          </ItemTitleContainer>

          <ItemStatsContainer>{renderItemDetailsContent()}</ItemStatsContainer>

          <LIButtonsContainer>
            <button
              type="button"
              className={statsMode === 'listings' ? 'active' : 'inactive'}
              onClick={() => setStatsMode('listings')}
            >
              <h5>Listings</h5>
            </button>
            <button
              type="button"
              className={statsMode === 'info' ? 'active' : 'inactive'}
              onClick={() => setStatsMode('info')}
            >
              <h5>Info</h5>
            </button>
          </LIButtonsContainer>
        </ItemStatsDetailsContainer>
      );
    } else {
      return <h3>PICK</h3>;
    }
  };

  return <>{renderItemDetails()}</>;
}
