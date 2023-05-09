import { useState, useLayoutEffect } from 'react';

function useGetWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    let timeoutId;
    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 100);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default useGetWidth;
