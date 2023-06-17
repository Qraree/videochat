import { io } from 'socket.io-client';

// const URL = process.env.SERVER_URL || "localhost:5000";
const URL = "localhost:5000";

export const socket = io(URL);
