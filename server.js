import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create a Server
import { createServer } from 'http';
import { Server } from 'socket.io';


const PORT = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname)); // Used to serve static files

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on('chat_message', (msg) => {
        console.log(`Message from ${socket.id}: ${msg}`);
        io.emit('chat_message', msg); // Broadcast the message to all clients
    }
    );
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
