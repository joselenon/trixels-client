import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { IForm } from '../../interfaces/IRHF';
import Input from '../Input';

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function Form(props: IForm) {
  const { axiosCallHook, InputContainer, inputArray, submitButton } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues, // Adicione getValues aqui
  } = useForm();

  const onSubmitHandler: SubmitHandler<FieldValues> = async (info) => {
    await axiosCallHook({ ...info });
  };

  useEffect(() => {
    inputArray.forEach((input) => {
      if (input.options.defaultValue) {
        setValue(input.id, input.options.defaultValue);
      } else {
        setValue(input.id, '');
      }
    });
  }, [setValue, inputArray]);

  const inputArrayHTML = inputArray.map((input) => {
    const { options } = input;

    return (
      <Input
        key={input.componentKey}
        componentKey={input.componentKey}
        id={input.id}
        options={options}
        label={input.label}
        rhfConfig={{
          rhfValidationFn: input.rhfConfig?.rhfValidationFn,
          rhfRegister: register,
          rhfErrors: errors,
          getValues, // Passe getValues aqui
        }}
      />
    );
  });

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <DefaultContainer>
        {InputContainer && <InputContainer>{inputArrayHTML}</InputContainer>}
        {!InputContainer && inputArrayHTML}

        {submitButton}
      </DefaultContainer>
    </form>
  );
}
