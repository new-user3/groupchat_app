// Connect to the server
const socket = io();
let username;

// Function to send message
function sendMessage() {
    const message = document.getElementById('message').value;
    if (message.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    // Emit 'sendMessage' event to the server along with the username
    socket.emit('sendMessage', { message: message, username: username });

    // Clear input field after sending message
    document.getElementById('message').value = '';
}

// Listen for 'receiveMessage' event
socket.on('receiveMessage', (data) => {
    // Display received message in the chat with username
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    const messageContent = `<div><strong>${data.username}:</strong> ${data.message}</div>`;
    
    if (data.username === username) {
        messageDiv.classList.add('sent-message');
    } else {
        messageDiv.classList.add('received-message');
    }

    messageDiv.innerHTML = messageContent;
    chatMessages.appendChild(messageDiv);
});

// Function to prompt for username
function promptForUsername() {
    username = prompt('Please enter your username:');
    if (!username) {
        alert('You must enter a username to join the chat.');
        promptForUsername();
    }
}

// Call promptForUsername function when the page loads
promptForUsername();
