import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconType } from 'react-icons/lib';

import { BTN_TYPES, IButton } from '../../styles/BUTTONS_STYLES';
import * as styles from './styles';

export default function Button(props: IButton): JSX.Element {
  const { btnType, icon, label, element, attributes } = props;

  const btnStyles: React.CSSProperties = BTN_TYPES[btnType];

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
    <styles.Button {...attributes} style={btnStyles}>
      {iconElement() || null}
      {label ? (typeof label === 'string' ? label.toUpperCase() : label) : ''}
      {element && element}
    </styles.Button>
  );
}
