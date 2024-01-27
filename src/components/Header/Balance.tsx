import React, { memo } from 'react';
import styled from 'styled-components';

import curr_berry from '../../assets/cur_berry.png';
import useGetBalance from '../../hooks/useGetBalance';
import RedeemCode from '../Modals/RedeemCode';
import * as styles from './styles';

export const BalanceContainer = styled.div`
  display: flex;
`;

export const BalanceDisplayContainer = styled.div`
  background-color: #3d3d3d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: var(--default-br);
`;

export const BalanceAndIcon = styled.div`
  font-size: var(--default-fs);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 15px;
`;

function Balance() {
  const updatedBalance = useGetBalance();

  const balanceAndIconStyle: React.CSSProperties = {
    filter: updatedBalance || updatedBalance === 0 ? 'none' : 'blur(3px)',
    userSelect: 'none',
    transition: 'all 0.25s',
  };

  return (
    <BalanceContainer>
      <BalanceDisplayContainer>
        <BalanceAndIcon style={balanceAndIconStyle}>
          <img src={curr_berry} width={18} height={18} alt="berry img" />
          <span>{updatedBalance ? updatedBalance : 0}</span>
        </BalanceAndIcon>
        <RedeemCode />
      </BalanceDisplayContainer>
    </BalanceContainer>
  );
}

export default memo(Balance);
