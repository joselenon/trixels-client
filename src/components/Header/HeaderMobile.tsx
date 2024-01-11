import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { HeaderProps } from '../../interfaces/HeaderProps';
import * as styles from './styles';

const HeaderMobile = ({ websiteLogo, menuItems }: HeaderProps) => {
  const menuItemsKeys = Object.keys(menuItems);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      <styles.HeaderContainer>
        <styles.HeaderMenusContainer>
          <Link to={'/'}>
            <styles.LogoItem>{websiteLogo}</styles.LogoItem>
          </Link>

          <styles.HeaderMenuItem onClick={() => setIsMenuOpened((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
              fill="white"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </styles.HeaderMenuItem>
        </styles.HeaderMenusContainer>
        {isMenuOpened && (
          <styles.DropdownMenuContainer>
            {menuItemsKeys.map((item: string, i) => (
              <Link to={menuItems[item].param} key={i}>
                <styles.DropdownMenuItem onClick={() => setIsMenuOpened(false)}>
                  {menuItems[item].icon}
                  <h4>{item}</h4>
                </styles.DropdownMenuItem>
              </Link>
            ))}
          </styles.DropdownMenuContainer>
        )}
      </styles.HeaderContainer>
    </>
  );
};

export default HeaderMobile;
