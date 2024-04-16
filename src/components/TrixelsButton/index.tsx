import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { styled } from 'styled-components';

export type TButtonTypes = 'TEXT' | 'CTA' | 'CTA_PENDING' | 'DANGER' | 'ELEMENT' | 'DEFAULT' | 'BLUE';

export type IButtonTypeConfig = {
  [key in TButtonTypes]: React.CSSProperties;
};

export interface ITrixelsButtonAtributtes {
  id?: string;
  type?: 'button' | 'submit' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ButtonTypes: IButtonTypeConfig = {
  DEFAULT: {
    padding: '14px 10px',
    background: 'var(--default-grey)',
  },

  TEXT: {
    background: 'none',
  },

  CTA: {
    padding: '14px 10px',
    background: 'var(--default-green)',
  },

  CTA_PENDING: {
    padding: '14px 10px',
    background: 'var(--default-darkgreen)',
  },

  DANGER: {
    padding: '14px 10px',
    background: 'var(--default-red)',
  },

  ELEMENT: {
    width: '100%',
  },

  BLUE: {
    padding: '14px 10px',
    background: 'var(--default-blue)',
  },
};

const ButtonStyle = styled.button`
  border: none;
  background: none;
  width: 100%;
  height: 40px;
  border: none;
  position: relative;

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }

  svg {
    max-width: 40px;
    max-height: 40px;
  }

  span {
    font-family: var(--kemco-font);
    font-weight: 900;
    color: white;
  }
`;

interface IPendingProps {
  $isPending: boolean | undefined;
}

const ButtonElementsContainer = styled.div<IPendingProps>`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  opacity: ${({ $isPending }) => ($isPending ? 0 : 1)};
  white-space: nowrap;
`;

const PendingGIFContainer = styled.div<IPendingProps>`
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
  width?: 'auto' | '100%';
}

export default function TrixelsButton(props: ITrixelsButton): JSX.Element {
  const { btnType, icon, label, element, attributes, isPending, width = 'auto' } = props;
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
    <div style={{ width: width }}>
      <ButtonStyle {...attributes} style={btnStyles} type={attributes?.type ? attributes.type : 'button'}>
        <ButtonElementsContainer $isPending={isPending}>
          {iconElement() || null}
          {label ? typeof label === 'string' ? <span>{label.toUpperCase()}</span> : label : ''}
          {element && element}
        </ButtonElementsContainer>

        <PendingGIFContainer $isPending={isPending}>{PendingSVGGIF}</PendingGIFContainer>
      </ButtonStyle>
    </div>
  );
}
