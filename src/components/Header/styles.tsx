import styled from 'styled-components';

export const HeaderContainer = styled.div`
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

export const LogoItem = styled.div`
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

export const HeaderMenusContainer = styled.div`
  max-width: var(--header-mx-width);
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  padding: 20px;
  white-space: nowrap;
  transition: all 0.15s;
  h4 {
    color: #8e8e99;
  }
  svg {
    fill: #8e8e99;
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

export const Logo = styled.h3`
  color: #2985ff;
  font-size: 2.25rem;
  text-shadow: 0 2px black;

  &:hover {
    text-shadow: 0 3px #124e9d;
  }
`;

export const HeaderMenuMobile = styled.div``;
