import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.input`
  &[type='checkbox'] {
    width: 16px;
    height: 16px;
    border-radius: 0;
    border: 2px solid var(--default-green);
    display: inline-block;
    position: relative;
    -webkit-appearance: none; /* Remove estilo padrão do Webkit (Chrome/Safari) */
    -moz-appearance: none; /* Remove estilo padrão do Firefox */
    appearance: none; /* Remove estilo padrão do navegador */
    cursor: pointer;

    &:hover {
      background-color: var(--default-lightgreen);
    }
  }
  &[type='checkbox']:checked {
    background-color: var(--default-green);
  }
`;

interface TrixelsCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrixelsCheckbox({ checked, onChange }: TrixelsCheckboxProps) {
  return <InputContainer checked={checked} onChange={onChange} type="checkbox" />;
}
