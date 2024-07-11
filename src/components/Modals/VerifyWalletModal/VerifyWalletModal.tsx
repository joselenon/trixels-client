import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';

import useGetUserCredentials from '../../../hooks/useGetUserCredentials';
import { WarnParagraph } from '../../../styles/GlobalStyles';
import Modal from '../../Modal';
import TrixelsButton from '../../TrixelsButton';
import NextStep from './NextStep';

export const VerifyWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 10px;

  input {
    font-weight: 800;
  }
`;

interface IVerifyWalletModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VerifyWalletModal({ showModal, setShowModal }: IVerifyWalletModalProps) {
  const { userCredentials } = useGetUserCredentials();
  const [nextStep, setNextStep] = useState(false);

  const toggleNextPage = () => {
    if (userCredentials) {
      if (!userCredentials.roninWallet.value) {
        toast.error('You should add a wallet first');
        return;
      }

      setNextStep(true);
    }
  };

  return (
    <Modal title={'Verify Your Wallet'} showModal={showModal} setShowModal={setShowModal}>
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

            <TrixelsButton btnType="CTA" label={'Verify'} attributes={{ onClick: toggleNextPage }} />
          </VerifyWalletContainer>
        )}

        {nextStep && <NextStep />}
      </>
    </Modal>
  );
}
