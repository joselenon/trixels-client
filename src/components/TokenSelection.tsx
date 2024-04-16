import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

import { AXSIcon, BERRYIcon } from './CurrenciesIcons';
import { ISelectedTokenStateProps } from './Modals/DepositModal/DepositInfo';

interface ITokenSelectionProps {
  selectedToken: ISelectedTokenStateProps;
  setSelectedToken: Dispatch<SetStateAction<ISelectedTokenStateProps>>;
}

interface IDropdownCotainerProps {
  $isOpened: boolean;
}

const TokenSelectionContainer = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownContainer = styled.div<IDropdownCotainerProps>`
  position: absolute;
  width: 200px;
  width: 100%;
  display: ${({ $isOpened }) => ($isOpened ? 'flex' : 'none')};
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
  selectedToken,
  setSelectedToken,
}: ITokenSelectionProps) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleTokenSelection = (token: ISelectedTokenStateProps['symbol']) => {
    setSelectedToken({
      symbol: token,
      Element: (
        <>
          {token === 'AXS' && AXSIcon}
          {token === 'BERRY' && BERRYIcon}
          <h4>{token}</h4>
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

      <DropdownContainer $isOpened={isDropdownOpened}>
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
