// Arrumar input que ao colocar como vazio e ir para outra aba, ao voltar ele retorna o valor desatualizado
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Button from '../components/Button';
import Form from '../components/Form';
import useGetUserProfile from '../hooks/useGetUserProfile';
import useUpdateUserInfo from '../hooks/useUpdateUserInfo';
import { ICreateInput } from '../interfaces/IRHF';
import { TParams } from '../routes/AppRoutes';
import validateEmail from '../utils/validateEmail';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--primary-color);
  padding: 13px;
  border-radius: var(--default-br);
`;

const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: var(--default-btn-mt);
`;

export const InputsContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: white;
`;

export interface IUpdateUserCredentialsPayload {
  email?: string;
  roninWallet?: string;
}

export default function UserProfile() {
  const handleUpdateUserInfo = useUpdateUserInfo();
  const userProfileInfo = useGetUserProfile();
  const urlParams = useParams<TParams>();

  const [inputArray, setInputArray] = useState<ICreateInput[]>([]);

  const { username: usernameToQuery } = urlParams;

  useEffect(() => {
    const emailInput: ICreateInput = {
      componentKey: 'email:' + usernameToQuery,
      id: 'email',
      options: {
        type: 'text',
        defaultValue: userProfileInfo?.email?.value,
        required: false,
        //disabled: userInfo?.email?.value ? true : false,
      },
      label: 'E-mail',
      rhfConfig: { rhfValidationFn: (value: string) => validateEmail(value) },
    };

    const walletInput: ICreateInput = {
      componentKey: 'roninWallet:' + usernameToQuery,
      id: 'roninWallet',
      options: {
        type: 'text',
        defaultValue: userProfileInfo?.ronin_wallet.value,
        required: false,
      },
      label: 'Ronin Wallet',
    };

    setInputArray([emailInput, walletInput]);
  }, [userProfileInfo]);

  const saveButton = (
    <SaveButtonContainer>
      <div>
        <Button btnType="CTA" label="Salvar" attributes={{ type: 'submit' }} />
      </div>
    </SaveButtonContainer>
  );

  return (
    <FormContainer>
      <h2>{userProfileInfo?.username}</h2>

      <Form
        axiosCallHook={handleUpdateUserInfo}
        InputContainer={InputsContainer}
        inputArray={inputArray}
        submitButton={saveButton}
      />
    </FormContainer>
  );
}
