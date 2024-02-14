import styled, { createGlobalStyle } from 'styled-components';

import kemcoFont from '../assets/fonts/pixelated-1-kemco/kemco-pixel-bold.ttf';
import dePixelFont from '../assets/fonts/pixelated-2-depixel/DePixelBreit.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'DePixelBreit';
    src: url(${dePixelFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'KemcoPixelBold';
    src: url(${kemcoFont}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  :root {
    --kemco-font: 'KemcoPixelBold', sans-serif;
    --depixel-font: 'DePixelBreit', sans-serif;

    --default-blue: #2985ff;
    --default-red: #cb2626;
    --default-green: #3cb934;

    --header-height: 80px;
    --header-color: white;
    --header-mx-width: 1600px;

    --primary-bg-color: #f0f0f2;
    --secondary-bg-color: #ffffff;

    --primary-filling-color: black;

    --primary-color: #353535;
    --soft-primary-color: #2d2d2d;
    --secondary-color: #cecece;
    --green-color: #00963b;
    --blue-color: #3a7ada;
    --secondary-text-color: #d9d9d9;
    --body-mxwidth: 1400px;

    --default-br: 10px; // Border-radius
    --default-pdn: 25px; // Padding
    --default-bshadow: 0px 2px 3px rgb(0, 0, 0, 0.6); // Box-shadow
    --default-btn-mt: 8px;
    --main-gradient: linear-gradient(153deg, #1a1a1a 18%, rgba(74,74,74,1) 100%);
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--primary-filling-color);
    font-family: var(--depixel-font);
  }

  body {
    background: var(--primary-bg-color);

    .positive {
      color: #4dab4d;
    }
    .null {
      color: #838383;
    }
    .negative {
      color: #c03030;
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-clear-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    font-size: 1.25rem;
  }

  input, select {
    width: 100%;
    border: none;
    outline: none;
    font-weight: 600;
    background: var(--primary-bg-color);
  }

  input {
    padding: 10px;
    width: 100%;

    h4 {
      color: black;
    }

    &:hover {
      cursor: text;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  iframe {
    border: none;
  }

  button, select {
    &:hover {
      filter: brightness(0.9);
      cursor: pointer;
    }
    &:active {
      filter: brightness(0.85);
    }
  }

  svg {
    fill: var(--primary-filling-color);
  }

  ul {
    list-style: none;
  }

  button {
    border: none;
    background: none;
    width: 100%;
  }

  a {
    text-decoration: none;
    font-size: 1.25rem;
    color: white;
    font-weight: 800;
  }

  h1,h2,h3,h4,h5 {
    font-family: var(--kemco-font);
    font-weight: 400;
  }

  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1rem;
    text-transform: uppercase;
  }
  h5 {
    font-size: .8rem;
    text-transform: uppercase;
  }

  th {
    padding: 10px;
    text-align: end;
  }

  @media (max-width: 1280px) {
    h1 {
      font-size: 4rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    h1 {
    }
    h2 {
    }
  }
`;

export const TruncatedText = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5 {
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const Body = styled.div`
  max-width: var(--body-mxwidth);
  margin: 0 auto;
  margin-top: 20px;
  padding: var(--header-height) 1rem;
`;

export const TabTitle = styled.h3`
  text-align: end;
  margin: 20px 0;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h4``;
