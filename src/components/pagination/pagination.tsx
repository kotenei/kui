import React, { memo, useMemo, useEffect, useState, useCallback } from 'react';
import classnames from 'classnames';
import {
  AiOutlineLeft,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineRight,
  AiOutlineEllipsis,
} from 'react-icons/ai';

import { Icon } from '../icon';
import PaginationItem from './pagination-item';
import { PaginationProps } from './typing';

const Pagination = (props: PaginationProps) => {
  const {
    prefixCls = 'k-pagination',
    color,
    size,
    jump = 5,
    pageIndex = 0,
    pageSize = 20,
    total = 0,
    onChange,
    ...others
  } = props;
  const [current, setCurrent] = useState(1);
  const [hoverType, setHoverType] = useState(0);

  useEffect(() => {
    if (pageIndex !== undefined && pageIndex !== null && pageIndex !== current - 1) {
      setCurrent(pageIndex + 1);
    }
  }, [pageIndex]);

  const onClick = useCallback(
    (num: number) => {
      if (!('pageIndex' in props)) {
        setCurrent(num);
      }
      if (onChange) {
        onChange(num - 1, pageSize);
      }
      setTimeout(() => {
        setHoverType(0);
      });
    },
    [pageSize],
  );

  const onPrevMouseOver = useCallback(() => {
    setHoverType(1);
  }, []);

  const onPrevMouseLeave = useCallback(() => {
    setHoverType(0);
  }, []);

  const onNextMouseOver = useCallback(() => {
    setHoverType(2);
  }, []);

  const onNextMouseLeave = useCallback(() => {
    setHoverType(0);
  }, []);

  const getPageInfo = useCallback(() => {
    // 确定总页数
    let allPage = parseInt(String(total / pageSize), 10);
    allPage = total % pageSize !== 0 ? allPage + 1 : allPage;
    allPage = allPage === 0 ? 1 : allPage;

    // 确定起始和结束页码
    let start = current + 2 > allPage ? allPage - 4 : current - 2;
    let end = current < 4 ? 5 : current + 2;

    // 修正起始和结束页的溢出
    if (start < 1) {
      start = 1;
    }
    if (end > allPage) {
      end = allPage;
    }

    // 确定前一页和下一页的数字
    const pre = current - 1 < 1 ? 1 : current - 1;
    const next = current + 1 > allPage ? allPage : current + 1;

    return {
      start,
      end,
      pre,
      next,
      allPage,
    };
  }, [total, pageSize, current]);

  const renderContent = () => {
    const info = getPageInfo();

    const items: any = [];
    let jumpPrev = current - jump,
      jumpNext = current + jump,
      key = 0,
      itemClassString;

    if (jumpPrev <= 0) {
      jumpPrev = 1;
    }

    if (jumpNext > info.allPage) {
      jumpNext = info.allPage;
    }

    itemClassString = 'k-pagination-prev';
    if (current <= 1) {
      itemClassString += ' disabled';
    }

    items.push(
      <PaginationItem key={key++} num={info.pre} className={itemClassString} onItemClick={onClick}>
        <Icon>
          <AiOutlineLeft />
        </Icon>
      </PaginationItem>,
    );

    if (info.start > 1) {
      items.push(
        <PaginationItem key={key++} num={1} onItemClick={onClick}>
          1
        </PaginationItem>,
      );
      if (jumpPrev !== 1) {
        items.push(
          <PaginationItem
            key={key++}
            num={jumpPrev}
            className="k-pagination-jump-prev"
            onItemClick={onClick}
            onMouseOver={onPrevMouseOver}
            onMouseLeave={onPrevMouseLeave}
          >
            <Icon>{hoverType === 1 ? <AiOutlineDoubleLeft /> : <AiOutlineEllipsis />}</Icon>
          </PaginationItem>,
        );
      }
    }

    for (let i = info.start; i <= info.end; i++) {
      itemClassString = i === current ? 'active' : '';
      items.push(
        <PaginationItem key={key++} num={i} className={itemClassString} onItemClick={onClick}>
          {i}
        </PaginationItem>,
      );
    }

    if (info.end < info.allPage) {
      if (jumpNext < info.allPage) {
        items.push(
          <PaginationItem
            key={key++}
            num={jumpNext}
            className="k-pagination-jump-next"
            onItemClick={onClick}
            onMouseOver={onNextMouseOver}
            onMouseLeave={onNextMouseLeave}
          >
            <Icon>{hoverType === 2 ? <AiOutlineDoubleRight /> : <AiOutlineEllipsis />}</Icon>
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={key++} num={info.allPage} onItemClick={onClick}>
          {info.allPage}
        </PaginationItem>,
      );
    }

    itemClassString = 'k-pagination-next';
    if (current === info.allPage) {
      itemClassString += ' disabled';
    }

    items.push(
      <PaginationItem key={key++} num={info.next} className={itemClassString} onItemClick={onClick}>
        <Icon>
          <AiOutlineRight />
        </Icon>
      </PaginationItem>,
    );

    return items;
  };

  const classString = classnames({
    [prefixCls]: true,
    [`${prefixCls}--${size}`]: !!size,
    [`${prefixCls}--${color}`]: !!color,
  });

  return <ul className={classString}>{renderContent()}</ul>;
};

export default memo(Pagination);
