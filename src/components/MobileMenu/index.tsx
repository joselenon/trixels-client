import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import { SVGLittleBox } from '../../assets/SVGIcons';
import { menuItems } from '../Header';

const MobileMenuContainer = styled.div`
  height: var(--header-height);
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 9;
  width: 100%;
  background: var(--header-color);
`;

const BarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;

const HeaderMenuItem = styled.div<{ $isActive: boolean | undefined }>`
  cursor: pointer;
  width: 0;
  flex: 1 1 0px;
  display: flex;
  background: white;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition: all 0.15s;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h5 {
    color: ${({ $isActive }) => ($isActive ? 'var(--default-oceanblue)' : 'var(--default-grey)')};
  }
  svg {
    fill: ${({ $isActive }) => ($isActive ? 'var(--default-oceanblue)' : 'var(--default-grey)')};
  }

  &:hover {
    h5 {
      color: var(--default-oceanblue);
    }
    svg {
      fill: var(--default-oceanblue);
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center; /* Centraliza o texto */
`;

export default function MobileMenu() {
  const location = useLocation();

  const menuItemsElements = () => {
    return Object.entries(menuItems).map(([item, path], i) => {
      return (
        <HeaderMenuItem key={i} $isActive={location.pathname === path}>
          <Link to={path}>
            <ItemContainer>
              {SVGLittleBox()}
              <h5>{item}</h5>
            </ItemContainer>
          </Link>
        </HeaderMenuItem>
      );
    });
  };

  return (
    <MobileMenuContainer>
      <BarContainer>{menuItemsElements()}</BarContainer>
    </MobileMenuContainer>
  );
}
