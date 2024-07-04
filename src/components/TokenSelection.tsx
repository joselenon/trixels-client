import React from 'react';

import CurrenciesInfo from '../assets/CurrenciesInfo';
import DropdownSelect from './DropdownSelect';

interface ITokenSelectionProps {
  selectedMethodSymbol: string;
  options: string[];
  handleChangeToken: (symbol: string) => void;
}

export default function TokenSelection({ options, handleChangeToken, selectedMethodSymbol }: ITokenSelectionProps) {
  return (
    <DropdownSelect
      selectedValue={selectedMethodSymbol}
      options={options}
      onSelect={handleChangeToken}
      renderOption={(option) => {
        const currencyInfo = CurrenciesInfo[option];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={currencyInfo.icon} alt={currencyInfo.symbol} width={20} height={20} />
            <h4>{currencyInfo.symbol}</h4>
          </div>
        );
      }}
      renderButton={(selectedValue) => {
        const selectedCurrencyInfo = CurrenciesInfo[selectedValue];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={selectedCurrencyInfo.icon} alt={selectedCurrencyInfo.symbol} width={20} height={20} />
            <h4>{selectedCurrencyInfo.symbol}</h4>
          </div>
        );
      }}
    />
  );
}
