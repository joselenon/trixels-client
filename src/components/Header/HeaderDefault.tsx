import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderProps } from '../../interfaces/HeaderProps';
import * as styles from './styles';

const HeaderDefault = ({ menuItems, websiteLogo }: HeaderProps) => {
  const menuItemsKeys = Object.keys(menuItems);

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
        <div></div>
      </styles.HeaderMenusContainer>
    </styles.HeaderContainer>
  );
};

export default HeaderDefault;
