// Arrumar input que ao colocar como vazio e ir para outra aba, ao voltar ele retorna o valor desatualizado
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import LogoutButton from '../components/LogoutButton';
import UserProfileForm from '../components/Profile/UserProfileForm';
import Reveal from '../components/Reveal';
import UserAvatarElement from '../components/UserAvatarElement';
import useGetUserInfo from '../hooks/useGetUserProfile';
import { IReduxStore } from '../interfaces/IRedux';
import { TParams } from '../routes/AppRoutes';
import { Body } from '../styles/GlobalStyles';
import UserMenus from '../components/Profile/UserMenus';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--default-lightgrey);
  padding: var(--default-pdn);

  h2,
  h4 {
    color: var(--default-black);
  }
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
          {isCurrentUser && <LogoutButton />}

          <MainContainer>
            <NameAndAvatar>
              <UserAvatarElement userInfo={{ url: userProfileInfo?.avatar }} sizeInPx={60} />
              <h2>{userProfileInfo?.username}</h2>
            </NameAndAvatar>

            <UserProfileForm />
          </MainContainer>

          {userLoggedCredentials && <UserMenus />}
        </UserProfileContainer>
      </Reveal>
    </Body>
  );
}
