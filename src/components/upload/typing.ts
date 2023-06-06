export type UploadFileStatus = 'error' | 'success' | 'uploading';

interface HttpRequestHeader {
  [key: string]: string;
}

interface UploadChangeParam {
  file: UploadFile;
  fileList: UploadFile[];
}

export interface UploadFile {
  id?: string;
  name?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  percent?: number;
  originFileObj?: File;
  size?: number;
  status?: UploadFileStatus;
  type?: string;
  url?: string;
  thumbUrl?: string;
}

export type UploadListType = 'text' | 'picture' | 'picture-card';

export interface UploadProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  name?: string;
  action?: string;
  defaultFileList?: UploadFile[];
  fileList?: UploadFile[];
  listType?: UploadListType;
  data?: object;
  dragger?: boolean;
  headers?: HttpRequestHeader;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  withCredentials?: boolean;
  showUploadList?: boolean;
  uploadingText?: string;
  beforeUpload?: (file: UploadFile, files: UploadFile[]) => boolean;
  onChange?: (info: UploadChangeParam) => void;
  onRemove?: (file: UploadFile) => void | boolean;
}

export interface UploadListProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  listType?: UploadListType;
  fileList?: UploadFile[];
  uploadingText?: string;
}

export interface UploadDraggerProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {}
