import React from 'react';

import CurrenciesInfo, { ICurrenciesInfoObjProps } from '../assets/CurrenciesInfo';
import DropdownSelect from './DropdownSelect';

interface ITokenSelectionProps {
  selectedMethodSymbol: string;
  options: (keyof ICurrenciesInfoObjProps)[];
  handleChangeToken: (symbol: string) => void;
}

export default function TokenSelection({ options, handleChangeToken, selectedMethodSymbol }: ITokenSelectionProps) {
  return (
    <DropdownSelect
      selectedValue={selectedMethodSymbol}
      options={options as string[]}
      onSelect={handleChangeToken}
      renderOption={(option) => {
        const currencyInfo = CurrenciesInfo[option];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {currencyInfo.icon}
            <h4>{currencyInfo.label}</h4>
          </div>
        );
      }}
      renderButton={(selectedValue) => {
        const selectedCurrencyInfo = CurrenciesInfo[selectedValue as keyof ICurrenciesInfoObjProps];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {selectedCurrencyInfo.icon}
            <h4>{selectedCurrencyInfo.label}</h4>
          </div>
        );
      }}
    />
  );
}
