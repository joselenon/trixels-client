import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import gameLibItemsJSON from '../../assets/gameLibItems.json';
import { GameLibItemsProps } from '../../interfaces/GameLibItemsProps';

const gameLibItems: GameLibItemsProps = gameLibItemsJSON;
const allItemsKeys = Object.keys(gameLibItems);
const allItemsName = allItemsKeys.map((item) => item);

interface SearchInputContainerProps {
  $itemListActive: boolean;
}

const SearchInputContainer = styled.div<SearchInputContainerProps>`
  width: 100%;
  border-radius: var(--default-br);

  input {
    border: 1px solid #505050;
    border-radius: var(--default-br);
    width: 100%;
    height: 30px;
    padding: 20px 10px;
    margin-bottom: 20px;
  }
  ul {
    background-color: #464646;
    border-radius: var(--default-br);
    max-height: ${({ $itemListActive }) => ($itemListActive ? '200px' : '0')};
    overflow: hidden;
    transition: all 0.2s;
  }
  h4 {
    color: white;
  }
`;

export default function MarketSearchInput({
  setFilteredItems,
}: {
  setFilteredItems: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}) {
  const [itemListActive, setItemListActive] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = allItemsName.filter((itemName) =>
      itemName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredItems(filteredItems);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <SearchInputContainer $itemListActive={itemListActive}>
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Search for an item"
          onFocus={() => setItemListActive(true)}
          onBlur={() => setTimeout(() => setItemListActive(false), 200)}
        />
      </SearchInputContainer>
    </div>
  );
}
