import React, { memo, useContext } from 'react';
import classnames from 'classnames';

import { TreeNodeProps } from './typing';
import { TreeContext } from './tree.context';

const TreeNodeContent = (props: TreeNodeProps) => {
  const { prefixCls, title, icon, componentKey, disabled } = props;
  const treeContext = useContext(TreeContext);
  const { selectable, selectedKeys, onTreeNodeSelect } = treeContext;
  const selected = selectedKeys && selectedKeys.indexOf(componentKey) > -1;

  const onTitleClick = () => {
    if (disabled) {
      return;
    }
    onTreeNodeSelect && onTreeNodeSelect(componentKey);
  };

  return (
    <div
      className={classnames({
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-content--selected`]: selected,
      })}
    >
      {icon && <span className={`${prefixCls}-icon`}>{icon}</span>}
      <span
        className={classnames({
          [`${prefixCls}-title`]: true,
          [`${prefixCls}-title--selectable`]: selectable,
        })}
        onClick={onTitleClick}
      >
        {title}
      </span>
    </div>
  );
};

export default memo(TreeNodeContent);
