import React from 'react';
import {
  AiFillCheckCircle,
  AiFillInfoCircle,
  AiFillWarning,
  AiFillCloseCircle,
} from 'react-icons/ai';

import { Icon } from '../components/icon';
import { Loading } from '../components/loading';

export const getStateIcon = (state: KUI.StateTypes | 'loading', props?: any) => {
  let icon;
  switch (state) {
    case 'info':
      icon = <AiFillInfoCircle />;
      break;
    case 'warning':
      icon = <AiFillWarning />;
      break;
    case 'success':
      icon = <AiFillCheckCircle />;
      break;
    case 'danger':
      icon = <AiFillCloseCircle />;
      break;
    case 'loading':
      return <Loading {...props} />;
    default:
      break;
  }
  return icon && <Icon {...props}>{icon}</Icon>;
};
