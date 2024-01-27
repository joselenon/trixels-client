import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useAuthModalContext } from '../../contexts/AuthModalContext';
import { HeaderProps } from '../../interfaces/HeaderProps';
import { IReduxStore } from '../../interfaces/IRedux';
import Button from '../Button';
import Balance from './Balance';
import * as styles from './styles';

const HeaderDefault = ({ menuItems, websiteLogo }: HeaderProps) => {
  const userCredentials = useSelector<
    IReduxStore,
    IReduxStore['auth']['userCredentials']
  >((state) => state.auth.userCredentials);

  const menuItemsKeys = Object.keys(menuItems);
  const { setShowModal } = useAuthModalContext();

  return (
    <styles.HeaderContainer>
      <styles.HeaderMenusContainer>
        <Link to={'/'}>
          <styles.LogoItem>{websiteLogo}</styles.LogoItem>
        </Link>

        <styles.TogetherItems>
          {menuItemsKeys.map((item: string, i) => (
            <Link to={menuItems[item].param} key={i}>
              <styles.HeaderMenuItem>
                {menuItems[item].icon}
                <h4>{item}</h4>
              </styles.HeaderMenuItem>
            </Link>
          ))}
        </styles.TogetherItems>

        {userCredentials && <Balance />}

        {userCredentials ? (
          <Link to={`/profile/${userCredentials?.username}`}>
            <h3>{userCredentials?.username}</h3>
          </Link>
        ) : (
          <div>
            <Button
              btnType="CTA"
              label={'ENTER'}
              attributes={{
                onClick: () => {
                  if (setShowModal) setShowModal(true);
                },
              }}
            />
          </div>
        )}
      </styles.HeaderMenusContainer>
    </styles.HeaderContainer>
  );
};

export default HeaderDefault;
