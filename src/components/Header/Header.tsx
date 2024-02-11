import React from 'react';

import { SVGLittleBox } from '../../assets/SVGIcons';
import { useScreenConfig } from '../../contexts/ScreenConfigContext';
import TrixelsLogo from '../TrixelsLogo';
import HeaderDefault from './HeaderDefault';
import HeaderMobile from './HeaderMobile';

export interface IHeader {
  websiteLogo: any;
  menuItems: { [id: string]: { param: string; icon: any } };
}

const Header = () => {
  const { isMobile } = useScreenConfig();
  const websiteLogo = <TrixelsLogo />;

  const menuItems: IHeader['menuItems'] = {
    Home: { param: '/', icon: <>{SVGLittleBox()}</> },
    Raffles: { param: '/raffles', icon: <>{SVGLittleBox()}</> },
    Boxes: { param: '/boxes', icon: <>{SVGLittleBox()}</> },
    Battles: { param: '/battles', icon: <>{SVGLittleBox()}</> },
    Timers: { param: '/timers', icon: <>{SVGLittleBox()}</> },
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
