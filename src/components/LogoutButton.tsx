import React, { useEffect, useState } from 'react';

import useLogout from '../hooks/useLogout';
import Button from './Button';
import Modal from './Modal';

export default function LogoutButton() {
  const { handleCarefulLogout, showLogoutWarnInfo } = useLogout();

  const [showWarnModal, setShowWarnModal] = useState<boolean>(false);

  useEffect(() => {
    if (showLogoutWarnInfo.showWarn) setShowWarnModal(true);
  }, [showLogoutWarnInfo]);

  return (
    <>
      <Button
        btnType="DANGER"
        attributes={{ onClick: handleCarefulLogout }}
        label={'LOGOUT'}
      />

      <Modal showModal={showWarnModal} setShowModal={setShowWarnModal}>
        <>
          <h2>Warning</h2>
          <h3>You might lose the whole access to your account if you log out.</h3>
        </>
      </Modal>
    </>
  );
}
