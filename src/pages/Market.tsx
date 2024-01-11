import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ItemStatsDetails from '../components/Item/ItemStatsDetails';
import ItemStatsRow from '../components/Item/ItemStatsRow';
import MarketSearchInput from '../components/SearchInput/MarketSearchInput';
import { useLoadItemsAndMetrics } from '../contexts/LoadItemsAndMetricsContext';
import { TabTitle } from '../styles/GlobalStyles';

const MarketContainer = styled.div``;

const ItemsAndStatsDetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ItemsTable = styled.table`
  width: 1000px;
  border: 1px solid #373737;
  border-radius: var(--default-br);
  /*   table-layout: fixed; */
  border-collapse: separate;
  overflow-x: auto;
  border-spacing: 0;

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

  td {
    border-left: 1px solid #383838;
    border-bottom: 1px solid #383838;
    padding: 10px;
    text-align: end;

    &.itemName {
      width: 55%;
      cursor: pointer;
    }
    &.itemPrice {
      width: 15%;
    }
    &.itemQuantity {
      width: 15%;
    }
    &.itemAvg {
      width: 15%;
    }
  }

  th {
    padding: 10px;
    text-align: end;

    &.itemName {
      text-align: start;
    }
  }

  tbody {
    tr {
      margin-bottom: 0px;
      &:hover {
        background: #282828;
      }
    }
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

export default function Market() {
  const { allItemsInfo } = useLoadItemsAndMetrics();

  console.log('itens aqui market', allItemsInfo);

  const [allItemsKeys, setAllItemsKeys] = useState<Array<string> | undefined>(undefined);
  const [filteredItems, setFilteredItems] = useState<Array<string>>();
  const [itemSelection, setItemSelection] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (allItemsInfo) {
      const allItemsKeys = Object.keys(allItemsInfo);
      setAllItemsKeys(allItemsKeys);
    }
  }, [allItemsInfo]);

  return (
    <MarketContainer>
      <TabTitle>MARKET</TabTitle>
      <MarketSearchInput setFilteredItems={setFilteredItems} />

      <ItemsAndStatsDetailsContainer>
        <ItemsTable>
          <thead>
            <tr>
              <th className="itemName">
                <h5>ITEM</h5>
              </th>
              <th>
                <h5>PRICE</h5>
              </th>
              <th>
                <h5>QUANTITY</h5>
              </th>
              <th>
                <h5>AVG. 7d</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems
              ? filteredItems
                  .map((itemName: any) => (
                    <ItemStatsRow
                      key={itemName}
                      itemName={itemName}
                      /* showMetrics={['averagePrice1d']} */
                      setItemSelection={setItemSelection}
                    />
                  ))
                  .slice(0, 25)
              : allItemsKeys &&
                allItemsKeys
                  .map((itemName) => {
                    return (
                      <ItemStatsRow
                        key={itemName}
                        itemName={itemName}
                        /* showMetrics={['averagePrice7d']} */
                        setItemSelection={setItemSelection}
                      />
                    );
                  })
                  .slice(0, 25)}
          </tbody>
        </ItemsTable>

        {/* Começar a implementar logica para atualização dinamica de itens */}
        <ItemStatsDetails itemName={itemSelection} />
      </ItemsAndStatsDetailsContainer>
    </MarketContainer>
  );
}
