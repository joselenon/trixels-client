import React, { useMemo } from 'react';
import styled from 'styled-components';
import TrixelsButton from '.';

const PageSelectButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface IPageSelectButtons {
  hasPrevious: boolean;
  hasMore: boolean;
  toggleNext: () => void;
  togglePrevious: () => void;
  maxVisiblePages?: number; // Número máximo de páginas visíveis por vez
}

export default function PageSelectButtonsCustomToggler({
  hasPrevious,
  hasMore,
  toggleNext,
  togglePrevious,
}: IPageSelectButtons) {
  return (
    <PageSelectButtonsContainer>
      <TrixelsButton
        btnType={hasPrevious ? 'BLUE' : 'DEFAULT'}
        label={'Prev'}
        attributes={{
          onClick: togglePrevious,
          id: 'return',
        }}
      />

      <TrixelsButton
        btnType={hasMore ? 'BLUE' : 'DEFAULT'}
        label="Next"
        attributes={{
          onClick: toggleNext,
          id: 'next',
        }}
      />
    </PageSelectButtonsContainer>
  );
}
