import React, {  useRef, useEffect } from 'react';

interface outsideClickOption {
  orgRef?: any;
  ignoreList?: string[];
  onClick?: (e) => void;
}

const useOutsideClick = (options: outsideClickOption, deps: any = []) => {
  const ref = options && options.orgRef ? options.orgRef : useRef(null);

  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, deps);

  const onClick = (e) => {
    if (!ref.current) {
      return;
    }
    const elmTarget = e.target as Node;
    const isIgnored =
      options && options.ignoreList && options.ignoreList.length > 0
        ? options.ignoreList.findIndex((item: string) => {
            const elm = document.querySelector(item);
            if (elm && elm.contains(elmTarget)) {
              return true;
            }
            return false;
          })
        : -1;

    if (!ref.current.contains(elmTarget) && isIgnored === -1 && options && options.onClick) {
      options.onClick(e);
    }
  };

  return [ref];
};

export default useOutsideClick;
