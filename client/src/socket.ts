import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SERVER_URL || "localhost:2000";

export const socket = io(URL);
