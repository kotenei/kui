import React, { memo } from 'react';
import classnames from 'classnames';
import {
  AiOutlineClose,
  AiOutlineFile,
  AiOutlineEye,
  AiOutlineDelete,
  AiOutlineLoading,
} from 'react-icons/ai';

import { Icon } from '../icon';
import { Progress } from '../progress';
import { UploadListProps } from './typing';

const UploadList = (props: UploadListProps) => {
  const { listType, fileList, uploadingText } = props;
  const prefixCls = `${props.prefixCls}-list`;

  const classString = classnames({
    [prefixCls]: true,
    [`${prefixCls}-${listType}`]: !!listType,
  });

  const renderFileList = () => {
    if (!fileList || !fileList.length) {
      return null;
    }
    return fileList.map((item, index) => {
      return (
        <div
          className={classnames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item--${item.status}`]: !!item.status,
          })}
        >
          <div className={`${prefixCls}-item__info`}>
            {listType === 'text' && (
              <span className={`${prefixCls}-item__textIcon`}>
                {item.status === 'uploading' ? (
                  <Icon spin>
                    <AiOutlineLoading />
                  </Icon>
                ) : (
                  <AiOutlineFile />
                )}
              </span>
            )}

            {listType !== 'text' && (
              <span className={`${prefixCls}-item__textIcon`}>
                {item.url ? (
                  <a className={`${prefixCls}-item__thumb`} href={item.url} target='__blank'>
                    <img src={item.thumbUrl} />
                  </a>
                ) : (
                  <AiOutlineFile />
                )}
              </span>
            )}
            {listType === 'picture-card' && (
              <span className={`${prefixCls}-item__action`}>
                {item.url && (
                  <a href={item.url} target="__blank">
                    <AiOutlineEye />
                  </a>
                )}
                <a>
                  <AiOutlineDelete />
                </a>
              </span>
            )}
            <a className={`${prefixCls}-item__text`} href={item.url} target="__blank">
              {item.name}
            </a>
          </div>
          <div className={`${prefixCls}-item__icon`}>
            <AiOutlineClose />
          </div>
          {item.status === 'uploading' && item.percent && item.percent < 100 && (
            <div className={`${prefixCls}-item-progress`}>
              <div className={`${prefixCls}-item-progress__text`}>{uploadingText}</div>
              <Progress percent={item.percent} showText={false} strokeWidth={2} />
            </div>
          )}
        </div>
      );
    });
  };

  return <div className={classString}>{renderFileList()}</div>;
};

export default memo(UploadList);
