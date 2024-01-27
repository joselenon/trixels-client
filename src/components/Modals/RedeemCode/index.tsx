import { faPlus, faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { SectionTitle } from '../../../styles/GlobalStyles';
import Button from '../../Button';
import RedeemCodeForm from './RedeemCodeForm';
import * as styles from './styles';

export default function RedeemCode() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = (e: any) => {
    if (e.target.id === 'redeem' || e.target.id === 'modal-background') {
      setModalOpen(!modalOpen);
    }
  };

  return (
    <div>
      <div style={{ width: 37 }}>
        <Button
          label={<FontAwesomeIcon icon={faPlus} />}
          btnType="CTA"
          attributes={{ id: 'redeem', onClick: toggleModal }}
        />
      </div>
      {modalOpen && (
        <styles.ModalContainer id="modal-background" onClick={(e) => toggleModal(e)}>
          <styles.ModalContent>
            <styles.HeaderContainer>
              <FontAwesomeIcon icon={faTicket} />
              <SectionTitle>Resgatar Código</SectionTitle>
            </styles.HeaderContainer>
            <RedeemCodeForm />
          </styles.ModalContent>
        </styles.ModalContainer>
      )}
    </div>
  );
}
