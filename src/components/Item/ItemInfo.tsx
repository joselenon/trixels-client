import React from 'react';
import styled from 'styled-components';

import { ItemInfoProps } from '../../interfaces/ItemStatsComponentsProps';

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export default function ItemInfo({ itemName, averages }: ItemInfoProps) {
  const { averagePrice1h, averagePrice1d, averagePrice7d } = averages;

  return (
    <InfoContainer>
      <div>
        <h4>Avg. Price (1h): {averagePrice1h.metricValue.toFixed(2)}</h4>
        <h4>Avg. Price (1d): {averagePrice1d.metricValue.toFixed(2)}</h4>
        <h4>Avg. Price (7d): {averagePrice7d.metricValue.toFixed(2)}</h4>
      </div>
      <h4>Liquidity: </h4>
      <iframe
        title={itemName}
        src={`https://grafana.pixelsmarket.xyz/d-solo/a39dd237-1228-4c68-9136-da8b67c786d2/free-graphs?orgId=3&var-itemid=${itemName}&from=1702098609354&to=1702703409354&panelId=3`}
        width="350"
        height="100%"
      ></iframe>

      {/* <LineGraph itemName={itemName} xValues={daysArray} yValues={pricesArray} /> */}
    </InfoContainer>
  );
}
