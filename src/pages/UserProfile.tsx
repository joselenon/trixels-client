// Arrumar input que ao colocar como vazio e ir para outra aba, ao voltar ele retorna o valor desatualizado
import React from 'react';
import styled from 'styled-components';
import validator from 'validator';

import Button from '../components/Button';
import Form from '../components/Form';
import { useUserContext } from '../contexts/UserContext';
import { ICreateInput } from '../interfaces/IRHF';

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

export default function UserProfile() {
  const userInfo = useUserContext();

  const validateEmail = (value: string) => {
    if (!validator.isEmail(value) && value.length !== 0) {
      return { valid: false, errorMsg: 'E-mail inválido.' };
    }
    return { valid: true, errorMsg: '' };
  };

  const handleUpdateUserInfo = (): any => {
    console.log('oi');
  };

  const emailInput: ICreateInput = {
    id: 'email',
    options: {
      type: 'text',
      defaultValue: userInfo?.jwtPayload?.username,
      required: false,
      //disabled: userInfo?.email?.value ? true : false,
    },
    label: 'E-mail',
    rhfConfig: { rhfValidationFn: (value: string) => validateEmail(value) },
  };

  const walletInput: ICreateInput = {
    id: 'ronin-wallet',
    options: {
      type: 'text',
      defaultValue: userInfo?.jwtPayload?.username,
      required: false,
    },
    label: 'Ronin Wallet',
  };

  const saveButton = (
    <SaveButtonContainer>
      <div>
        <Button btnType="CTA" label="Salvar" attributes={{ type: 'submit' }} />
      </div>
    </SaveButtonContainer>
  );

  return (
    <FormContainer>
      <h2>{userInfo.jwtPayload?.username}</h2>

      <Form
        axiosCallHook={handleUpdateUserInfo}
        InputContainer={InputsContainer}
        inputArray={[emailInput, walletInput]}
        submitButton={saveButton}
      />
    </FormContainer>
  );
}
