import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { styled } from 'styled-components';

export type TButtonTypes = 'TEXT' | 'CTA' | 'DANGER' | 'ELEMENT' | 'DEFAULT' | 'BLUE';

export type IButtonTypeConfig = {
  [key in TButtonTypes]: React.CSSProperties;
};

export interface IButtonAtributtes {
  id?: string;
  type?: 'button' | 'submit' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface IButton {
  btnType: TButtonTypes;
  icon?: { provider: 'fontAwesome' | 'reactIcons'; element: IconDefinition | IconType };
  label?: string | JSX.Element;
  element?: JSX.Element;
  attributes?: IButtonAtributtes;
}

const ButtonTypes: IButtonTypeConfig = {
  DEFAULT: {
    padding: '14px 10px',
    background: 'var(--secondary-color)',
  },

  TEXT: {
    background: 'none',
  },

  CTA: {
    padding: '14px 10px',
    background: '#14b546',
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
    background: 'var(--blue-color)',
  },
};

const ButtonStyle = styled.button`
  font-weight: 900;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  gap: 0.25rem;

  span {
    color: white;
  }

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }
`;

export default function MiniSquareButton(props: IButton): JSX.Element {
  const { btnType, icon, label, element, attributes } = props;
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
    <ButtonStyle {...attributes} style={btnStyles}>
      {iconElement() || null}
      {label ? (
        typeof label === 'string' ? (
          <span>{label.toUpperCase()}</span>
        ) : (
          label
        )
      ) : (
        ''
      )}
      {element && element}
    </ButtonStyle>
  );
}
