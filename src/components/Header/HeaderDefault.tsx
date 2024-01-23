import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthModalContext } from '../../contexts/AuthModalContext';
import { useUserContext } from '../../contexts/UserContext';
import { HeaderProps } from '../../interfaces/HeaderProps';
import Button from '../Button';
import * as styles from './styles';

const HeaderDefault = ({ menuItems, websiteLogo }: HeaderProps) => {
  const { credentials } = useUserContext();
  const menuItemsKeys = Object.keys(menuItems);
  const { setShowModal } = useAuthModalContext();

  useEffect(() => {
    console.log(credentials?.username);
  }, [credentials]);

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

        {credentials ? (
          <Link to={`/profile/${credentials.username}`}>
            <h3>{credentials.username}</h3>
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
