import React, { useEffect, useState } from 'react';
import { IoCopySharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useGetDepositMethodWallet from '../../../hooks/useGetDepositMethodWallet';
import { IReduxStore } from '../../../interfaces/IRedux';
import { EmphasizedParagraph } from '../../../styles/GlobalStyles';
import BlurredLoadDiv from '../../BlurredLoadDiv';
import MiniSquareButton from '../../TrixelsButton/MiniSquareButton';
import CurrencyAndNetworkSelect from './CurrencyAndNetworkSelect';

const DepositInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  input {
    font-family: var(--kemco-font);
    font-weight: 700;
  }
`;

export const DepositWalletContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const WalletAndCopyButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default function DepositInfo() {
  const { depositMethodWalletInfo, handleGetDepositMethodWallet, isGettingWallet } = useGetDepositMethodWallet();

  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );
  const isUserVerified = userCredentials?.email?.verified && userCredentials.roninWallet.verified;

  const [selectedMethod, setSelectedMethod] = useState({ symbol: 'PIXEL', network: 'Ronin' });

  const handleChangeToken = (symbol: string) => {
    setSelectedMethod((prev) => {
      return { ...prev, symbol };
    });
  };

  const handleChangeNetwork = (network: string) => {
    setSelectedMethod((prev) => {
      return { ...prev, network };
    });
  };

  useEffect(() => {
    handleGetDepositMethodWallet(selectedMethod);
  }, [selectedMethod]);

  return (
    <DepositInfoContainer>
      {!isUserVerified ? (
        <>
          <CurrencyAndNetworkSelect
            tokenSelected={selectedMethod['symbol']}
            networkSelected={selectedMethod['network']}
            handleChangeToken={handleChangeToken}
            handleChangeNetwork={handleChangeNetwork}
          />

          <DepositWalletContainer>
            <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, color: 'var(--default-grey)' }}>
              Deposit Wallet
            </p>

            <BlurredLoadDiv isLoading={isGettingWallet}>
              <WalletAndCopyButtonContainer>
                <input type="text" value={depositMethodWalletInfo ? depositMethodWalletInfo.value : ''} disabled />

                <MiniSquareButton
                  btnType="WHITE"
                  element={<IoCopySharp />}
                  attributes={{
                    onClick: () =>
                      navigator.clipboard.writeText(depositMethodWalletInfo ? depositMethodWalletInfo.value : ''),
                  }}
                />
              </WalletAndCopyButtonContainer>
            </BlurredLoadDiv>
          </DepositWalletContainer>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <EmphasizedParagraph>
              Minimum {depositMethodWalletInfo && depositMethodWalletInfo.minimumDeposit}$ after fees, depositing less
              may result in loss.
            </EmphasizedParagraph>

            <p
              style={{
                textAlign: 'center',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 12,
                color: 'var(--default-grey)',
              }}
            >
              It only takes X confirmations.
            </p>
          </div>
        </>
      ) : (
        <>
          <h4 style={{ whiteSpace: 'normal' }}>Please verify your Ronin Wallet before make a deposit</h4>
        </>
      )}
    </DepositInfoContainer>
  );
}
