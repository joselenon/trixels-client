import styled, { createGlobalStyle } from 'styled-components';

import kemcoFont from '../assets/fonts/pixelated-1-kemco/kemco-pixel-bold-webfont.woff';
import kemcoFont2 from '../assets/fonts/pixelated-1-kemco/kemco-pixel-bold-webfont.woff2';

export default createGlobalStyle`
  @font-face {
    font-family: 'KemcoPixelBold';
    src: url(${kemcoFont2}) format('woff2'),
        url(${kemcoFont}) format('woff') ;
    font-weight: bold;
    font-style: normal;
  }

  :root {
    --kemco-font: 'KemcoPixelBold', sans-serif;
    --nunito-font: "Nunito", sans-serif;

    --default-oceanblue: #39649c;
    --default-darkblue: #0e76ff;
    --default-blue: #2985ff;
    --default-black: #1b1b1b;
    --default-brown: #4b4237;
    --default-lightblue: #579efc;
    --default-red: #cb2626;
    --default-lightgreen: #91d58d;
    --default-green: #4cc043;
    --default-darkgreen: #459f3f;
    --default-yellow: #d0b320;
    --default-grey: #a5a5a8;
    --default-middlegrey: #dddddd;
    --default-lightgrey: #e6e6e6;

    --default-blueborder: .25rem solid var(--default-blue);
    --default-lightgreyborder: 5px solid var(--default-lightgrey);
    --default-greyborder: 5px solid var(--default-grey);

    --header-height: 70px;
    --header-color: white;
    --header-mx-width: 1600px;

    --primary-bg-color: #efefef;
    --secondary-bg-color: #ffffff;

    --primary-filling-color: var(--default-black);

    --secondary-text-color: #d9d9d9;
    --body-mxwidth: 1400px;

    --default-br: 10px; // Border-radius
    --default-halfpdn: 12.5px; // Padding
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
    font-family: var(--nunito-font);
  }

  body {
    background: var(--primary-bg-color);
    white-space: nowrap;
    min-height: 100vh;

    .positive {
      color: #4dab4d;
    }
    .null {
      color: #838383;
    }
    .negative {
      color: #c03030;
    }

    .pixelated {
      image-rendering: pixelated;
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
    background: var(--secondary-bg-color);
  }

  input, button, select {
    padding: 10px;
    height: 40px;
  }


  input {
    width: 100%;

    h4 {
      color: var(--default-black);
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

  p{
    font-family: var(--nunito-font);
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
      font-size: 1.75rem;
    }
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 1.5rem;
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
  margin-top: 40px;
  min-height: 900px; /* FIX */
  padding: var(--header-height) 1rem;
`;

export const TabTitle = styled.h3`
  text-align: end;
  margin: 20px 0;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h4``;

export const EmphasizedParagraph = styled.p`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  border: 1px solid black;
  width: 100%;
  padding: 6px;
  white-space: normal;
`;

export const AlertParagraph = styled.p`
  font-size: 14px;
  color: var(--default-yellow);
  font-weight: 700;
  text-align: center;
  border: 1px solid red;
  width: 100%;
  padding: 6px;
`;

export const WarnParagraph = styled.p`
  font-size: 14px;
  color: red;
  font-weight: 700;
  text-align: center;
  border: 1px solid red;
  width: 100%;
  padding: 6px;
`;

export const DateSpan = styled.span`
  color: var(--default-grey);
  font-size: 12px;
`;
