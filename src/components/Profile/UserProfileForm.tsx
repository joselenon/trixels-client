/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { TUserProfileInfo } from '../../hooks/useGetUserProfile';
import useRequireLogin from '../../hooks/useRequireLogin';
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

interface IUserProfileFormProps {
  userProfileInfo: TUserProfileInfo;
  isCurrentUser: boolean;
}

export default function UserProfileForm({ userProfileInfo, isCurrentUser }: IUserProfileFormProps) {
  const requireLoginFn = useRequireLogin();
  const handleUpdateUserInfo = useUpdateUserInfo();

  const urlParams = useParams<TParams>();
  const { username: usernameToQuery } = urlParams;

  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const emailInput: ITextInput = {
    componentKey: 'email:' + usernameToQuery,
    id: 'email',
    options: {
      type: 'text',
      defaultValue: userProfileInfo?.email?.value,
      required: false,
      disabled: !isCurrentUser,
    },
    label: 'E-mail',
    rhfConfig: {
      rhfValidationFn: (value: string) => validateEmail(value),
      rhfRegister: register,
      rhfErrors: errors,
      getValues,
    },
  };

  const walletInput: ITextInput = {
    componentKey: 'roninWallet:' + usernameToQuery,
    id: 'roninWallet',
    options: {
      type: 'text',
      defaultValue: userProfileInfo?.roninWallet?.value,
      required: false,
      disabled: !isCurrentUser,
    },
    label: `Ronin Wallet ${
      userProfileInfo && typeof userProfileInfo.roninWallet.verified === 'boolean'
        ? userProfileInfo.roninWallet.verified
          ? '(Verified)'
          : '(Not Verified)'
        : ''
    }`,
    rhfConfig: {
      rhfValidationFn: undefined,
      rhfRegister: register,
      rhfErrors: errors,
      getValues,
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
    try {
      if (!requireLoginFn()) return;

      setIsProcessing(true);
      const res = await handleUpdateUserInfo({ ...info });
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <InputsContainer>
          <Input {...emailInput} />

          <WalletCredentials userProfileInfo={userProfileInfo} walletInput={walletInput} />
        </InputsContainer>

        {requireLoginFn(false) && isCurrentUser && (
          <SaveButtonContainer>
            <TrixelsButton isPending={isProcessing} btnType={'CTA'} label="Save" attributes={{ type: 'submit' }} />
          </SaveButtonContainer>
        )}
      </form>
    </div>
  );
}
