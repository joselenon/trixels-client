/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import cur_berry from '../../assets/cur_berry.png';
import sonicRingSound from '../../assets/sonicRingSound.mp3';
import { SVGAverage, SVGFilledQuantity, SVGFilledUser } from '../../assets/SVGIcons';
import {
  ItemListingKeys,
  ItemListingProps,
  ItemMetricsProps,
  ItemProp,
} from '../../interfaces/ItemStatsComponentsProps';
import diffFromCurrentPriceInfo from '../../utils/diffFromCurrentPriceInfo';

const ListingsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ListingsTable = styled.table`
  width: 400px;
  display: block;
  table-layout: fixed;
  border-collapse: separate;
  overflow-x: auto;
  border-spacing: 0;
  border-radius: var(--default-br);

  tbody {
    tr {
      &:hover {
        background: #282828;
      }
    }
  }

  tr {
    display: block;
  }
  tr:first-child td {
    border-top: 1px solid #383838;
  }
  td:last-child {
    border-right: 1px solid #383838;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 10px;
  }
  tr:first-child td:last-child {
    border-top-right-radius: 10px;
  }
  tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
  tr:first-child td {
    border-top-style: solid;
  }
  tr td:first-child {
    border-left-style: solid;
  }

  td,
  th {
    &.name,
    &.player {
      min-width: 150px;
      max-width: 150px;
      cursor: pointer;
      text-align: start;
    }
    &.price {
      min-width: 80px;
      max-width: 80px;
    }
    &.quantity {
      min-width: 80px;
      max-width: 80px;
    }
    &.averagePrice1d,
    &.averagePrice1h,
    &.averagePrice7d {
      min-width: 90px;
      max-width: 90px;
    }
  }

  td {
    border-left: 1px solid #383838;
    border-bottom: 1px solid #383838;
    padding: 10px;
    text-align: end;

    h4 {
      height: 20px;
    }
  }

  th {
    padding: 10px;
    text-align: end;

    &.itemName {
      text-align: start;
    }
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const ItemMarketInfo = styled.tr`
  &:hover {
    background-color: var(--primary-color) !important;
  }
`;

export const DataAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  img,
  svg {
    width: 12px;
    height: 12px;
  }

  &.name,
  &.player {
    justify-content: flex-start;
  }
`;

const ExpandContainer = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  svg {
    width: 14px;
  }
