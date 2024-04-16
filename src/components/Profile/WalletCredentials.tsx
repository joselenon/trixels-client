import React, { useState } from 'react';
import { styled } from 'styled-components';

import useGetUserProfile from '../../hooks/useGetUserInfo';
import { ITextInput } from '../../interfaces/IRHF';
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
`;

export default function WalletCredentials({ walletInput }: { walletInput: ITextInput }) {
  const userProfileInfo = useGetUserProfile();
  const [showVerifyWalletModal, setVerifyWalletShowModal] = useState(false);

  return (
    <WalletContainer>
      <Input {...walletInput} />

      {!userProfileInfo?.roninWallet.verified && (
        <TrixelsButton
          btnType="BLUE"
          attributes={{ onClick: () => setVerifyWalletShowModal(true) }}
          label={'Verify your wallet'}
        />
      )}

      <Modal showModal={showVerifyWalletModal} setShowModal={setVerifyWalletShowModal}>
        <VerifyWalletContainer>
          <h3>Verify your wallet</h3>

          <p style={{ fontWeight: '700' }}>
            The verification process is as simple as this: When you click the "start" button, a random minimum amount of
            CURRENCY will be generated for you to send to TRIXELS's wallet.
          </p>
          <p style={{ color: 'red', fontWeight: '700' }}>
            Your wallet will be verified and the tokens will return to you once the transaction reaches 20 confirmations
          </p>

          <TrixelsButton btnType="CTA" label={'Start'} />
        </VerifyWalletContainer>
      </Modal>
    </WalletContainer>
  );
}
