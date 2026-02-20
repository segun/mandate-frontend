import { io, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const SOCKET_URL = API_URL.replace(/\/api\/?$/, '');

export type ElectionResultsSocket = Socket;

let socket: ElectionResultsSocket | null = null;

export function getElectionResultsSocket(accessToken: string): ElectionResultsSocket {
  if (socket) {
    socket.auth = { token: accessToken };
    if (!socket.connected) {
      socket.connect();
    }
    return socket;
  }

  socket = io(`${SOCKET_URL}/election-results`, {
    auth: { token: accessToken },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });

  return socket;
}

export function disconnectElectionResultsSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