`;

const tdIcons: { [key: string]: JSX.Element } = {
  player: <SVGFilledUser />,
  price: <img src={cur_berry} width={10} height={10} alt="berry-logo" />,
  quantity: <SVGFilledQuantity />,
  averagePrice1h: <SVGAverage />,
  averagePrice1d: <SVGAverage />,
  averagePrice7d: <SVGAverage />,
};

export default function ItemListings({
  itemName,
  itemInfo,
  showMetrics,
}: {
  itemName: string;
  itemInfo: ItemProp;
  showMetrics: (keyof ItemMetricsProps)[];
}) {
  const [TRsElements, setTRsElements] = useState<JSX.Element[]>([]);
  const [chunkPage, setChunkPage] = useState(1);
  const item = itemInfo[itemName];

  const listings = item.market.listings;
  const metrics = item.metrics;
  const listingsOwners = item.market.ownerUsernames;

  const chunks = 5;
  const startIndex = (chunkPage - 1) * chunks;
  const endIndex = startIndex + chunks;

  const getSellerUsername = (sellerId: string) => {
    return listingsOwners ? listingsOwners[sellerId] : 'NOT_FOUND';
  };

  const renderItemListingsTable = () => {
    if (!listings || listings.length <= 0) return <h4>No listings for this item</h4>;

    const THsInfo: { [tdId: string]: { tdName: string; tdIcon: JSX.Element } } = {
      player: { tdName: 'Player', tdIcon: tdIcons['player'] },
      price: { tdName: 'Price', tdIcon: tdIcons['price'] },
      quantity: { tdName: 'Quantity', tdIcon: tdIcons['quantity'] },
    };

    const addMetricsTHs = () => {
      if (metrics) {
        const metricsAverages = metrics.averages;

        if (metricsAverages) {
          showMetrics.map((m: string) => {
            THsInfo[m] = {
              tdName: metricsAverages[m as keyof ItemMetricsProps].caption,
              tdIcon: tdIcons[m],
            };
            return m;
          });
        }
      }
    };

    const THsElements = () => {
      addMetricsTHs();
      const THsKeys = Object.keys(THsInfo);

      return THsKeys.map((key, i) => (
        <th key={i} className={key}>
          <DataAndIconContainer className={key}>
            {THsInfo[key].tdIcon}
            <h5>{THsInfo[key].tdName}</h5>
          </DataAndIconContainer>
        </th>
      ));
    };

    const RenderTRsElements = () => {
      const THsKeys = Object.keys(THsInfo);
      return listings
        .map((listing) => {
          const playerTD = (
            <td className="name" key={listing.ownerId}>
              <h4>{getSellerUsername(listing.ownerId)}</h4>
            </td>
          );

          const listingKeys = Object.keys(listing);
          const listingTDs = listingKeys
            .filter((key: string): key is ItemListingKeys =>
              THsKeys.includes(key as keyof ItemListingProps),
            )
            .map((key, i) => {
              let keyValue = listing[key];
              if (key === 'quantity') {
                keyValue = listing[key] - listing['purchasedQuantity'];
              }
              return (
                <td key={i} className={key}>
                  <h4>{keyValue}</h4>
                </td>
              );
            });

          const metricsTDs = () => {
            if (metrics) {
              const metricAverages = metrics.averages;
              const cheapestListing = metrics.cheapestListing;

              if (metricAverages && cheapestListing) {
                const averagesKeys = Object.keys(metricAverages);
                const filteredAverages = averagesKeys.filter((avgKey) =>
                  showMetrics.includes(avgKey as keyof ItemMetricsProps),
                );

                const renderMetricCalc = (average: keyof ItemMetricsProps) => {
                  const getDiffFromCurrentPriceSettings = diffFromCurrentPriceInfo(
                    listing.price,
                    metricAverages[average as keyof ItemMetricsProps].metricValue,
                  );
                  const { css, treatedString, percentage } =
                    getDiffFromCurrentPriceSettings;

                  return (
                    <div>
                      {percentage > 6.5 && (
                        <audio autoPlay>
                          <source src={sonicRingSound} type="audio/mp3" />
                        </audio>
                      )}
                      <h4 className={css}>{treatedString}</h4>
                    </div>
                  );
                };

                return filteredAverages.map((average, i) => (
                  <td className={average} key={i}>
                    {renderMetricCalc(average as keyof ItemMetricsProps)}
                  </td>
                ));
              }
            }
          };

          return (
            <ItemMarketInfo key={listing._id}>
              {playerTD}
              {listingTDs}
              {metricsTDs()}
            </ItemMarketInfo>
          );
        })
        .slice(startIndex, endIndex);
    };

    useEffect(() => {
      const updatedTRsElements = RenderTRsElements();
      setTRsElements(updatedTRsElements);
    }, [itemInfo, chunkPage]);

    return (
      <>
        <ListingsTable>
          <thead>
            <tr>{THsElements()}</tr>
          </thead>
          <tbody>{TRsElements}</tbody>
        </ListingsTable>

        <ExpandContainer>
          <button type="button" onClick={() => setChunkPage((prev) => prev - 1)}>
            <h4>{'<'}</h4>
          </button>
          <h4>{chunkPage}</h4>
          <button type="button" onClick={() => setChunkPage((prev) => prev + 1)}>
            <h4>{'>'}</h4>
          </button>
        </ExpandContainer>
      </>
    );
  };

  return (
    <ListingsContainer>
      <>{renderItemListingsTable()}</>
    </ListingsContainer>
  );
}
