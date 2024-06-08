import React, { useEffect, useState } from 'react';

import useLogout from '../hooks/useLogout';
import Modal from './Modal';
import TrixelsButton from './TrixelsButton';

export default function LogoutButton() {
  const { handleCarefulLogout, showLogoutWarnInfo, handleLogout } = useLogout();

  const [showWarnModal, setShowWarnModal] = useState<boolean>(false);

  useEffect(() => {
    if (showLogoutWarnInfo.showWarn) setShowWarnModal(true);
  }, [showLogoutWarnInfo]);

  return (
    <>
      <TrixelsButton btnType="DANGER" attributes={{ onClick: handleCarefulLogout }} label={'LOGOUT'} />

      <Modal title="" showModal={showWarnModal} setShowModal={setShowWarnModal}>
        <>
          <h2>Warning</h2>
          <h3>You might lose the whole access to your account if you log out.</h3>
          <TrixelsButton btnType="DANGER" attributes={{ onClick: handleLogout }} label={'LOGOUT'} />
        </>
      </Modal>
    </>
  );
}
