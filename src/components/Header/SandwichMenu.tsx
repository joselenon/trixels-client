import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { SVGLittleBox, SVGRoundedSandwichMenu } from '../../assets/SVGIcons';
import { ROUTES } from '../../config/constants/CLIENT_ROUTES';
import { useAuthModalContext } from '../../contexts/AuthModalContext';
import { IReduxStore } from '../../interfaces/IRedux';
import { IHeader } from './Header';

const SandwichMenuContainer = styled.div`
  display: flex;
  width: 100%;
`;

const DropdownMenuContainer = styled.div`
  position: absolute;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background-color: white; /* Adicione uma cor de fundo */
  z-index: 100; /* Defina um z-index maior para garantir que o menu sobreponha outros elementos */
  display: flex;
  flex-direction: column;
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

const HeaderMenuItem = styled.div`
  background: white;
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

const CustomEnterButton = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--default-green);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  h4 {
    color: white;
  }
`;

const SandwichMenu = ({ menuItems }: IHeader) => {
  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );
  const { setShowModal } = useAuthModalContext();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const mobileMenuItems: IHeader['menuItems'] = {
    ...menuItems,
    'Profile ': {
      element: userCredentials ? (
        <Link to={`${ROUTES.PROFILE}/${userCredentials.username}`}>
          {SVGLittleBox()}
          <h4>{userCredentials.username}</h4>
        </Link>
      ) : undefined,
    },
    'Enter ': {
      element: !userCredentials ? (
        <CustomEnterButton onClick={() => setShowModal && setShowModal(true)}>
          <h4>Enter</h4>
        </CustomEnterButton>
      ) : undefined,
    },
  };

  const mobileMenuItemsElements = () => {
    return Object.entries(mobileMenuItems).map(([item, { element }], i) => {
      if (element) {
        return (
          <React.Fragment key={i}>
            <HeaderMenuItem onClick={() => setIsMenuOpened((prev) => !prev)}>{element}</HeaderMenuItem>
          </React.Fragment>
        );
      }
    });
  };
  return (
    <SandwichMenuContainer>
      <HeaderMenusContainer>
        <HeaderMenuItem onClick={() => setIsMenuOpened((prev) => !prev)}>{SVGRoundedSandwichMenu()}</HeaderMenuItem>
      </HeaderMenusContainer>

      {isMenuOpened && <DropdownMenuContainer>{mobileMenuItemsElements()}</DropdownMenuContainer>}
    </SandwichMenuContainer>
  );
};

export default SandwichMenu;
