export interface RequestOption {
  action: string;
  data: Object;
  file: File;
  filename: string;
  headers: Object;
  withCredentials: boolean;
  onError: (e: ProgressEvent) => void;
  onProgress: (e: ProgressEvent) => void;
  onSuccess: (e) => void;
}

export default function httpRequest(option: RequestOption) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open('post', option.action, true);

  option.withCredentials && 'withCredentials' in xhr && (xhr.withCredentials = true);
  const headers = option.headers || {};
  for (const item in headers) {
    headers.hasOwnProperty(item) &&
      headers[item] !== null &&
      xhr.setRequestHeader(item, headers[item]);
  }

  const formData: FormData = new FormData();
  option.data &&
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key]);
    });
  formData.append(option.filename, option.file, option.file.name);

  xhr.onerror = (e: ProgressEvent) => {
    option.onError(e);
  };

  xhr.onload = (res) => {
    if (xhr.status < 200 || xhr.status >= 300) {
      option.onError(res);
    } else {
      option.onSuccess(res);
    }
  };

  xhr.upload &&
    (xhr.upload.onprogress = (e: ProgressEvent) => {
      option.onProgress(e);
    });

  xhr.send(formData);
  return xhr;
}
