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
  page: number;
  hasMore: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxVisiblePages?: number; // Número máximo de páginas visíveis por vez
}

export default function PageSelectButtons({ page, hasMore, setPage }: IPageSelectButtons) {
  const handlePageChange = (action: 'add' | 'sub') => {
    if (!hasMore && action === 'add') {
      return;
    }

    switch (action) {
      case 'add':
        setPage((prev) => prev + 1);
        break;
      case 'sub':
        setPage((prev) => {
          if (prev === 1) return prev;
          return prev - 1;
        });
        break;
    }
  };

  return (
    <PageSelectButtonsContainer>
      <TrixelsButton
        btnType={page === 1 ? 'DEFAULT' : 'BLUE'}
        label={'Prev'}
        attributes={{
          onClick: () => handlePageChange('sub'),
          id: 'return',
        }}
      />

      <TrixelsButton
        label="Next"
        btnType={hasMore ? 'BLUE' : 'DEFAULT'}
        attributes={{
          onClick: () => handlePageChange('add'),
          id: 'next',
        }}
      />
    </PageSelectButtonsContainer>
  );
}
