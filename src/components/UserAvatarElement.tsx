import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import blankAvatar from '../assets/images/blankavatar.jpg';
import { Link } from 'react-router-dom';

const UserAvatarElementContainer = styled.div<{ $sizeInPx?: number }>`
  width: ${({ $sizeInPx }) => `${$sizeInPx ? `${$sizeInPx}px` : '100%'}`};
  display: flex;

  img {
    width: 100%;
    height: 100%;
  }
`;

interface IUserAvatarElementProps {
  userInfo: { username?: string; url?: string };
  clickable?: boolean;
  sizeInPx?: number;
}

export default function UserAvatarElement({ userInfo, clickable = false, sizeInPx }: IUserAvatarElementProps) {
  const { url, username } = userInfo;

  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
  };

  useEffect(() => {
    setError(false);
  }, [url]);

  const avatarImage = error ? (
    <img src={blankAvatar} alt="trixels default user avatar" onError={() => setError(true)} />
  ) : (
    <img src={url} alt={`trixels user avatar ${url}`} onError={handleImageError} />
  );

  return clickable ? (
    <Link to={`/profile/${username}`}>
      <UserAvatarElementContainer $sizeInPx={sizeInPx}>{avatarImage}</UserAvatarElementContainer>
    </Link>
  ) : (
    <UserAvatarElementContainer $sizeInPx={sizeInPx}>{avatarImage}</UserAvatarElementContainer>
  );
}
