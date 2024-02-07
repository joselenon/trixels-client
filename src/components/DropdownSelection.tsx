import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

import { AXSIcon, BERRYIcon } from './CurrenciesIcons';

interface IDropdownSelectionProps {
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
  dropdownItems: any;
}

interface IDropdownCotainerProps {
  isOpened: boolean;
}

const TokenSelectionContainer = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownContainer = styled.div<IDropdownCotainerProps>`
  position: absolute;
  width: 200px;
  width: 100%;
  display: ${({ isOpened }) => (isOpened ? 'flex' : 'none')};
  flex-direction: column;

  button {
    padding: 10px;
  }
`;

export const ItemButton = styled.button`
  /* background: var(--primary-bg-color); */
  background: #6b8dbd;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 10px;

  h4 {
    color: white;
  }

  &.active {
    background: #56749d;
  }
`;

export default function TokenSelection({
  selected,
  setSelected,
  dropdownItems,
}: IDropdownSelectionProps) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleTokenSelection = (selection: string) => {
    setSelected({
      symbol: selection,
      Element: (
        <>
          {selection === 'AXS' && AXSIcon}
          {selection === 'BERRY' && BERRYIcon}
          <h4>{selection}</h4>
        </>
      ),
    });
    setIsDropdownOpened(false);
  };

  return (
    <TokenSelectionContainer>
      <ItemButton
        className="active"
        type="button"
        onClick={() => setIsDropdownOpened((prev) => !prev)}
      >
        {selectedToken.Element}
      </ItemButton>

      <DropdownContainer isOpened={isDropdownOpened}>
        {dropdownItems.map(element)}
        <ItemButton type="button" onClick={() => handleTokenSelection('AXS')}>
          {AXSIcon}
          <h4>AXS</h4>
        </ItemButton>

        <ItemButton type="button" onClick={() => handleTokenSelection('BERRY')}>
          {BERRYIcon}
          <h4>BERRY</h4>
        </ItemButton>
      </DropdownContainer>
    </TokenSelectionContainer>
  );
}
