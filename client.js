import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

// Confirm connection
socket.on('connect', () => {
    console.log('Successfully connected to the server!');
});
