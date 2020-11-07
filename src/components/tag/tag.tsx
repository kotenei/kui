import React, { memo, useState, useCallback } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineClose } from 'react-icons/ai';

import { TagProps } from './typing';

const Tag = (props: TagProps) => {
  const { prefixCls = 'k-tag', closable, color, line, children, onClose, ...others } = props;
  const [closed, setClosed] = useState(false);

  const handleClose = useCallback(() => {
    if (!closable) {
      return;
    }
    if (!onClose || (typeof onClose === 'function' && onClose() !== false)) {
      setClosed(true);
    }
  }, [closable, onClose]);

  const classString = classnames({
    [prefixCls]: true,
    [`${prefixCls}--${color}`]: !!color,
    [`${prefixCls}--line`]: !!line,
  });

  return (
    <CSSTransition in={!closed} timeout={300} classNames="fade" unmountOnExit>
      <div className={classString} {...others}>
        <span className={`${prefixCls}__text`}>{children}</span>
        {closable ? (
          <span className={`${prefixCls}__icon`}>
            <AiOutlineClose type="close" onClick={handleClose} />
          </span>
        ) : null}
      </div>
    </CSSTransition>
  );
};

Tag.defaultProps = {
  closable: false,
};

export default memo(Tag);
