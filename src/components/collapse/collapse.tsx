import React, { memo, useCallback, useEffect } from 'react';
import classnames from 'classnames';

import { CollapseProps } from './typing';

const Collapse = (props: CollapseProps) => {
  const {
    prefixCls = 'k-collapse',
    className,
    children,
    defaultActiveIds,
    accordion,
    onChange,
    ...others
  } = props;

  const [activeIds, setActiveIds] = React.useState(props.activeIds || defaultActiveIds);

  useEffect(() => {
    if (props.activeIds) {
      setActiveIds(props.activeIds);
    }
  }, [props.activeIds]);

  const handleChange = useCallback(
    id => {
      const newActiveIds = accordion ? [] : activeIds ? [...activeIds] : [];

      if (!('activeIds' in props)) {
        const index = activeIds ? activeIds.indexOf(id) : -1;
        if (index === -1) {
          newActiveIds.push(id);
        } else {
          newActiveIds.splice(index, 1);
        }
        setActiveIds(newActiveIds);
      }

      if (onChange) {
        onChange(id);
      }
    },
    [accordion, activeIds],
  );

  const classString = classnames(prefixCls, className);

  return (
    <div className={classString} {...others}>
      {React.Children.map(children, (child: any, index) => {
        if (!child || !child.type || child.type.type.displayName !== 'CollapsePanel') {
          return null;
        }
        return React.cloneElement(child, {
          ...child.props,
          prefixCls,
          activeIds,
          onClick: handleChange,
        });
      })}
    </div>
  );
};

Collapse.defaultProps = {
  defaultActiveIds: [],
};

export default memo(Collapse);
