// Arrumar input que ao colocar como vazio e ir para outra aba, ao voltar ele retorna o valor desatualizado
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import LogoutButton from '../components/LogoutButton';
import UserProfileForm from '../components/Profile/UserProfileForm';
import Reveal from '../components/Reveal';
import UserAvatarElement from '../components/UserAvatarElement';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { IReduxStore } from '../interfaces/IRedux';
import { TParams } from '../routes/AppRoutes';
import { Body } from '../styles/GlobalStyles';

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

export const InputsContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: white;
`;

const NameAndAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    border: var(--default-blueborder);
  }
`;

export interface IUpdateUserCredentialsPayload {
  email?: string;
  roninWallet?: string;
}

export default function UserProfile() {
  const userProfileInfo = useGetUserInfo();

  const userLoggedCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const urlParams = useParams<TParams>();

  const { username: usernameToQuery } = urlParams;
  const isCurrentUser = userLoggedCredentials?.username === usernameToQuery;

  return (
    <Body>
      <Reveal width="100%">
        <UserProfileContainer>
          <FormContainer>
            <NameAndAvatar>
              <UserAvatarElement url={userProfileInfo?.avatar ? userProfileInfo?.avatar : ''} sizeInPx={60} />
              <h2>{userProfileInfo?.username}</h2>
            </NameAndAvatar>

            <UserProfileForm />
          </FormContainer>

          {isCurrentUser && <LogoutButton />}
        </UserProfileContainer>
      </Reveal>
    </Body>
  );
}
