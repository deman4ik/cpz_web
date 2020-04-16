import React, { useRef, useEffect } from 'react';

interface Props {
  message: string;
}

export const NotificationNode: React.FC<Props> = ({ message }) => {
  const refDiv = useRef(null);
  useEffect(() => {
    refDiv.current.innerHTML = message.replace(/(\r\n|\n|\r)/gm, '<br />');
  }, [ message ]);
  return (
    <div ref={refDiv} />
  );
};
