import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconType } from 'react-icons/lib';
import styled, { CSSProperties } from 'styled-components';

export type TButtonTypes = 'TEXT' | 'CTA' | 'DANGER' | 'ELEMENT' | 'DEFAULT' | 'BLUE';

export type IButtonTypeConfig = {
  [key in TButtonTypes]: React.CSSProperties;
};

export interface ITrixelsButtonAtributtes {
  id?: string;
  type?: 'button' | 'submit' | undefined;
  onClick?: ((e: React.MouseEvent<any>) => Promise<void>) | ((e: React.MouseEvent<any>) => void) | undefined;
}

const ButtonTypes: IButtonTypeConfig = {
  DEFAULT: {
    background: 'var(--default-grey)',
  },
  TEXT: {
    background: 'none',
  },
  CTA: {
    background: 'var(--default-green)',
  },
  DANGER: {
    background: 'var(--default-red)',
  },
  ELEMENT: {
    width: '100%',
  },
  BLUE: {
    background: 'var(--default-blue)',
  },
};

interface IButtonStylesProps {
  $isPending: boolean | undefined;
  $btnType: TButtonTypes;
  $borderRadius?: string;
}

const ButtonStyle = styled.button<IButtonStylesProps>`
  width: 100%;
  height: 40px;
  background: none;
  position: relative;
  cursor: ${({ $isPending }) => ($isPending ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $isPending }) => ($isPending ? 'none' : 'auto')};
  border: none;
  border-radius: ${({ $borderRadius }) => ($borderRadius ? $borderRadius : 'var(--default-br)')};

  &:hover {
    filter: ${({ $isPending }) => ($isPending ? 'none' : 'brightness(0.95)')};
  }

  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  h5 {
    color: var(--default-white);
  }

  svg {
    max-width: 40px;
    max-height: 40px;
  }

  span {
    color: white;
  }
`;

const ButtonElementsContainer = styled.div<IButtonStylesProps>`
  padding: ${({ $btnType }) => ($btnType === 'ELEMENT' ? '0' : '10px')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  opacity: ${({ $isPending }) => ($isPending ? 0 : 1)};
  white-space: nowrap;
  width: 100%;
  height: 100%;
`;

const PendingGIFContainer = styled.div<IButtonStylesProps>`
  position: absolute;
  backdrop-filter: blur(2px);
  background-color: rgb(0, 0, 0, 0.2);
  opacity: ${({ $isPending }) => ($isPending ? 1 : 0)};
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PendingSVGGIF = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <rect fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" width="30" height="30" x="25" y="85">
      <animate
        attributeName="opacity"
        calcMode="spline"
        dur="2"
        values="1;0;1;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.4"
      ></animate>
    </rect>
    <rect fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" width="30" height="30" x="85" y="85">
      <animate
        attributeName="opacity"
        calcMode="spline"
        dur="2"
        values="1;0;1;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.2"
      ></animate>
    </rect>
    <rect fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" width="30" height="30" x="145" y="85">
      <animate
        attributeName="opacity"
        calcMode="spline"
        dur="2"
        values="1;0;1;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="0"
      ></animate>
    </rect>
  </svg>
);

export interface ITrixelsButton {
  btnType: TButtonTypes;
  icon?: { provider: 'fontAwesome' | 'reactIcons'; element: IconDefinition | IconType };
  label?: string;
  element?: JSX.Element;
  attributes?: ITrixelsButtonAtributtes;
  isPending?: boolean;
  styles?: React.CSSProperties;
}

export default function TrixelsButton(props: ITrixelsButton): JSX.Element {
  const { btnType, icon, label, element, attributes, isPending, styles } = props;
  const btnStyles: React.CSSProperties = ButtonTypes[btnType];

  const iconElement = () => {
    if (icon) {
      if (icon.provider === 'fontAwesome') {
        return <FontAwesomeIcon icon={icon.element as IconDefinition} />;
      }
      if (icon.provider === 'reactIcons') {
        const Element = icon.element as IconType;
        return <Element />;
      }
    } else {
      null;
    }
  };

  return (
    <ButtonStyle
      {...attributes}
      style={{ ...btnStyles, ...styles }}
      type={attributes?.type ? attributes.type : 'button'}
      $isPending={isPending}
      $btnType={btnType}
      disabled={isPending}
    >
      <ButtonElementsContainer $btnType={btnType} $isPending={isPending}>
        {iconElement() || null}
        {label ? typeof label === 'string' ? <h5>{label.toUpperCase()}</h5> : label : ''}
        {element && element}
      </ButtonElementsContainer>

      <PendingGIFContainer $btnType={btnType} $isPending={isPending}>
        {PendingSVGGIF}
      </PendingGIFContainer>
    </ButtonStyle>
  );
}
