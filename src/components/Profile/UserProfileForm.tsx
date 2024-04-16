/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';

import useGetUserProfile from '../../hooks/useGetUserInfo';
import useUpdateUserInfo from '../../hooks/useUpdateUserInfo';
import { ITextInput } from '../../interfaces/IRHF';
import { TParams } from '../../routes/AppRoutes';
import validateEmail from '../../utils/validateEmail';
import Input from '../Input';
import TrixelsButton from '../TrixelsButton';
import WalletCredentials from './WalletCredentials';

export const InputsContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  color: white;
`;

const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: var(--default-btn-mt);
`;

export default function UserProfileForm() {
  const handleUpdateUserInfo = useUpdateUserInfo();
  const userProfileInfo = useGetUserProfile();

  const urlParams = useParams<TParams>();
  const { username: usernameToQuery } = urlParams;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const emailInput: ITextInput = {
    componentKey: 'email:' + usernameToQuery,
    id: 'email',
    options: {
      type: 'text',
      defaultValue: userProfileInfo?.email?.value,
      required: false,
      //disabled: userInfo?.email?.value ? true : false,
    },
    label: 'E-mail',
    rhfConfig: {
      rhfValidationFn: (value: string) => validateEmail(value),
      rhfRegister: register,
      rhfErrors: errors,
    },
  };

  const walletInput: ITextInput = {
    componentKey: 'roninWallet:' + usernameToQuery,
    id: 'roninWallet',
    options: {
      type: 'text',
      defaultValue: userProfileInfo?.roninWallet?.value,
      required: false,
    },
    label: `Ronin Wallet (${userProfileInfo?.roninWallet.verified ? 'Verified' : 'Not Verified'})`,
    rhfConfig: {
      rhfValidationFn: undefined,
      rhfRegister: register,
      rhfErrors: errors,
    },
  };

  useEffect(() => {
    const inputArray = [emailInput, walletInput];

    inputArray.forEach((input) => {
      if (input.options.defaultValue) {
        setValue(input.id, input.options.defaultValue);
      } else {
        setValue(input.id, '');
      }
    });
  }, [userProfileInfo]);

  const onSubmitHandler: SubmitHandler<FieldValues> = async (info) => {
    const res = await handleUpdateUserInfo({ ...info });
    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res?.message);
    }
  };

  const saveButton = (
    <SaveButtonContainer>
      <div>
        <TrixelsButton btnType="CTA" label="Save" attributes={{ type: 'submit' }} />
      </div>
    </SaveButtonContainer>
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <InputsContainer>
          <Input {...emailInput} />

          <WalletCredentials walletInput={walletInput} />
        </InputsContainer>

        {saveButton}
      </form>
    </div>
  );
}
