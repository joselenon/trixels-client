import React from 'react';
import { styled } from 'styled-components';

import { IRaffleCreationPayload } from '../../../../interfaces/IRaffleCreation';
import TrixelsButton from '../../../TrixelsButton';

const PrivacyConfigContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

interface IPrivacyConfigProps {
  raffleConfig: IRaffleCreationPayload;
  setRaffleConfig: React.Dispatch<React.SetStateAction<IRaffleCreationPayload>>;
}

export default function PrivacyConfigElement({ raffleConfig, setRaffleConfig }: IPrivacyConfigProps) {
  const { privacy } = raffleConfig;

  const handleChangePrivacyType = (type: 'public' | 'private') => {
    setRaffleConfig((prevConfig) => ({
      ...prevConfig,
      discountPercentage: 0,
      privacy: {
        type,
        mode: 'public',
      },
    }));
  };

  return (
    <PrivacyConfigContainer>
      <TrixelsButton
        btnType={privacy.type === 'public' ? 'BLUE' : 'DEFAULT'}
        label="Public"
        attributes={{ onClick: () => handleChangePrivacyType('public') }}
      />
      <TrixelsButton
        btnType={privacy.type === 'private' ? 'BLUE' : 'DEFAULT'}
        label="Private"
        attributes={{ onClick: () => handleChangePrivacyType('private') }}
      />
    </PrivacyConfigContainer>
  );
}
