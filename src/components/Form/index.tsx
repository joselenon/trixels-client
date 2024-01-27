import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { IForm } from '../../interfaces/IRHF';
import { IMyAPIResponse } from '../../services/MyAxiosService';
import Input from '../Input';

export default function Form(props: IForm) {
  const { axiosCallHook, InputContainer, inputArray, submitButton } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitHandler: SubmitHandler<FieldValues> = async (info) => {
    (await axiosCallHook({ ...info })) as
      | AxiosResponse<IMyAPIResponse<unknown>, any>
      | undefined;
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
        }}
      />
    );
  });

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <InputContainer>{inputArrayHTML}</InputContainer>
      {submitButton}
    </form>
  );
}
