import { io } from 'socket.io-client';

const URL = process.env.SERVER_URL || "localhost:3000";

export const socket = io(URL);
