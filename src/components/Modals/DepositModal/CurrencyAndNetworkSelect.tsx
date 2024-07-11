import React from 'react';
import { styled } from 'styled-components';

import CurrenciesInfo from '../../../assets/CurrenciesInfo';
import NetworksInfo from '../../../assets/NetworksInfo';
import DepositSelection, { IDepositSelectionProps } from './DepositSelection';

const CurrencyAndNetworkContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const SelectorsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface ICurrencyAndNetworkSelectProps {
  tokenSelected: string;
  networkSelected: string;
  handleChangeToken: IDepositSelectionProps['changeSelectedFn'];
  handleChangeNetwork: IDepositSelectionProps['changeSelectedFn'];
}

export default function CurrencyAndNetworkSelect({
  tokenSelected,
  networkSelected,
  handleChangeToken,
  handleChangeNetwork,
}: ICurrencyAndNetworkSelectProps) {
  return (
    <CurrencyAndNetworkContainer>
      <SelectorsContainer>
        <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, color: 'var(--default-grey)' }}>
          Currency
        </p>

        {/* Currency Selection */}
        <DepositSelection changeSelectedFn={handleChangeToken} selected={tokenSelected} optionsInfo={CurrenciesInfo} />
      </SelectorsContainer>

      <SelectorsContainer>
        <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, color: 'var(--default-grey)' }}>
          Network
        </p>

        {/* Network Selection */}
        <DepositSelection
          changeSelectedFn={handleChangeNetwork}
          selected={networkSelected}
          optionsInfo={NetworksInfo}
        />
      </SelectorsContainer>
    </CurrencyAndNetworkContainer>
  );
}
