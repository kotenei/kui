import React, { useEffect, useState, useRef } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: null, y: null });

  useEffect(() => {
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const onMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return position;
};

export default useMousePosition;
