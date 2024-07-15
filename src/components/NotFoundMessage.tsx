import React from 'react';
import styled from 'styled-components';

const NotFoundMessageContainer = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: var(--default-middlegrey);
  }
`;

export default function NotFoundMessage({ label }: { label: string }) {
  return (
    <NotFoundMessageContainer>
      <h1>{label}</h1>
    </NotFoundMessageContainer>
  );
}
