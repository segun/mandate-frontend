import { io, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const SOCKET_URL = API_URL.replace(/\/api\/?$/, '');

export type ChatSocket = Socket;

let socket: ChatSocket | null = null;

export function getChatSocket(accessToken: string): ChatSocket | null {
  if (socket) {
    socket.auth = { token: accessToken };    
    if (!socket.connected) {
      socket.connect();
    }
    return socket;
  }
  socket = io(`${SOCKET_URL}/chats`, {
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

export function disconnectChatSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}