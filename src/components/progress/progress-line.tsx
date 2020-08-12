import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

import { Icon } from '../icon';
import { ProgressLineProps } from './typing';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const ProgressLine = (props: ProgressLineProps) => {
  const {
    prefixCls,
    strokeWidth,
    showText,
    indeterminate,
    textInside,
    percent,
    nativeColor,
    status,
  } = props;

  const innerContent = useMemo(() => {
    if (indeterminate) {
      return null;
    }
    const innerText = textInside && showText && (
      <span className={`${prefixCls}__innerText`}>{percent}%</span>
    );

    return (
      <div
        className={classnames({
          [`${prefixCls}__inner`]: true,
        })}
        style={{ width: `${percent}%`, background: nativeColor }}
      >
        {innerText}
      </div>
    );
  }, [indeterminate, textInside, percent, nativeColor]);

  const indeterminateContent = useMemo(() => {
    if (!indeterminate) {
      return;
    }

    const firstClass = classnames({
      [`${prefixCls}__inner`]: true,
      [`${prefixCls}__inner--indeterminate1`]: true,
    });

    const secondClass = classnames({
      [`${prefixCls}__inner`]: true,
      [`${prefixCls}__inner--indeterminate2`]: true,
    });

    return (
      <React.Fragment>
        <div className={firstClass} style={{ background: nativeColor }} />
        <div className={secondClass} style={{ background: nativeColor }} />
      </React.Fragment>
    );
  }, [indeterminate, nativeColor]);

  const iconContent = useMemo(() => {
    if (status) {
      if (status === 'success') {
        if (percent !== undefined) {
          if (percent >= 100) {
            return (
              <Icon color="success" fontSize={16}>
                <AiFillCheckCircle />
              </Icon>
            );
          }
          return `${percent}%`;
        }
      }
      if (status === 'error') {
        return (
          <Icon color="danger" fontSize={16}>
            <AiFillCloseCircle />
          </Icon>
        );
      }
    }
    return null;
  }, [status, percent]);

  const textContent = useMemo(() => {
    if (textInside || !showText || indeterminate) {
      return null;
    }
    return <span className={`${prefixCls}__text`}>{iconContent || `${percent}%`}</span>;
  }, [textInside, showText, indeterminate, percent, status]);

  const classString = classnames({
    [`${prefixCls}__bar`]: true,
    [`${prefixCls}__bar--hideText`]: !showText || indeterminate,
  });

  return (
    <React.Fragment>
      <div className={classString}>
        <div className={`${prefixCls}__outer`} style={{ height: strokeWidth }}>
          {innerContent}
          {indeterminateContent}
        </div>
      </div>
      {textContent}
    </React.Fragment>
  );
};

export default memo(ProgressLine);
