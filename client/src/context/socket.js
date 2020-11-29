import { createContext } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
const SocketContext = createContext(socketIOClient(ENDPOINT, { path: '/sockets' }));

export default SocketContext;
