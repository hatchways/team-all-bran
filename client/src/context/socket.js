import { createContext } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = '/';
const SocketContext = createContext(socketIOClient(ENDPOINT));

export default SocketContext;
