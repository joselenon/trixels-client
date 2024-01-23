import React, { useState } from 'react';

import { ITextInput } from '../../interfaces/IRHF';
import * as styles from './styles';

export default function Input({ id, label, options, rhfConfig }: ITextInput) {
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
  } = rhfConfig;

  const [validationValue, setValidationValue] = useState({
    valid: false,
    errorMsg: '',
  });

  const validation = (value: any) => {
    const validate = rhfValidationFn(value);
    setValidationValue(validate);
    return validate;
  };

  // rhfRegister is responsible to set the payload keys with the id and the input submittion options (ex: validate)
  const { ...registerProps } = rhfRegister(id, {
    valueAsNumber: type === 'number',
    validate: (value: any) => {
      const { valid } = validation(value);
      return valid;
    },
  });

  return (
    <styles.InputContainer>
      <h3>{label}</h3>
      <label htmlFor={id}>
        <input
          {...options}
          {...registerProps}
          style={{ color: options.disabled ? '#cecece' : 'white' }}
          aria-invalid={rhfErrors[id] ? 'true' : 'false'}
        />
      </label>
      {rhfErrors[id] && rhfErrors[id]!.type === 'required' && (
        <styles.ErrorMessage>Campo obrigatório.</styles.ErrorMessage>
      )}
      {rhfErrors[id] && rhfErrors[id]!.type === 'validate' && (
        <styles.ErrorMessage>{validationValue.errorMsg}</styles.ErrorMessage>
      )}
    </styles.InputContainer>
  );
}
