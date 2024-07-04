import React, { useEffect, useState } from 'react';
import { IoCopySharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useGetDepositMethodWallet from '../../../hooks/useGetDepositMethodWallet';
import { IReduxStore } from '../../../interfaces/IRedux';
import { EmphasizedParagraph } from '../../../styles/GlobalStyles';
import BlurredLoadDiv from '../../BlurredLoadDiv';
import NetworkSelection from '../../NetworkSelection';
import TokenSelection from '../../TokenSelection';
import MiniSquareButton from '../../TrixelsButton/MiniSquareButton';

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
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const SelectorsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export default function DepositInfo() {
  const testdepositMethodsSymbols = ['PIXEL', 'RON'];
  const testdepositMethodsNetworks = ['Ronin', 'Ethereum'];

  const getDepositMethodWallet = useGetDepositMethodWallet();

  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );
  const isUserVerified = userCredentials?.email?.verified && userCredentials.roninWallet.verified;

  const [isGettingWallet, setIsGettingWallet] = useState(false);
  const [depositMethodWalletInfo, setDepositMethodWalletInfo] = useState<
    { value: string; minimumDeposit: number } | undefined
  >(undefined);
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
    const getWallet = async () => {
      setIsGettingWallet(true);
      const depositWalletRes = await getDepositMethodWallet(selectedMethod);

      if (depositWalletRes) {
        setIsGettingWallet(false);
        switch (depositWalletRes.success) {
          case true:
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setDepositMethodWalletInfo({
              value: depositWalletRes.data!.walletAddress!,
              minimumDeposit: depositWalletRes.data!.minimumDeposit!,
            });
            break;
          case false:
            setDepositMethodWalletInfo(undefined);
            break;
        }
      }
    };

    getWallet();
  }, [selectedMethod]);

  return (
    <DepositInfoContainer>
      {!isUserVerified ? (
        <>
          <CurrencyAndNetworkContainer>
            <SelectorsContainer>
              <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, color: 'var(--default-grey)' }}>
                Currency
              </p>
              <TokenSelection
                selectedMethodSymbol={selectedMethod['symbol']}
                options={testdepositMethodsSymbols}
                handleChangeToken={handleChangeToken}
              />
            </SelectorsContainer>

            <SelectorsContainer>
              <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, color: 'var(--default-grey)' }}>
                Network
              </p>
              <NetworkSelection
                selectedMethodNetwork={selectedMethod['network']}
                options={testdepositMethodsNetworks}
                handleChangeNetwork={handleChangeNetwork}
              />
            </SelectorsContainer>
          </CurrencyAndNetworkContainer>

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
