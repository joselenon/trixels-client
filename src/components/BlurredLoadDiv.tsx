import React from 'react';
import { styled } from 'styled-components';

const BlurredLoadDivContainer = styled.div<{ $isLoading: boolean }>`
  width: 100%;
  height: 100%;
  font-size: var(--default-fs);
  transition: filter 0.5s;

  filter: ${({ $isLoading }) => ($isLoading ? 'blur(3px)' : 'none')};
`;

interface IBlurredLoadDiv {
  children: JSX.Element;
  isLoading: boolean;
}

export default function BlurredLoadDiv({ children, isLoading }: IBlurredLoadDiv) {
  return <BlurredLoadDivContainer $isLoading={isLoading}>{children}</BlurredLoadDivContainer>;
}
