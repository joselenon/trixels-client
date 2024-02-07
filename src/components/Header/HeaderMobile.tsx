import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { SVGLittleBox, SVGRoundedSandwichMenu } from '../../assets/SVGIcons';
import { IReduxStore } from '../../interfaces/IRedux';
import Balance from './Balance';
import { IHeader } from './Header';
import * as styles from './styles';

const DropdownMenuContainer = styled.div`
  background: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  text-transform: uppercase;

  h2 {
    color: white;
  }
`;

const HeaderMobile = ({ websiteLogo, menuItems }: IHeader) => {
  const userCredentials = useSelector<
    IReduxStore,
    IReduxStore['auth']['userCredentials']
  >((state) => state.auth.userCredentials);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const mobileMenuItems: IHeader['menuItems'] = {
    ...menuItems,
    Profile: {
      param: `/profile/${userCredentials?.username}`,
      icon: <>{SVGLittleBox()}</>,
    },
  };

  const mobileMenuItemsElements = () => {
    return Object.entries(mobileMenuItems).map(([item, { param, icon }], i) => (
      <Link to={param} key={i}>
        <styles.HeaderMenuItem onClick={() => setIsMenuOpened(false)}>
          {icon}
          <h4>{item}</h4>
        </styles.HeaderMenuItem>
      </Link>
    ));
  };

  return (
    <>
      <styles.HeaderContainer>
        <styles.HeaderMenusContainer>
          <Link to={'/'}>
            <styles.LogoItem>{websiteLogo}</styles.LogoItem>
          </Link>

          {userCredentials && <Balance />}

          <styles.HeaderMenuItem onClick={() => setIsMenuOpened((prev) => !prev)}>
            {SVGRoundedSandwichMenu()}
          </styles.HeaderMenuItem>
        </styles.HeaderMenusContainer>

        {isMenuOpened && (
          <DropdownMenuContainer>{mobileMenuItemsElements()}</DropdownMenuContainer>
        )}
      </styles.HeaderContainer>
    </>
  );
};

export default HeaderMobile;
