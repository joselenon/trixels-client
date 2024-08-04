import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import LogoutButton from '../components/LogoutButton';
import NotFoundMessage from '../components/NotFoundMessage';
import UserMenus from '../components/Profile/UserMenus';
import UserProfileForm from '../components/Profile/UserProfileForm';
import Reveal from '../components/Reveal';
import UserAvatarElement from '../components/UserAvatarElement';
import { useScreenConfig } from '../contexts/ScreenConfigContext';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { IReduxStore } from '../interfaces/IRedux';
import { TParams } from '../routes/AppRoutes';
import { Body, TruncatedText } from '../styles/GlobalStyles';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainContainer = styled.div`
  border-radius: var(--default-br);
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
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export interface IUpdateUserCredentialsPayload {
  email?: string;
  roninWallet?: string;
}

export default function UserProfile() {
  const { isMobile } = useScreenConfig();
  const { userProfileInfo } = useGetUserProfile();

  const userCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const urlParams = useParams<TParams>();
  const { username: usernameToQuery } = urlParams;
  const isCurrentUser = userCredentials?.username === usernameToQuery;

  return (
    <Body>
      <Reveal width="100%">
        <>
          {userProfileInfo === null ? (
            <NotFoundMessage label="User not found" />
          ) : (
            <UserProfileContainer>
              {isCurrentUser && <LogoutButton />}

              <MainContainer>
                <NameAndAvatar>
                  <UserAvatarElement userInfo={{ url: userProfileInfo?.avatar }} sizeInPx={isMobile ? 60 : 80} />

                  <TruncatedText style={{ width: 'auto' }}>
                    <h2>{userProfileInfo?.username}</h2>
                  </TruncatedText>
                </NameAndAvatar>

                <UserProfileForm userProfileInfo={userProfileInfo} isCurrentUser={isCurrentUser} />
              </MainContainer>

              {userCredentials && isCurrentUser && <UserMenus />}
            </UserProfileContainer>
          )}
        </>
      </Reveal>
    </Body>
  );
}
