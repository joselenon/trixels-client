import React, { createContext, useContext, useEffect, useState } from 'react';

interface ScreenConfigContextProps {
  isMobile: boolean;
  width: number;
}

const ScreenConfigContext = createContext<ScreenConfigContextProps>({
  isMobile: false,
  width: window.innerWidth,
});

export function ScreenConfigProvider({ children }: { children: JSX.Element }) {
  const [widthConfig, setWidthConfig] = useState<{
    isMobile: boolean;
    width: number;
  }>({
    isMobile: window.innerWidth <= 768,
    width: window.innerWidth,
  });

  const handleResize = (width: number) => {
    setWidthConfig({
      isMobile: window.innerWidth <= 768,
      width: width,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', () => handleResize(window.innerWidth));

    return () => {
      window.removeEventListener('resize', () => handleResize(window.innerWidth));
    };
  }, []);

  return (
    <ScreenConfigContext.Provider value={widthConfig}>
      {children}
    </ScreenConfigContext.Provider>
  );
}

export function useScreenConfig() {
  return useContext(ScreenConfigContext);
}
