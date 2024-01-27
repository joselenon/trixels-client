import React from 'react';
import { TbSwords } from 'react-icons/tb';

import { SVGLittleBox } from '../../assets/SVGIcons';
import { useScreenConfig } from '../../contexts/ScreenConfigContext';
import { HeaderProps } from '../../interfaces/HeaderProps';
import HeaderDefault from './HeaderDefault';
import HeaderMobile from './HeaderMobile';
import * as styles from './styles';

const Header = () => {
  const { isMobile } = useScreenConfig();
  const websiteLogo = <styles.Logo>TRIXELS</styles.Logo>;

  const menuItems: HeaderProps['menuItems'] = {
    Unboxing: { param: '/boxes', icon: <>{SVGLittleBox()}</> },
    Battles: { param: '/battles', icon: <TbSwords /> },
  };

  const responsiveComponent = () => {
    switch (isMobile) {
      case true:
        return <HeaderMobile websiteLogo={websiteLogo} menuItems={menuItems} />;
      case false:
        return <HeaderDefault websiteLogo={websiteLogo} menuItems={menuItems} />;
    }
  };

  return <>{responsiveComponent()}</>;
};

export default Header;
