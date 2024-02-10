// Arrumar input que ao colocar como vazio e ir para outra aba, ao voltar ele retorna o valor desatualizado
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Button from '../components/Button';
import Form from '../components/Form';
import LogoutButton from '../components/LogoutButton';
import Modal from '../components/Modal';
import useGetUserProfile from '../hooks/useGetUserProfile';
import useLogout from '../hooks/useLogout';
import useUpdateUserInfo from '../hooks/useUpdateUserInfo';
import { IReduxStore } from '../interfaces/IRedux';
import { ICreateInput } from '../interfaces/IRHF';
import { TParams } from '../routes/AppRoutes';
import validateEmail from '../utils/validateEmail';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--secondary-bg-color);
  padding: var(--default-pdn);
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

  const userLoggedCredentials = useSelector<
    IReduxStore,
    IReduxStore['auth']['userCredentials']
  >((state) => state.auth.userCredentials);

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
        defaultValue: userProfileInfo?.roninWallet?.value,
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
    <UserProfileContainer>
      <FormContainer>
        <h2>{userProfileInfo?.username}</h2>

        <Form
          axiosCallHook={handleUpdateUserInfo}
          InputContainer={InputsContainer}
          inputArray={inputArray}
          submitButton={saveButton}
        />
      </FormContainer>

      {userLoggedCredentials?.username === usernameToQuery && <LogoutButton />}
    </UserProfileContainer>
  );
}
