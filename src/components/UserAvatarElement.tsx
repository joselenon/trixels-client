import React, { useState } from 'react';
import styled from 'styled-components';

import blankAvatar from '../assets/images/blankavatar.jpg';

const UserAvatarElementContainer = styled.div<{ $sizeInPx?: number }>`
  width: ${({ $sizeInPx }) => `${$sizeInPx ? `${$sizeInPx}px` : '100%'}`};
  display: flex;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default function UserAvatarElement({ url, sizeInPx }: { url: string; sizeInPx?: number }) {
  const [error, setError] = useState(false);

  const handleImageError = () => {
    console.log('eerored');
    setError(true);
  };

  return (
    <UserAvatarElementContainer $sizeInPx={sizeInPx}>
      {error ? (
        <img src={blankAvatar} alt={`trixels default user avatar`} onError={() => setError(true)} />
      ) : (
        <img src={url} alt={`trixels user avatar ${url}`} onError={handleImageError} />
      )}
    </UserAvatarElementContainer>
  );
}
