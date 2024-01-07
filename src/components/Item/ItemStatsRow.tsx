/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { SetStateAction } from 'react';
import styled from 'styled-components';

import { useLoadItemsAndMetrics } from '../../contexts/LoadItemsAndMetricsContext';
import setDiffFromCurrentPriceCSS from '../../utils/diffFromCurrentPriceInfo';

export const DataAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 20px;
    height: 20px;
  }
`;

export default function ItemStatsRow({
  itemName,
  setItemSelection,
}: {
  itemName: string;
  setItemSelection: React.Dispatch<SetStateAction<string | undefined>>;
}) {
  const { allItemsInfo } = useLoadItemsAndMetrics();

  const { css, treatedString } = setDiffFromCurrentPriceCSS(
    allItemsInfo?.[itemName].market.listings?.[0].price || 1,
    allItemsInfo?.[itemName].metrics.averages?.averagePrice7d.metricValue || 1,
  );

  return (
    <>
      {allItemsInfo && itemName && allItemsInfo[itemName] && (
        <tr>
          <td className="itemName" onClick={() => setItemSelection(itemName)}>
            <DataAndIconContainer>
              <img src={allItemsInfo[itemName].image} alt="" /> <h4>{itemName}</h4>
            </DataAndIconContainer>
          </td>
          <td className="itemPrice" style={{ width: '20px' }}>
            <h4>{allItemsInfo[itemName].market.listings?.[0].price || 'Not Tradable'}</h4>
          </td>
          <td className="itemQuantity">
            <h4 style={{ color: '#838383' }}>
              {allItemsInfo[itemName].market.listings?.[0].quantity || 'Not Tradable'}
            </h4>
          </td>
          <td className="itemAvg">
            <h4 className={css}>{treatedString}</h4>
          </td>
        </tr>
      )}
    </>
  );
}
