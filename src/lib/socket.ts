import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(
  process.env.NODE_ENV === 'production'
    ? 'https://devmun-courier-server-production.up.railway.app'
    : 'http://localhost:8080',
  {
    withCredentials: true,
    autoConnect: true,
  },
);
