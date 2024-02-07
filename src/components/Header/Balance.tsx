import React, { memo } from 'react';
import styled from 'styled-components';

import useGetBalance from '../../hooks/useGetBalance';
import BerryIconAndAmount from '../BerryIconAndAmount';
import DepositModal from '../Modals/DepositModal';

export const BalanceContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const BalanceDisplayContainer = styled.div`
  background-color: var(--primary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const BalanceAndIcon = styled.div<{ $blurred: boolean }>`
  font-size: var(--default-fs);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 15px;
  user-select: none;
  transition: filter 0.5s;

  filter: ${({ $blurred }) => ($blurred ? 'none' : 'blur(3px)')};
`;

function Balance() {
  const updatedBalance = useGetBalance().updatedBalance;
  const isBalanceActive = typeof updatedBalance === 'number';

  return (
    <BalanceContainer>
      <BalanceDisplayContainer>
        <BalanceAndIcon $blurred={isBalanceActive}>
          <BerryIconAndAmount amount={updatedBalance ? updatedBalance : 0} />
        </BalanceAndIcon>

        <DepositModal />
      </BalanceDisplayContainer>
    </BalanceContainer>
  );
}

export default memo(Balance);
