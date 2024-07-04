import React, { useState } from 'react';
import Transactions from './Transactions';
import styled from 'styled-components';
import TrixelsButton from '../TrixelsButton';
import useRequireLogin from '../../hooks/useRequireLogin';

const UserMenusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function UserMenus() {
  const requireLoginFn = useRequireLogin();
  const [activatedMenu, setActivatedMenu] = useState<string | undefined>(undefined);

  const userMenus: { [key: string]: JSX.Element } = { TRANSACTIONS: <Transactions />, BETS: <Transactions /> };
  const userMenusKeys = Object.keys(userMenus);

  return (
    <UserMenusContainer>
      <ButtonsContainer>
        {userMenusKeys.map((key, i) => (
          <TrixelsButton
            key={i}
            btnType={activatedMenu === key ? 'BLUE' : 'DEFAULT'}
            label={key}
            attributes={{
              onClick: () => {
                if (requireLoginFn()) setActivatedMenu(key);
              },
            }}
          />
        ))}
      </ButtonsContainer>

      {activatedMenu === 'TRANSACTIONS' && <Transactions />}
    </UserMenusContainer>
  );
}
