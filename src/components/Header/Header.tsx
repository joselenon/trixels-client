import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import { SVGClock, SVGMagicWand } from '../../assets/SVGIcons';
import { useScreenConfig } from '../../contexts/ScreenConfigContext';
import { HeaderProps } from '../../interfaces/HeaderProps';
import HeaderDefault from './HeaderDefault';
import HeaderMobile from './HeaderMobile';
import * as styles from './styles';

const Header = () => {
  const { isMobile } = useScreenConfig();
  const websiteLogo = <styles.Logo>TRIXELS</styles.Logo>;

  const menuItems: HeaderProps['menuItems'] = {
    Market: { param: '/market', icon: <FaShoppingCart /> },
    Tricks: { param: '/tricks', icon: <SVGMagicWand /> },
    'My Timers': { param: '/mytimers', icon: <SVGClock /> },
    /*     LR: { param: '/lr', icon: <FaArrowsLeftRight /> }, */
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
