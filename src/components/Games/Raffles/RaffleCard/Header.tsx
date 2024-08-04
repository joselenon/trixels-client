import React from 'react';
import styled from 'styled-components';

import { IRaffleToFrontEndTreated } from '../../../../interfaces/IRaffles';
import CurrencyIconAndAmount from '../../../CurrencyIconAndAmount';
import UserAvatarElement from '../../../UserAvatarElement';

interface IHeaderProps {
  createdBy: IRaffleToFrontEndTreated['createdBy'];
  prizesTotalValue: number;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PrizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 0.2rem;
`;

export default function Header({ createdBy, prizesTotalValue }: IHeaderProps) {
  return (
    <HeaderContainer>
      <div>
        <UserAvatarElement
          clickable={true}
          userInfo={{ url: createdBy.avatar, username: createdBy.username }}
          sizeInPx={40}
        />
      </div>

      <PrizeContainer>
        <h5>Prize</h5>
        <CurrencyIconAndAmount theme="default" amount={prizesTotalValue} />
      </PrizeContainer>
    </HeaderContainer>
  );
}
