import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { useAuthModalContext } from '../../contexts/AuthModalContext';
import { IReduxStore } from '../../interfaces/IRedux';
import Button from '../Button';
import Balance from './Balance';
import { IHeader } from './Header';
import * as styles from './styles';

const MenuItemsContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  color: black;
`;

const AuthAndBalanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const HeaderDefault = ({ menuItems, websiteLogo }: IHeader) => {
  const userCredentials = useSelector<
    IReduxStore,
    IReduxStore['auth']['userCredentials']
  >((state) => state.auth.userCredentials);

  const { setShowModal } = useAuthModalContext();

  const menuItemsElements = () => {
    return Object.entries(menuItems).map(([item, { param, icon }], i) => (
      <Link to={param} key={i}>
        <styles.HeaderMenuItem>
          {icon}
          <h4>{item}</h4>
        </styles.HeaderMenuItem>
      </Link>
    ));
  };

  return (
    <styles.HeaderContainer>
      <styles.HeaderMenusContainer>
        <div style={{ display: 'flex', height: '100%' }}>
          <Link to={'/'}>
            <styles.LogoItem>{websiteLogo}</styles.LogoItem>
          </Link>

          <MenuItemsContainer>{menuItemsElements()}</MenuItemsContainer>
        </div>

        <AuthAndBalanceContainer>
          {userCredentials && <Balance />}

          {userCredentials ? (
            <Link to={`/profile/${userCredentials?.username}`}>
              <h3>{userCredentials?.username}</h3>
            </Link>
          ) : (
            <Button
              btnType="CTA"
              label={'Enter'}
              attributes={{
                onClick: () => setShowModal && setShowModal(true),
              }}
            />
          )}
        </AuthAndBalanceContainer>
      </styles.HeaderMenusContainer>
    </styles.HeaderContainer>
  );
};

export default HeaderDefault;
