import React from 'react';
import styled from 'styled-components';

const DefaultInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function DefaultInput({
  label,
  onChangeFn,
}: {
  label: string;
  onChangeFn: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <DefaultInputContainer>
      <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, color: 'var(--default-grey)' }}>{label}</p>
      <input onChange={(e) => onChangeFn(e.target.value)} type="text" />
    </DefaultInputContainer>
  );
}
