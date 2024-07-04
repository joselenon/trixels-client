import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TrixelsLogo from '../TrixelsLogo';
import { useScreenConfig } from '../../contexts/ScreenConfigContext';

const FooterContainer = styled.footer<{ $isMobile: boolean }>`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #dee2e6;
  margin-top: 100px;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? `var(--header-height)` : 0)};
  padding: 40px;
`;

const FooterContent = styled.nav`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4rem;
`;

const FooterMenus = styled.div`
  max-width: 420px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FooterMenu = styled.nav`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a:hover {
    h4 {
      color: var(--default-blue) !important;
    }
  }
`;

const Footer = () => {
  const { isMobile } = useScreenConfig();
  const location = useLocation();

  const platformItems = {
    Fairness: '/fairness',
    Affiliates: '/affiliates',
    Promotions: '/promotions',
  };

  const supportItems = {
    'Privacy Policy': '/privacy-policy',
    'Terms of Service': '/terms-of-service',
    Support: '/support',
  };

  return (
    <FooterContainer $isMobile={isMobile}>
      <FooterContent>
        <div>
          <TrixelsLogo resizeble={false} />
        </div>

        <FooterMenus>
          <FooterMenu>
            {Object.entries(platformItems).map(([item, path], i) => (
              <Link key={i} to={path}>
                <h4 style={{ color: location.pathname === path ? 'var(--default-blue)' : 'black' }}>{item}</h4>
              </Link>
            ))}
          </FooterMenu>

          <FooterMenu>
            {Object.entries(supportItems).map(([item, path], i) => (
              <Link key={i} to={path}>
                <h4 style={{ color: location.pathname === path ? 'var(--default-blue)' : 'black' }}>{item}</h4>
              </Link>
            ))}
          </FooterMenu>
        </FooterMenus>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
