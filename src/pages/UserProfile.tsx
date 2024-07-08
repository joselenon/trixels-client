import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import LogoutButton from '../components/LogoutButton';
import UserMenus from '../components/Profile/UserMenus';
import UserProfileForm from '../components/Profile/UserProfileForm';
import Reveal from '../components/Reveal';
import UserAvatarElement from '../components/UserAvatarElement';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { IReduxStore } from '../interfaces/IRedux';
import { TParams } from '../routes/AppRoutes';
import { Body } from '../styles/GlobalStyles';

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
  const { userProfileInfo, queryUsername } = useGetUserProfile();

  const userLoggedCredentials = useSelector<IReduxStore, IReduxStore['auth']['userCredentials']>(
    (state) => state.auth.userCredentials,
  );

  const urlParams = useParams<TParams>();
  const { username: usernameToQuery } = urlParams;
  const isCurrentUser = userLoggedCredentials?.username === usernameToQuery;

  console.log(userProfileInfo);

  useEffect(() => {
    queryUsername();
  }, [usernameToQuery]);

  return (
    <Body>
      <Reveal width="100%">
        <>
          {userProfileInfo === null ? (
            <div style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1 style={{ color: 'var(--default-middlegrey)' }}>User not found</h1>
            </div>
          ) : (
            <UserProfileContainer>
              {isCurrentUser && <LogoutButton />}

              <MainContainer>
                <NameAndAvatar>
                  <UserAvatarElement userInfo={{ url: userProfileInfo?.avatar }} sizeInPx={60} />
                  <h2>{userProfileInfo?.username}</h2>
                </NameAndAvatar>

                <UserProfileForm userProfileInfo={userProfileInfo} />
              </MainContainer>

              {userLoggedCredentials && <UserMenus />}
            </UserProfileContainer>
          )}
        </>
      </Reveal>
    </Body>
  );
}
