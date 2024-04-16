import React, { memo, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { toFloat } from 'validator';

import useGetBalance from '../../hooks/useGetBalance';
import BerryIconAndAmount, { BalanceText } from '../CurrencyIconAndAmount';
import DepositModal from '../Modals/DepositModal';

const BalanceContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const BalanceDisplayContainer = styled.div`
  background-color: var(--primary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const BalanceAndIcon = styled.div<{ $blurred: boolean }>`
  font-size: var(--default-fs);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 15px;
  user-select: none;
  transition: filter 0.5s;

  filter: ${({ $blurred }) => ($blurred ? 'none' : 'blur(3px)')};
`;

const BalanceUpdateContainer = styled.div<{ $animationType: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  animation: ${({ $animationType }) => ($animationType === 'add' ? addAnimation : subtractAnimation)} 0.5s forwards;

  span {
    color: ${({ $animationType }) => ($animationType === 'add' ? 'var(--default-green)' : 'var(--default-red)')};
  }
`;

const addAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(25px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
`;

const subtractAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  50% {
    opacity: 1;
    transform: translateY(25px);
  }
  100% {
    transform: translateY(25px);
    opacity: 0;
  }
`;

function Balance() {
  const { updatedBalance: newBalance } = useGetBalance();
  const isBalanceActive = typeof newBalance === 'number';

  const [oldBalance, setOldBalance] = useState<number | null>(null);
  const [balanceUpdateInfo, setBalanceUpdateInfo] = useState<
    { type: 'add' | 'subtract'; differenceAmount: string } | undefined
  >(undefined);

  useEffect(() => {
    if (newBalance) {
      const difference = oldBalance !== null ? newBalance - oldBalance : 0;
      const animationType = difference > 0 ? 'add' : 'subtract';

      setBalanceUpdateInfo({ type: animationType, differenceAmount: difference.toFixed(8) });
    }

    if (typeof newBalance === 'number') {
      setOldBalance(newBalance);
    }
  }, [newBalance]);

  // Gere uma chave única toda vez que balanceUpdateInfo for alterada
  const animationKey = balanceUpdateInfo ? `${balanceUpdateInfo.type}_${Date.now()}` : '';

  return (
    <BalanceContainer>
      <BalanceDisplayContainer>
        <BalanceAndIcon $blurred={isBalanceActive}>
          <BerryIconAndAmount currency="PIXEL" amount={isBalanceActive ? newBalance : 0} />
        </BalanceAndIcon>

        <DepositModal />
      </BalanceDisplayContainer>

      {balanceUpdateInfo && (
        <BalanceUpdateContainer key={animationKey} $animationType={balanceUpdateInfo.type}>
          <BalanceText>
            {balanceUpdateInfo.type === 'add'
              ? `+${balanceUpdateInfo.differenceAmount}`
              : balanceUpdateInfo.differenceAmount}
          </BalanceText>
        </BalanceUpdateContainer>
      )}
    </BalanceContainer>
  );
}

export default memo(Balance);
