import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import socketIOClient from 'socket.io-client';

const ENDPOINT = '/';

function Lobby() {
  const [response, setResponse] = useState('');
  const history = useHistory();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);
  console.log('CHECKING FOR PATHNAME', history.location.pathname);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default Lobby;
