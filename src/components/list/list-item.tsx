import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

const ListItem = props => {
  const { prefixCls = 'k-list-item', children, className, actions, ...others } = props;
  const classString = classnames(prefixCls, className);

  const renderActionsContent = () => {
    const items: any = [];
    if (actions && actions.length) {
      actions.forEach((action, index) => {
        items.push(
          <li key={index} className={`${prefixCls}-actions__item`}>
            {action}
          </li>,
        );

        if (index + 1 !== actions.length) {
          items.push(
            <li
              key={`${index}-separator`}
              className={classnames({
                [`${prefixCls}-actions__item`]: true,
                [`${prefixCls}-actions__separator`]: true,
              })}
            >
              <span>|</span>
            </li>,
          );
        }
      });
    }
    return items;
  };

  return (
    <li className={classString} {...others}>
      <div className={`${prefixCls}-content`}>{children}</div>
      <ul className={`${prefixCls}-actions`}>{renderActionsContent()}</ul>
    </li>
  );
};

ListItem.displayName = 'ListItem';

export default memo(ListItem);
