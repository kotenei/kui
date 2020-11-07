import React, { memo } from 'react';
import classnames from 'classnames';

import { ProgressCircleProps } from './typing';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Icon } from '../icon';

const ProgressCircle = (props: ProgressCircleProps) => {
  const { prefixCls, width, status, percent, text, nativeColor, strokeWidth } = props;

  const getFontSize = () => {
    return (width || 0) * 0.16 + 6;
  };

  const relativeStrokeWidth = () => {
    return strokeWidth !== undefined && width !== undefined
      ? ((strokeWidth / width) * 100).toFixed(1)
      : '0';
  };

  const trackPath = () => {
    const sw = relativeStrokeWidth();
    const radius = parseInt(String(50 - parseFloat(sw) / 2), 10);
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius *
      2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
  };

  const circlePathStyle = () => {
    const pm = perimeter();
    return {
      strokeDasharray: `${pm}px,${pm}px`,
      strokeDashoffset: (1 - (percent || 0) / 100) * pm + 'px',
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
      stroke: nativeColor,
    };
  };

  const perimeter = () => {
    const sw = relativeStrokeWidth();
    const radius = 50 - parseFloat(sw) / 2;
    return 2 * Math.PI * radius;
  };

  const renderIconContent = () => {
    const fontSize = getFontSize();
    const tmpPercent = percent || 0;

    if (status) {
      if (status === 'success') {
        if (tmpPercent >= 100) {
          return (
            <Icon color="success" fontSize={fontSize}>
              <AiOutlineCheck />
            </Icon>
          );
        }
        return `${tmpPercent}%`;
      }
      if (status === 'error') {
        return (
          <Icon fontSize={fontSize} color="danger">
            <AiOutlineClose />
          </Icon>
        );
      }
    }
    return null;
  };

  const _d = trackPath();
  const _circlePathStyle = circlePathStyle();
  const _fontSize = getFontSize();
  const _strokeWidth = relativeStrokeWidth();

  return (
    <div className={`${prefixCls}__circle`} style={{ width, height: width, fontSize: _fontSize }}>
      <svg viewBox="0 0 100 100">
        <path className={`${prefixCls}__track`} d={_d} fill="none" strokeWidth={_strokeWidth} />
        <path
          className={classnames({
            [`${prefixCls}__path`]: true,
            [`${prefixCls}__path--success`]: status === 'success',
            [`${prefixCls}__path--danger`]: status === 'error',
          })}
          d={_d}
          strokeLinecap="round"
          fill="none"
          strokeWidth={strokeWidth}
          style={_circlePathStyle}
        />
      </svg>
      <div className={`${prefixCls}__text`}>{renderIconContent() || text || `${percent}%`}</div>
    </div>
  );
};

export default memo(ProgressCircle);
