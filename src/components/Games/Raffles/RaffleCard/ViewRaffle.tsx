import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import TrixelsButton from '../../../TrixelsButton';

const ViewRaffleContainer = styled.div`
  display: flex;

  a {
    width: 100%;
  }
`;

const ViewContainer = styled.div`
  width: 100%;
  height: 100%;
  background: var(--primary-bg-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border-radius: var(--default-br);
`;

interface IViewRaffleProps {
  gameId: IRaffleToFrontEndTreated['gameId'];
}

export default function ViewRaffle({ gameId }: IViewRaffleProps) {
  return (
    <ViewRaffleContainer>
      <Link to={`/raffle/${gameId}`}>
        <TrixelsButton
          width="100%"
          btnType="ELEMENT"
          element={
            <ViewContainer>
              <h4>View raffle</h4>
            </ViewContainer>
          }
        />
      </Link>
    </ViewRaffleContainer>
  );
}
