import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import { v4 } from 'uuid';

import useGetMessages from '../../../hooks/useGetMessages';
import useGetUserCredentials from '../../../hooks/useGetUserCredentials';
import useWalletVerification, { IWalletVerificationInRedis } from '../../../hooks/useWalletVerification';
import { setToken } from '../../../redux/features/authSlice';
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
  const reduxDispatch = useDispatch();
  const { userCredentials } = useGetUserCredentials();
  const { handleVerifyWallet } = useWalletVerification();
  const { walletVerificationMessages } = useGetMessages();

  const [request, setRequest] = useState(v4());
  const [walletVerificationInfo, setWalletVerificationInfo] = useState<IWalletVerificationInRedis | undefined>(
    undefined,
  );

  useEffect(() => {
    setWalletVerificationInfo(undefined);
  }, []);

  const toggleNextPage = async () => {
    const res = await handleVerifyWallet(request);

    if (res?.success && res.data) {
      setWalletVerificationInfo(res.data);
    }
  };

  useEffect(() => {
    if (walletVerificationMessages.length > 0) {
      console.log(request);
      console.log(walletVerificationMessages);
      const verificationMessage = walletVerificationMessages.find((wvm) => wvm.request === request);

      if (verificationMessage && verificationMessage.success && userCredentials) {
        console.log('entrastes');
        reduxDispatch(
          setToken({
            userCredentials: { ...userCredentials, roninWallet: { ...userCredentials.roninWallet, verified: true } },
          }),
        );
        toast.success(verificationMessage.message);
        setShowModal(false);
      }
    }
  }, [walletVerificationMessages]);

  return (
    <Modal title={'Verify Your Wallet'} showModal={showModal} setShowModal={setShowModal}>
      <>
        {!walletVerificationInfo && (
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

        {walletVerificationInfo && <NextStep walletVerificationInfo={walletVerificationInfo} />}
      </>
    </Modal>
  );
}
