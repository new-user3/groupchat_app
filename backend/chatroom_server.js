const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Define a route for the root URL ("/") and serve the 'chatroom.html' file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'chatroom.html'));
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle sendMessage event
    socket.on('sendMessage', (data) => {
        // Broadcast the received message to all connected clients along with the username
        io.emit('receiveMessage', { message: data.message, username: data.username });
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
