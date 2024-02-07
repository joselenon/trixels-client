import React, { useState } from 'react';
import { IoCopySharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IReduxStore } from '../../../interfaces/IRedux';
import MiniSquareButton from '../../Button/MiniSquareButton';
import { BERRYIcon } from '../../CurrenciesIcons';
import TokenSelection from '../../TokenSelection';

const DepositInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
`;

const DepositWalletContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WalletAndCopyButtonContainer = styled.div`
  display: flex;
`;

const CurrencyAndNetworkContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export interface ISelectedTokenStateProps {
  symbol: 'BERRY' | 'AXS';
  Element: JSX.Element;
}

export default function DepositInfo() {
  const userCredentials = useSelector<
    IReduxStore,
    IReduxStore['auth']['userCredentials']
  >((state) => state.auth.userCredentials);

  const [selectedToken, setSelectedToken] = useState<ISelectedTokenStateProps>({
    symbol: 'BERRY',
    Element: (
      <>
        {BERRYIcon}
        <h4>BERRY</h4>
      </>
    ),
  });
  const [inputValue, setInputValue] = useState<string>('TRIXELS.RON');

  const isUserVerified =
    userCredentials?.email?.verified && userCredentials.roninWallet.verified;

  return (
    <DepositInfoContainer>
      {!isUserVerified ? (
        <>
          <CurrencyAndNetworkContainer>
            <div>
              <h4>Currency</h4>

              <TokenSelection
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
              />
            </div>

            <div>
              <h4>Network</h4>

              <TokenSelection
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
              />
            </div>
          </CurrencyAndNetworkContainer>

          <DepositWalletContainer>
            <h4>Deposit Wallet</h4>

            <WalletAndCopyButtonContainer>
              <input
                type="text"
                value={'TRIXELS.RON'}
                disabled
                onChange={(e) => setInputValue(e.target.value)}
              />

              <MiniSquareButton
                btnType="DEFAULT"
                element={<IoCopySharp />}
                attributes={{
                  onClick: () => navigator.clipboard.writeText(inputValue),
                }}
              />
            </WalletAndCopyButtonContainer>
          </DepositWalletContainer>

          <h5>Only send $BERRY to this address.</h5>
          <h5>Min. Deposit: 1 $BERRY. It only takes 20 confirmations.</h5>
        </>
      ) : (
        <>
          <h4 style={{ whiteSpace: 'normal' }}>
            Please verify your Ronin Wallet before make a deposit
          </h4>
        </>
      )}
    </DepositInfoContainer>
  );
}
