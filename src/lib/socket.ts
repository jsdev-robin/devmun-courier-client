import { io, type Socket } from 'socket.io-client';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.devmun.xyz'
    : 'http://localhost:8080';

export const createSocket = (namespace: string): Socket =>
  io(`${BASE_URL}/${namespace}`, {
    withCredentials: true,
    autoConnect: true,
  });
