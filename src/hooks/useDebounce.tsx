import { useRef, useEffect } from 'react';

const useDebounce = (fn, delay = 300, deps = []) => {
  const timeout = useRef<number>();

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = window.setTimeout(() => {
      fn();
    }, delay);
  }, deps);

  const cancel = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  return [cancel];
};

export default useDebounce;
