import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import { TUserProfileInfo } from '../../hooks/useGetUserProfile';
import { IReduxStore } from '../../interfaces/IRedux';
import { ITextInput } from '../../interfaces/IRHF';
import Input from '../Input';
import VerifyWalletModal from '../Modals/VerifyWalletModal/VerifyWalletModal';
import TrixelsButton from '../TrixelsButton';

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  white-space: normal;
`;

interface IWalletCredentialsProps {
  walletInput: ITextInput;
  userProfileInfo: TUserProfileInfo;
}

export default function WalletCredentials({ walletInput, userProfileInfo }: IWalletCredentialsProps) {
  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const [showVerifyWalletModal, setVerifyWalletShowModal] = useState(false);

  return (
    <WalletContainer>
      <Input {...walletInput} />

      {!userProfileInfo?.roninWallet.verified && userCredentials?.username === userProfileInfo?.username && (
        <TrixelsButton
          btnType="BLUE"
          attributes={{ onClick: () => setVerifyWalletShowModal(true) }}
          label={'Verify your wallet'}
        />
      )}

      <VerifyWalletModal showModal={showVerifyWalletModal} setShowModal={setVerifyWalletShowModal} />
    </WalletContainer>
  );
}
