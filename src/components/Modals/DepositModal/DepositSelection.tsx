import React from 'react';

import DropdownSelect from '../../DropdownSelect';

export interface IDepositSelectionProps {
  selected: string;
  optionsInfo: { [option: string]: { label: string; icon: JSX.Element } };
  changeSelectedFn: (value: string) => void;
}

export default function DepositSelection({ optionsInfo, selected, changeSelectedFn }: IDepositSelectionProps) {
  const options = Object.keys(optionsInfo);

  return (
    <DropdownSelect
      selectedValue={selected}
      options={options}
      onSelect={changeSelectedFn}
      renderOption={(option) => {
        const optionInfo = optionsInfo[option];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {optionInfo.icon}
            <h4>{optionInfo.label}</h4>
          </div>
        );
      }}
      renderButton={(selectedValue) => {
        const optionInfo = optionsInfo[selectedValue];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {optionInfo.icon}
            <h4>{optionInfo.label}</h4>
          </div>
        );
      }}
    />
  );
}
