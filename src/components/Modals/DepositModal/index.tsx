import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';

import { IReduxStore } from '../../../interfaces/IRedux';
import { IUserToFrontEnd } from '../../../interfaces/IUser';
import Modal from '../../Modal';
import SectionSelector, { ISection } from '../../SectionSelector';
import TrixelsButton from '../../TrixelsButton';
import DepositInfo from './DepositInfo';

export const DepositModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function DepositModal() {
  const userCredentials = useSelector<IReduxStore, IUserToFrontEnd | undefined>((state) => state.auth.userCredentials);

  const [isWalletVerified, setIsWalletVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userCredentials && userCredentials.roninWallet.verified) {
      setIsWalletVerified(userCredentials.roninWallet.verified);
    }
  }, [userCredentials]);

  const toggleModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!isWalletVerified) {
      toast.error('You must verify you wallet first');
      return;
    }

    const targetElement = e.currentTarget as HTMLElement;
    if (targetElement.id === 'redeem' || targetElement.id === 'modal-background') {
      setShowModal((prevModalOpen) => !prevModalOpen);
    }
  };

  const sections: ISection[] = [
    { id: 'deposit', label: 'Deposit', content: <DepositInfo />, color: 'var(--default-darkgreen)' },
    {
      id: 'withdraw',
      label: 'Withdraw',
      content: <div style={{ width: '100%' }}>Withdraw Content</div>,
      color: 'var(--default-darkblue)',
    },
    { id: 'tip', label: 'Tip', content: <div>SOON</div>, color: 'var(--default-awdaw)' },
  ];

  return (
    <div>
      <div style={{ width: 37 }}>
        <TrixelsButton
          element={<FontAwesomeIcon icon={faPlus} />}
          btnType="CTA"
          attributes={{ id: 'redeem', onClick: toggleModal }}
        />
      </div>

      {showModal && (
        <Modal contentBackground="#151515" title="Wallet" showModal={showModal} setShowModal={setShowModal}>
          <DepositModalContainer>
            <SectionSelector sections={sections} />
          </DepositModalContainer>
        </Modal>
      )}
    </div>
  );
}
