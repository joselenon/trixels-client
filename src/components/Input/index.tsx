import React, { useState } from 'react';
import { styled } from 'styled-components';

import { ITextInput } from '../../interfaces/IRHF';

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 14px;
  color: red;
`;

export default function Input(props: ITextInput) {
  const { id, label, options, rhfConfig, componentKey } = props;

  const { type } = options;
  const {
    rhfRegister,
    rhfErrors,
    rhfValidationFn = () => {
      return {
        valid: true,
        errorMsg: '',
      };
    },
    getValues, // Desestruture getValues de rhfConfig
  } = rhfConfig;

  const [validationValue, setValidationValue] = useState({
    valid: false,
    errorMsg: '',
  });

  const validation = (value: any) => {
    const validate = rhfValidationFn(value, getValues); // Passe getValues para rhfValidationFn
    setValidationValue(validate);
    return validate;
  };

  const { ...registerProps } = rhfRegister(id, {
    valueAsNumber: type === 'number',
    validate: (value: any) => {
      const { valid } = validation(value);
      return valid;
    },
  });

  return (
    <InputContainer key={componentKey}>
      <h4>{label}</h4>

      <label htmlFor={id}>
        <input {...options} {...registerProps} aria-invalid={rhfErrors[id] ? 'true' : 'false'} />
      </label>

      {rhfErrors[id] && rhfErrors[id]!.type === 'required' && <ErrorMessage>Campo obrigatório.</ErrorMessage>}
      {rhfErrors[id] && rhfErrors[id]!.type === 'validate' && <ErrorMessage>{validationValue.errorMsg}</ErrorMessage>}
    </InputContainer>
  );
}
