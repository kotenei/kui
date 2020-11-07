import ReactDOM from 'react-dom';
import { domHelpers } from '../utils';

export const getPopoverPosition = (elTrigger, elPopover, placement) => {
  let parent = elTrigger;
  const tw = domHelpers.width(parent);
  const th = domHelpers.height(parent);
  const pw = domHelpers.width(elPopover);
  const ph = domHelpers.height(elPopover);
  const position = { left: 0, top: 0 };
  let result = { left: 0, top: 0 };

  do {
    position.left += parent.offsetLeft - parent.scrollLeft;
    position.top += parent.offsetTop - parent.scrollTop;
    parent = parent.offsetParent;
  } while (parent && parent !== document.body);

  switch (placement) {
    case 'left':
      result = {
        top: position.top + th / 2 - ph / 2,
        left: position.left - pw,
      };
      break;
    case 'leftTop':
      result = { top: position.top, left: position.left - pw };
      break;
    case 'leftBottom':
      result = { top: position.top + th - ph, left: position.left - pw };
      break;
    case 'top':
      result = {
        top: position.top - ph,
        left: position.left + tw / 2 - pw / 2,
      };
      break;
    case 'topLeft':
      result = { top: position.top - ph, left: position.left };
      break;
    case 'topRight':
      result = { top: position.top - ph, left: position.left + tw - pw };
      break;
    case 'right':
      result = {
        top: position.top + th / 2 - ph / 2,
        left: position.left + tw,
      };
      break;
    case 'rightTop':
      result = { top: position.top, left: position.left + tw };
      break;
    case 'rightBottom':
      result = { top: position.top + th - ph, left: position.left + tw };
      break;
    case 'bottom':
      result = {
        top: position.top + th,
        left: position.left + tw / 2 - pw / 2,
      };
      break;
    case 'bottomLeft':
      result = { top: position.top + th, left: position.left };
      break;
    case 'bottomRight':
      result = { top: position.top + th, left: position.left + tw - pw };
      break;
  }

  return result;
};
