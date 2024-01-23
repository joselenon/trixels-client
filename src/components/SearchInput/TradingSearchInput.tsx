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
    overflow-y: scroll;
    transition: all 0.2s;
  }
  h4 {
    max-width: 300px;
    font-size: 1rem;
    color: #bdbdbd;
    font-weight: 400;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: white;
  }
`;

const DataAndIconContainer = styled.div`
  border-radius: var(--default-br);
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px;
  &:hover {
    background-color: #414141;
    cursor: pointer;
  }
  svg {
    fill: #4dab4d;
  }
`;

interface TradingSearchInput {
  setItemsToShow: React.Dispatch<React.SetStateAction<string[]>>;
  itemsToShow: string[];
}

export default function TradingSearchInput({
  setItemsToShow,
  itemsToShow,
}: TradingSearchInput) {
  const [itemListActive, setItemListActive] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [filteredItems, setFilteredItems] = useState(allItemsName);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = allItemsName.filter((itemName) =>
      itemName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredItems(filteredItems);
  };

  const handleActivateItem = (itemName: string) => {
    setItemListActive(false);

    if (itemsToShow.includes(itemName)) {
      return setItemsToShow((prev: string[]) => {
        return prev.filter((itemsToShowName) => itemsToShowName !== itemName);
      });
    }

    setItemsToShow((prev: string[]) => {
      return [...prev, itemName];
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <SearchInputContainer $itemListActive={itemListActive}>
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
          onFocus={() => setItemListActive(true)}
          onBlur={() => setTimeout(() => setItemListActive(false), 200)}
        />
        <ul>
          {filteredItems.length < 7 && <li>Item not found.</li>}
          {filteredItems
            .map((itemName) => (
              <li key={itemName}>
                <DataAndIconContainer onClick={() => handleActivateItem(itemName)}>
                  <img src={gameLibItems[itemName].image} width={25} height={25} alt="" />
                  <h4>{itemName}</h4>

                  {itemsToShow.includes(itemName) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                  )}

                  {Object.keys(itemsToShow).some(
                    (itemAddedName) => itemAddedName === itemName,
                  ) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="14"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  ) : (
                    ''
                  )}
                </DataAndIconContainer>
              </li>
            ))
            .slice(0, 10)}
        </ul>
      </SearchInputContainer>
    </div>
  );
}
