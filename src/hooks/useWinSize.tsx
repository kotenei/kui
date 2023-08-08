import React, { useEffect } from 'react';

const useWinSize = () => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return size;
};

export default useWinSize;
