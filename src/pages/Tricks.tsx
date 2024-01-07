import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TabTitle } from '../styles/GlobalStyles';

const TrickContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h2 {
    text-transform: uppercase;
  }
  &.Trading {
    background-color: #cd3131;
  }
  &.Crafting {
    background-color: #bd7336;
  }
  &.LR {
    background-color: #000000;
  }
`;

const TricksItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function Tricks() {
  const tricksItems: { [key: string]: string } = {
    Trading: '/tricks/trading',
    Crafting: '/tricks/crafting',
    LR: '/tricks/lr',
  };
  const trickItemsKeys = Object.keys(tricksItems);

  return (
    <div>
      <TabTitle>Tricks</TabTitle>

      <TricksItemsContainer>
        {trickItemsKeys.map((key, i) => (
          <Link to={tricksItems[key]} key={i}>
            <TrickContainer className={key}>
              <h2>{key}</h2>
            </TrickContainer>
          </Link>
        ))}
      </TricksItemsContainer>
    </div>
  );
}
