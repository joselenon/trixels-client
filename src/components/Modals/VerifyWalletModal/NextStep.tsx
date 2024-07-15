/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { IoCopySharp } from 'react-icons/io5';
import styled from 'styled-components';

import useGetDepositMethodWallet from '../../../hooks/useGetDepositMethodWallet';
import { IWalletVerificationInRedis } from '../../../hooks/useWalletVerification';
import BlurredLoadDiv from '../../BlurredLoadDiv';
import CurrencyIconAndAmount from '../../CurrencyIconAndAmount';
import MiniSquareButton from '../../TrixelsButton/MiniSquareButton';
import CurrencyAndNetworkSelect from '../DepositModal/CurrencyAndNetworkSelect';
import { DepositWalletContainer, WalletAndCopyButtonContainer } from '../DepositModal/DepositInfo';
import { VerifyWalletContainer } from './VerifyWalletModal';

const ValueAndDepositWalletContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function NextStep({ walletVerificationInfo }: { walletVerificationInfo: IWalletVerificationInRedis }) {
  const { depositMethodWalletInfo, handleGetDepositMethodWallet, isGettingWallet } = useGetDepositMethodWallet();
  const { randomValue } = walletVerificationInfo;

  useEffect(() => {
    onSubmitHandler();
  }, []);

  const onSubmitHandler = async () => {
    await handleGetDepositMethodWallet({ network: 'Ronin', symbol: 'PIXEL' });
  };

  return (
    <VerifyWalletContainer>
      <p style={{ fontWeight: '700', width: '100%' }}>{"Send the exact amount to TRIXELS's wallet: "}</p>

      <CurrencyAndNetworkSelect
        tokenSelected="PIXEL"
        networkSelected="Ronin"
        handleChangeToken={() => {}}
        handleChangeNetwork={() => {}}
      />

      <ValueAndDepositWalletContainer>
        <DepositWalletContainer>
          <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, color: 'var(--default-grey)' }}>
            Value
          </p>

          <WalletAndCopyButtonContainer>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '100%' }}>
                <CurrencyIconAndAmount
                  theme="white"
                  amount={parseFloat(randomValue.toString())}
                  showFullAmount={true}
                />
              </div>

              <div>
                <MiniSquareButton
                  btnType="WHITE"
                  element={<IoCopySharp />}
                  attributes={{
                    onClick: () => navigator.clipboard.writeText(randomValue.toString()),
                  }}
                />
              </div>
            </div>
            {/*             {walletVerificationInfo ? (
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '100%' }}>
                  <CurrencyIconAndAmount
                    theme="white"
                    amount={parseFloat(randomValue.toString())}
                    showFullAmount={true}
                  />
                </div>

                <div>
                  <MiniSquareButton
                    btnType="WHITE"
                    element={<IoCopySharp />}
                    attributes={{
                      onClick: () =>
                        navigator.clipboard.writeText(
                          walletVerificationInfo ? walletVerificationInfo.randomValue.toString() : '',
                        ),
                    }}
                  />
                </div>
              </div>
            ) : (
              <BlurredLoadDiv isLoading={true}>
                <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <CurrencyIconAndAmount theme="white" amount={0.0} showFullAmount={true} />
                  </div>

                  <MiniSquareButton
                    btnType="WHITE"
                    element={<IoCopySharp />}
                    attributes={{
                      onClick: () => navigator.clipboard.writeText(''),
                    }}
                  />
                </div>
              </BlurredLoadDiv>
            )} */}
          </WalletAndCopyButtonContainer>
        </DepositWalletContainer>

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
      </ValueAndDepositWalletContainer>

      <h4>Waiting...</h4>
    </VerifyWalletContainer>
  );
}
