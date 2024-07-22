import React, { useState } from 'react';
import styled from 'styled-components';

import useRedeemCode from '../../../hooks/useRedeemCode';
import DefaultInput from '../../DefaultInput';
import TrixelsButton from '../../TrixelsButton';

const RedeemCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function RedeemCode() {
  const [codeValue, setCodeValue] = useState('');
  const { handleRedeemCode } = useRedeemCode();

  return (
    <RedeemCodeContainer>
      <DefaultInput onChangeFn={setCodeValue} label="Insert Code" />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TrixelsButton
          isPending={false}
          btnType="CTA"
          label="Redeem"
          attributes={{ onClick: () => handleRedeemCode({ codeValue }) }}
        />
      </div>
    </RedeemCodeContainer>
  );
}
