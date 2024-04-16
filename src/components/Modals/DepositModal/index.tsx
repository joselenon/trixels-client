import { faPlus, faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';

import { IReduxStore } from '../../../interfaces/IRedux';
import { IUser, IUserToFrontEnd } from '../../../interfaces/IUser';
import { SectionTitle } from '../../../styles/GlobalStyles';
import Modal from '../../Modal';
import TrixelsButton from '../../TrixelsButton';
import { SectionItem, SectionSelectionContainer } from '../AuthModal/AuthModal';
import DepositInfo from './DepositInfo';

export const DepositModalContainer = styled.div`
  background: white;
  padding: 20px;
`;

export const RedeemButtonContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  button {
    width: 100%;
  }
  svg {
    pointer-events: none;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

type TSections = 'deposit' | 'withdraw' | 'tip';

export default function DepositModal() {
  const userCredentials = useSelector<IReduxStore, IUserToFrontEnd | undefined>((state) => state.auth.userCredentials);

  const [isWalletVerified, setIsWalletVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [section, setSection] = useState<TSections>('deposit');

  useEffect(() => {
    if (userCredentials && userCredentials.roninWallet.verified) {
      setIsWalletVerified(userCredentials.roninWallet.verified);
    }
  }, [userCredentials]);

  const toggleModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isWalletVerified) {
      return toast.error('You must verify you wallet first');
    }

    const targetElement = e.target as HTMLElement;
    if (targetElement.id === 'redeem' || targetElement.id === 'modal-background') {
      setShowModal((prevModalOpen) => !prevModalOpen);
    }
  };

  const handleToggleSection = (section: TSections) => {
    setSection(section);
  };

  return (
    <div>
      <div style={{ width: 37 }}>
        <TrixelsButton
          label={<FontAwesomeIcon icon={faPlus} />}
          btnType="CTA"
          /* ARRUMAR ESSE ERRINHO */
          attributes={{ id: 'redeem', onClick: toggleModal }}
        />
      </div>

      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <DepositModalContainer>
            <HeaderContainer>
              <FontAwesomeIcon icon={faTicket} />
              <SectionTitle>Wallet</SectionTitle>
            </HeaderContainer>

            <SectionSelectionContainer>
              <SectionItem
                onClick={() => handleToggleSection('deposit')}
                $isSelected={section === 'deposit'}
                $sectionColor="green"
              >
                <h5>Deposit</h5>
              </SectionItem>

              <SectionItem
                onClick={() => handleToggleSection('withdraw')}
                $isSelected={section === 'withdraw'}
                $sectionColor="red"
              >
                <h5>Withdraw</h5>
              </SectionItem>

              <SectionItem
                onClick={() => handleToggleSection('tip')}
                $isSelected={section === 'tip'}
                $sectionColor="grey"
              >
                <h5>Tip</h5>
              </SectionItem>
            </SectionSelectionContainer>

            {section === 'deposit' && <DepositInfo />}
          </DepositModalContainer>
        </Modal>
      )}
    </div>
  );
}
