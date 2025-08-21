import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(
  process.env.NODE_ENV === 'production'
    ? 'https://courier-api.devmun.xyz'
    : 'http://localhost:8080',
  {
    withCredentials: true,
  },
);
