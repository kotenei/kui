import React, {  useRef, useEffect } from 'react';

const useState = (initialState: object) => {
  const [state, set] = React.useState<any>(initialState);
  const callbackRef = useRef<any>(null);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  const setState = (newState, callback?) => {
    set((prevState) => {
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

export default useState;
