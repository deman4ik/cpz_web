import { useState, useEffect } from 'react';

export const useShowDimension = (width: number, dimension: number) => {
  const [ showDimension, setShowDimension ] = useState(true);
  useEffect(() => {
    setShowDimension(width > dimension);
  }, [ width, dimension ]);

  return { showDimension };
};
