import { useState, useRef, useEffect, useCallback } from 'react';

const useStateCallback = initialState => {
  const [state, set] = useState(initialState);
  const callbackRef = useRef<any>(null);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  const setState = (newState, callback?) => {
    set(prevState => {
      return {
        ...prevState,
        ...newState,
      };
    });
    if (typeof callback === 'function') {
      callbackRef.current = callback;
    }
  };

  return [state, setState];
};

export default useStateCallback;
