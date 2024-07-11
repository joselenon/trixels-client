import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { ICreateInput } from '../../interfaces/IRHF';
import Input from '../Input';
import TrixelsButton, { ITrixelsButton } from '../TrixelsButton';

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export interface IForm {
  // Function that will be used when form submits
  axiosCallHook: (payload: any) => any;
  // In order to have custom style on inputs container
  InputContainer?: React.ComponentType<{ children: React.ReactNode }>;
  inputArray: ICreateInput[];
  buttonConfig: ITrixelsButton;
}

export default function Form(props: IForm) {
  const { axiosCallHook, InputContainer, inputArray, buttonConfig } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues, // Adicione getValues aqui
  } = useForm();

  const [isPending, setIsPending] = useState(false);

  const onSubmitHandler: SubmitHandler<FieldValues> = async (info) => {
    try {
      setIsPending(true);
      await axiosCallHook({ ...info });
      setIsPending(false);
    } catch (err) {
      setIsPending(false);
    }
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

        <TrixelsButton {...buttonConfig} isPending={isPending} attributes={{ type: 'submit' }} />
      </DefaultContainer>
    </form>
  );
}
