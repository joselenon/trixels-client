import React from 'react';
import styled from 'styled-components';

import * as styles from '../../styles/GlobalStyles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TrixelsButton from '.';

const PageSelectButtonsContainer = styled.div<{ $highlights: any }>``;

interface IPageSelectButtons {
  page: number;
  pagesLength: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSelectButtons({ page, pagesLength, setPage }: IPageSelectButtons) {
  const returnHighlight = page - 1 >= 0;
  const nextHighlight = page + 2 <= pagesLength;

  return (
    <PageSelectButtonsContainer $highlights={{ returnHighlight, nextHighlight }}>
      <TrixelsButton
        btnType="TEXT"
        label={'Anterior'}
        attributes={{ onClick: () => setPage(page > 0 ? page - 1 : page), id: 'return' }}
      />
      <TrixelsButton
        btnType="TEXT"
        label="Próximo"
        attributes={{
          onClick: () => setPage(page + 1 >= pagesLength ? page : page + 1),
          id: 'next',
        }}
      />
    </PageSelectButtonsContainer>
  );
}
