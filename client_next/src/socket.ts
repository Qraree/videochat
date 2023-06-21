import { io } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SERVER_URL || "localhost:2000";

export const socket = io(URL, {transports: ["websocket"]});
