import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import useGetUserProfile from '../../hooks/useGetUserProfile';
import useWalletVerification from '../../hooks/useWalletVerification';
import { IReduxStore } from '../../interfaces/IRedux';
import { ITextInput } from '../../interfaces/IRHF';
import { WarnParagraph } from '../../styles/GlobalStyles';
import CurrencyIconAndAmount from '../CurrencyIconAndAmount';
import Input from '../Input';
import Modal from '../Modal';
import TrixelsButton from '../TrixelsButton';

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  white-space: normal;
`;

const VerifyWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  input {
    font-weight: 800;
  }
`;

export default function WalletCredentials({ walletInput }: { walletInput: ITextInput }) {
  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const userProfileInfo = useGetUserProfile();
  const { handleVerifyWallet } = useWalletVerification();

  const [showVerifyWalletModal, setVerifyWalletShowModal] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [randomValue, setRandomValue] = useState<{ value: undefined | number }>({ value: undefined });

  const onSubmitHandler = async () => {
    const res = await handleVerifyWallet();

    if (res) {
      setNextStep(true);
      setRandomValue({ value: res.data.randomValue });
    }
  };

  const handleVerifyYourWallet = () => {
    setNextStep(false);
    setVerifyWalletShowModal(true);
  };

  return (
    <WalletContainer>
      <Input {...walletInput} />

      {!userProfileInfo?.roninWallet.verified && userCredentials?.username === userProfileInfo?.username && (
        <TrixelsButton btnType="BLUE" attributes={{ onClick: handleVerifyYourWallet }} label={'Verify your wallet'} />
      )}

      <Modal
        width={600}
        title={'Verify Your Wallet'}
        showModal={showVerifyWalletModal}
        setShowModal={setVerifyWalletShowModal}
      >
        <>
          {!nextStep && (
            <VerifyWalletContainer>
              <p style={{ fontWeight: '700' }}>
                {`The verification process is as simple as this: When you click the 'start' button, a random minimum amount of
            CURRENCY will be generated for you to send to TRIXELS's wallet.`}
              </p>
              <WarnParagraph>
                Your wallet will be verified and the tokens will return to you once the transaction reaches 20
                confirmations
              </WarnParagraph>

              <TrixelsButton btnType="CTA" label={'Verify'} attributes={{ onClick: onSubmitHandler }} />
            </VerifyWalletContainer>
          )}

          {nextStep && randomValue.value && (
            <VerifyWalletContainer>
              <p style={{ fontWeight: '700' }}>Send the exact amount to the address: </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <CurrencyIconAndAmount theme="default" amount={parseFloat(randomValue.value.toString())} />
                <input type="text" value={'TRIXELS.XYZ'} disabled />
              </div>

              <h5>gif aqui</h5>
            </VerifyWalletContainer>
          )}
        </>
      </Modal>
    </WalletContainer>
  );
}
