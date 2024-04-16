import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { SVGLittleBox } from '../../assets/SVGIcons';
import { useAuthModalContext } from '../../contexts/AuthModalContext';
import { useScreenConfig } from '../../contexts/ScreenConfigContext';
import { IReduxStore } from '../../interfaces/IRedux';
import TrixelsButton from '../TrixelsButton';
import TrixelsLogo from '../TrixelsLogo';
import Balance from './Balance';
import SandwichMenu from './SandwichMenu';

const HeaderContainer = styled.div`
  height: var(--header-height);
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
  width: 100%;
  background: var(--header-color);
  backdrop-filter: blur(8px);
  padding: 0 20px;
`;

const HeaderMenusContainer = styled.div`
  max-width: var(--header-mx-width);
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const LogoItem = styled.div`
  cursor: pointer;
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  padding: 10px;
  white-space: nowrap;
  transition: all 0.15s;

  &:hover {
    text-shadow: 0 2px #1160c7;
  }
`;

const MenuItemsContainer = styled.div<{ $screenWidth: number }>`
  height: 100%;
  display: ${({ $screenWidth }) => ($screenWidth > 1150 ? 'flex' : 'none')};
  justify-content: space-between;
  text-transform: uppercase;
  color: black;
  transition: all 0.25s ease-in-out;
`;

const AuthAndBalanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const HeaderMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  white-space: nowrap;
  transition: all 0.15s;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 20px;
  }
  h4 {
    color: var(--default-grey);
  }
  svg {
    fill: var(--default-grey);
  }

  &:hover {
    h4 {
      color: #6b8dbd;
    }
    svg {
      fill: #6b8dbd;
    }
  }
`;

export interface IHeader {
  menuItems: { [id: string]: { element: JSX.Element | undefined } };
}

const Header = () => {
  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );
  const { width } = useScreenConfig();
  const { setShowModal } = useAuthModalContext();

  const menuItems: IHeader['menuItems'] = {
    'Home ': {
      element: (
        <Link to={'/'}>
          {SVGLittleBox()}
          <h4>Home</h4>
        </Link>
      ),
    },
    'Raffles ': {
      element: (
        <Link to={'/raffles'}>
          {SVGLittleBox()}
          <h4>Raffles</h4>
        </Link>
      ),
    },
    'Affiliates ': {
      element: (
        <Link to={'/affiliates'}>
          {SVGLittleBox()}
          <h4>Affiliates</h4>
        </Link>
      ),
    },
    /*     Boxes: { param: '/boxes', icon: <>{SVGLittleBox()}</> }, */
    /*     Battles: { param: '/battles', icon: <>{SVGLittleBox()}</> }, */
  };

  const menuItemsElements = () => {
    return Object.entries(menuItems).map(([item, { element }], i) => (
      <React.Fragment key={i}>
        <HeaderMenuItem>{element}</HeaderMenuItem>
      </React.Fragment>
    ));
  };
  return (
    <HeaderContainer>
      <HeaderMenusContainer>
        <div style={{ display: 'flex', height: '100%' }}>
          <Link to={'/'}>
            <LogoItem>
              <TrixelsLogo />
            </LogoItem>
          </Link>

          <MenuItemsContainer $screenWidth={width}>{menuItemsElements()}</MenuItemsContainer>
        </div>

        {/* Separated Balance for mobile users */}
        {userCredentials && width <= 1150 && <Balance />}

        <AuthAndBalanceContainer>
          {userCredentials && width > 1150 && <Balance />}
          {userCredentials && width > 1150 && (
            <Link to={`/profile/${userCredentials?.username}`}>
              <h3>{userCredentials?.username}</h3>
            </Link>
          )}

          {!userCredentials && width > 1150 && (
            <TrixelsButton
              btnType="CTA"
              label={'Enter'}
              attributes={{
                onClick: () => setShowModal && setShowModal(true),
              }}
            />
          )}
          {width <= 1150 && <SandwichMenu menuItems={menuItems} />}
        </AuthAndBalanceContainer>
      </HeaderMenusContainer>
    </HeaderContainer>
  );
};

export default Header;
