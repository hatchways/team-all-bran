import { createContext } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = '/';
const SocketContext = createContext(socketIOClient(ENDPOINT, { path: '/sockets' }));

export default SocketContext;
