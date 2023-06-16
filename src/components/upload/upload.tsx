import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';

import httpRequest from './ajax';
import UploadList from './upload-list';
import UploadDragger from './upload-dragger';
import { useState } from '../../hooks';
import { UploadProps } from './typing';
import { uuid } from '../../utils';

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
    beforeUpload,
    onChange,
  } = props;
  const [state, setState] = useState({
    fileList: fileList || defaultFileList || [],
  });
  const file = useRef<any>(null);
  const tmpFileList = useRef<any>([]);
  const reqs = useRef<any>({});

  useEffect(() => {
    if ('fileList' in props) {
      setState({
        fileList,
      });
    }
  }, [fileList]);

  const onClick = (e) => {
    if (disabled) {
      return;
    }
    file.current.value = null;
    file.current.click();
  };

  const onFileChange = (e) => {
    const files = e.target.files;
    upload(files);
  };

  const onDrop = (e) => {
    const files = e.dataTransfer.files;
    upload(files);
  };

  const onRemove = (file) => {
    const newFileList = tmpFileList.current.filter((item) => item.id !== file.id);
    tmpFileList.current = newFileList;
    if (reqs.current[file.id]) {
      reqs.current[file.id].abort();
      delete reqs.current[file.id];
    }

    if (!('fileList' in props)) {
      setState({
        fileList: newFileList,
      });
    }

    if (props.onRemove) {
      props.onRemove(file);
    }

    if (onChange) {
      onChange({ file: file, fileList: newFileList });
    }
  };

  const upload = (files) => {
    const uploadFiles = getUploadFiles(files);

    if (!uploadFiles || uploadFiles.length === 0) {
      return;
    }

    tmpFileList.current = [...state.fileList];

    uploadFiles.forEach((uploadFile) => {
      const before = beforeUpload ? beforeUpload(uploadFile, uploadFiles) : true;
      if (before) {
        tmpFileList.current.push(uploadFile);
        post(uploadFile);
      }
    });
  };

  const getUploadFiles = (files) => {
    const uploadFiles: any = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadFile = {
        id: uuid(),
        name: file.name,
        lastModified: file.lastModified,
        originFileObj: file,
        size: file.size,
        type: file.type,
        percent: 0,
      };
      uploadFiles.push(uploadFile);
      if (!multiple) {
        break;
      }
    }
    return uploadFiles;
  };

  const post = (file) => {
    const { action, headers, data, withCredentials, name } = props;
    file.status = 'uploading';
    const httpRequestOptions: any = {
      action,
      headers,
      data,
      withCredentials,
      file: file.originFileObj,
      filename: name,
      onError: (e: ProgressEvent) => {
        file.status = 'error';
        file.error = String(e);
        onUploadChange(file);
      },
      onSuccess: () => {
        file.status = 'success';
        onUploadChange(file);
      },
      onProgress: (e: ProgressEvent) => {
        if (e.lengthComputable) {
          file.percent = (e.loaded / e.total) * 100;
          onUploadChange(file);
        }
      },
    };
    reqs.current[file.id] = httpRequest(httpRequestOptions);
  };

  const onUploadChange = (file) => {
    const newFileList = [...tmpFileList.current];
    if (!('fileList' in props)) {
      setState({
        fileList: newFileList,
      });
    }
    onChange && onChange({ file, fileList: newFileList });
  };

  const renderFileList = () => {
    const { fileList } = state;
    if (!showUploadList) {
      return null;
    }

    return (
      <UploadList
        prefixCls={prefixCls}
        listType={listType}
        fileList={fileList}
        uploadingText={uploadingText}
        onRemove={onRemove}
      />
    );
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
        {dragger ? (
          <UploadDragger prefixCls={prefixCls} children={children} onDrop={onDrop} />
        ) : (
          <span>{children}</span>
        )}
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
