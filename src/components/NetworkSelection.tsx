import React from 'react';

import NetworksInfo from '../assets/NetworksInfo';
import DropdownSelect from './DropdownSelect';

interface INetworkSelectionProps {
  selectedMethodNetwork: string;
  options: string[];
  handleChangeNetwork: (network: string) => void;
}

export default function NetworkSelection({
  options,
  handleChangeNetwork,
  selectedMethodNetwork,
}: INetworkSelectionProps) {
  return (
    <DropdownSelect
      selectedValue={selectedMethodNetwork}
      options={options}
      onSelect={handleChangeNetwork}
      renderOption={(option) => {
        const networkInfo = NetworksInfo[option];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={networkInfo.icon} alt={networkInfo.network} width={20} height={20} />
            <h4>{networkInfo.network}</h4>
          </div>
        );
      }}
      renderButton={(selectedValue) => {
        const selectedNetworkInfo = NetworksInfo[selectedValue];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={selectedNetworkInfo.icon} alt={selectedNetworkInfo.network} width={20} height={20} />
            <h4>{selectedNetworkInfo.network}</h4>
          </div>
        );
      }}
    />
  );
}
