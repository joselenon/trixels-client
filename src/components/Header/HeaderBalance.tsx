import React, { memo, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import useGetBalance from '../../hooks/useGetBalance';
import Balance from '../Balance';
import BlurredLoadDiv from '../BlurredLoadDiv';
import { BalanceText } from '../CurrencyIconAndAmount';
import DepositModal from '../Modals/DepositModal';

const BalanceContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const BalanceDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const BalanceAndIcon = styled.div`
  height: 100%;
  font-size: var(--default-fs);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
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

const BalanceUpdateContainer = styled.div<{ $animationType: string; $display: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ $display }) => ($display ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  animation: ${({ $animationType }) => ($animationType === 'add' ? addAnimation : subtractAnimation)} 0.5s forwards;

  span {
    color: ${({ $animationType }) => ($animationType === 'add' ? 'var(--default-green)' : 'var(--default-red)')};
  }
`;

function HeaderBalance() {
  const { updatedBalance: newBalance } = useGetBalance();
  const isBalanceActive = typeof newBalance === 'number';

  const [oldBalance, setOldBalance] = useState<number | null>(null);
  const [balanceUpdateInfo, setBalanceUpdateInfo] = useState<
    { type: 'add' | 'subtract'; differenceAmount: string } | undefined
  >(undefined);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (newBalance) {
      const difference = oldBalance !== null ? newBalance - oldBalance : 0;
      const animationType = difference > 0 ? 'add' : 'subtract';

      setBalanceUpdateInfo({ type: animationType, differenceAmount: difference.toFixed(8) });
      setShowAnimation(true);

      // Remover a animação após o tempo definido (0.5s + um pequeno buffer)
      setTimeout(() => {
        setShowAnimation(false);
      }, 600);
    }

    if (typeof newBalance === 'number') {
      setOldBalance(newBalance);
    }
  }, [newBalance]);

  return (
    <BalanceContainer>
      <BalanceDisplayContainer>
        <BlurredLoadDiv isLoading={!isBalanceActive}>
          <BalanceAndIcon>
            <Balance theme="default" currency="PIXEL" amount={isBalanceActive ? newBalance : 0} />
          </BalanceAndIcon>
        </BlurredLoadDiv>

        <DepositModal />
      </BalanceDisplayContainer>

      {balanceUpdateInfo && (
        <BalanceUpdateContainer $animationType={balanceUpdateInfo.type} $display={showAnimation}>
          <BalanceText $fontSize="medium" $theme="default">
            {balanceUpdateInfo.type === 'add'
              ? `+${balanceUpdateInfo.differenceAmount}`
              : balanceUpdateInfo.differenceAmount}
          </BalanceText>
        </BalanceUpdateContainer>
      )}
    </BalanceContainer>
  );
}

export default memo(HeaderBalance);
