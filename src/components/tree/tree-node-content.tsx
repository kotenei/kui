import React, { memo, useContext, useRef } from 'react';
import classnames from 'classnames';
import { useDrag, useDrop } from 'react-dnd';

import { TreeNodeContentProps } from './typing';
import { TreeContext } from './tree.context';

const TreeNodeContent = (props: TreeNodeContentProps) => {
  const { prefixCls, title, icon, componentKey, disabled } = props;
  const treeContext = useContext(TreeContext);
  const {
    dropInfo,
    selectable,
    selectedKeys,
    expandedKeys,
    onTreeNodeSelect,
    onTreeNodeExpand,
    onTreeNodeDropOver,
    onTreeNodeDropEnd,
  } = treeContext;
  const selected = selectedKeys && selectedKeys.indexOf(componentKey) > -1;
  const ref = useRef<any>(null);

  const [{ dropKey, isOver }, drop] = useDrop({
    accept: 'box',
    collect(monitor) {
      return {
        dropKey: componentKey,
        isOver: monitor.isOver(),
      };
    },
    canDrop: (dragItem, monitor: any) => {
      return true;
    },
    hover(dragItem: any, monitor: any) {
      if (!ref.current) {
        return;
      }

      const dragKey = dragItem.key;
      const dropKey = componentKey;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      let diff = 2,
        type = 'middle';
      if (hoverClientY > hoverMiddleY + diff) {
        type = 'bottom';
      } else if (hoverClientY < hoverMiddleY - diff) {
        type = 'top';
      }

      if (expandedKeys.indexOf(dropKey) == -1) {
        onTreeNodeExpand(dropKey);
      }

      onTreeNodeDropOver &&
        onTreeNodeDropOver({
          dragKey,
          dropKey,
          type,
        });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'box',
    item: () => {
      return { key: componentKey };
    },
    canDrag: (monitor: any) => {
      if (disabled) {
        return false;
      }
      return true;
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dragItem, monitor) => {
      let result = monitor.getDropResult();
      onTreeNodeDropEnd && onTreeNodeDropEnd(result);
    },
  });

  const onTitleClick = () => {
    if (disabled) {
      return;
    }
    onTreeNodeSelect && onTreeNodeSelect(componentKey);
  };

  drag(drop(ref));

  const isCurrent = dropInfo && dropInfo.dropKey === componentKey && isOver;

  return (
    <div
      ref={ref}
      className={classnames({
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-content--selected`]: selected,
        'drag-over-gap-top': isCurrent && dropInfo.type === 'top',
        'drag-over-gap-bottom': isCurrent && dropInfo.type === 'bottom',
        'drag-over-gap-middle': isCurrent && dropInfo.type === 'middle',
      })}
      data-handle-key={dropKey}
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
