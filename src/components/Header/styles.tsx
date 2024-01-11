import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: var(--header-height);
  top: 0;
  left: 0;
  position: fixed;
  z-index: 100;
  width: 100%;
  background: var(--header-color);
  backdrop-filter: blur(8px);
  padding: 0 20px;
`;

export const Logo = styled.h3`
  text-shadow: 0 2px red;
  transition: all 0.25s;
  &:hover {
    text-shadow: 0 2px #46d916;
  }
`;

export const HeaderMenusContainer = styled.div`
  max-width: var(--body-mxwidth);
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const TogetherItems = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  color: black;
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
`;

export const HeaderMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  padding: 20px;
  white-space: nowrap;

  &:hover {
    background-color: #191919;
  }
  svg {
    width: 14px;
    height: 14px;
  }
  h4 {
    font-weight: 800;
    color: white;
  }
`;

export const SandwichButtonContainer = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.25rem;
  padding: 6px;
  border-radius: 2px;
  scale: 0.8;
  div {
    border-bottom: 2px solid black;
    border-radius: 5px;
    width: 100%;
  }
`;

export const DropdownMenuContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  text-transform: uppercase;
  color: black;
  background: black;
  h2 {
    color: white;
  }
`;

export const DropdownMenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  white-space: nowrap;
  transition: background 100ms;

  &:hover {
    background-color: #cecece;
    h2 {
      color: black;
      text-shadow: 0px 0px 1px black;
    }
  }
`;

export const HeaderMenuMobile = styled.div``;
