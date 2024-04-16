import React from 'react';
import { styled } from 'styled-components';

import UserAvatarElement from '../../../UserAvatarElement';

const AvatarItemContainer = styled.div`
  width: 80px;
  height: 80px;
  border: 1.5px solid grey;
`;

interface IAvatarItemProps {
  avatarUrl: string;
}

export default function AvatarItem(props: IAvatarItemProps) {
  const { avatarUrl } = props;

  return (
    <AvatarItemContainer>
      <UserAvatarElement url={avatarUrl} sizeInPx={80} />
    </AvatarItemContainer>
  );
}
