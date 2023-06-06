import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import UploadList from './upload-list';
import UploadDragger from './upload-dragger';
import { useState } from '../../hooks';
import { UploadProps } from './typing';

const Upload = (props: UploadProps) => {
  const {
    prefixCls = 'k-upload',
    className,
    dragger,
    multiple,
    name = 'file',
    disabled,
    children,
    accept,
    listType = 'text',
    uploadingText = '上传中...',
    defaultFileList,
    fileList,
    showUploadList = true,
  } = props;
  const [state, setState] = useState({
    fileList: fileList || defaultFileList || [],
  });
  const file = useRef<any>(null);

  useEffect(() => {
    if ('fileList' in props) {
      setState({
        fileList,
      });
    }
  }, [fileList]);

  const onClick = useCallback(
    (e) => {
      if (disabled) {
        return;
      }
      file.current.value = null;
      file.current.click();
    },
    [disabled],
  );

  const onFileChange = useCallback((e) => {
    let files = e.target.files;
  }, []);

  const renderFileList = () => {
    const { fileList } = state;
    if (!showUploadList) {
      return null;
    }

    return <UploadList prefixCls={prefixCls} listType={listType} fileList={fileList} uploadingText={uploadingText} />;
  };

  const acceptValue = useMemo(() => {
    if (accept) {
      return accept
        .split(',')
        .filter((value, index) => index % 2 === 0)
        .join(',');
    }
    return '';
  }, [accept]);

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}-${listType}`]: listType,
      [`${prefixCls}--disabled`]: disabled,
    },
    className,
  );

  const renderSelect = () => {
    return (
      <div className={classString} onClick={onClick}>
        {dragger ? <UploadDragger prefixCls={prefixCls} children={children} /> : <span>{children}</span>}
        <label>
          <input
            ref={file}
            type="file"
            multiple={multiple}
            name={name}
            className={`${prefixCls}__file`}
            accept={acceptValue}
            onChange={onFileChange}
          />
        </label>
      </div>
    );
  };

  return (
    <div className={`${prefixCls}-wrapper`}>
      {listType != 'picture-card' || dragger ? renderSelect() : null}
      {renderFileList()}
      {listType == 'picture-card' && !dragger ? renderSelect() : null}
    </div>
  );
};

export default memo(Upload);
