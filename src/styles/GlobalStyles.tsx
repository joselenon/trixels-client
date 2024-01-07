import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --karla-font: 'Karla', sans-serif;
    --header-height: 60px;
    --default-red: #cb2626;
    --header-color: rgb(33, 33, 33, 0.5);
    --bg-color: linear-gradient(153deg, #282828 18%, #0e0e0e 100%) fixed;
    --primary-text-color: white;
    --primary-color: #353535;
    --soft-primary-color: #2d2d2d;
    --secondary-color: #cecece;
    --green-color: #00963b;
    --blue-color: #3a7ada;
    --secondary-text-color: #d9d9d9;
    --body-mxwidth: 1400px;

    --default-br: 10px; // Border-radius
    --default-pdn: 15px; // Padding
    --default-bshadow: 0px 2px 3px rgb(0, 0, 0, 0.6); // Box-shadow
    --default-btn-mt: 8px;
    --main-gradient: linear-gradient(153deg, #1a1a1a 18%, rgba(74,74,74,1) 100%);
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--primary-text-color);
    font-family: var(--karla-font);
  }

  body {
    background: var(--bg-color);

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

  input {
    background: none;
    border: none;
    font-size: 1rem;

  }

  iframe {
    border: none;
  }

  button, select {
    background: none;
    &:hover {
      filter: brightness(0.9);
      cursor: pointer;
    }
    &:active {
      filter: brightness(0.85);
    }
  }

  svg {
    fill: white;
  }

  ul {
    list-style: none;
  }

  button {
    border: none;
    background: none;
  }

  a {
    text-decoration: none;
    font-size: 1.25rem;
    color: white;
    font-weight: 800;
  }

  h1,h2,h3,h4,h5 {
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  h4 {
    font-size: 1rem;
    color: #bdbdbd;
    font-weight: 400;
    text-transform: uppercase;
    color: white;
  }
  h5 {
    font-size: .8rem;
    font-weight: 500;
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
