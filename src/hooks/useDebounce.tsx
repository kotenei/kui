import { useRef, useEffect } from 'react';

interface DebounceOption {
  fn?: Function;
  delay?: number;
  deps?: never[];
}

const useDebounce = (options: DebounceOption = { delay: 300, deps: [] }) => {
  const timeout = useRef<number>();
  const { fn, delay, deps } = options;

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = window.setTimeout(() => {
      fn && fn();
    }, delay);
  }, deps);

  const action = (fn: Function) => {
    timeout.current = window.setTimeout(() => {
      fn();
    }, delay);
  };

  const cancel = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  return { action, cancel };
};

export default useDebounce;
