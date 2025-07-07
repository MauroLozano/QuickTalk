const socket = new WebSocket('ws://localhost:3000'); // Creates a new WebSocket connection to the server at ws://localhost:3000
console.log('WebSocket client initialized'); // Log to indicate the client has been initialized

const form = document.getElementById('chat-form');
const input = document.getElementById('input');
const submitBtn = document.getElementById('btn-send')
const messages = document.getElementById('messages')

socket.onopen = ()=>{   // Event handler for when the WebSocket connection is opened
    console.log('Connected to the WebSocket server');
    form.addEventListener('submit', (e)=>{ //Listens when the submit button is activated
        e.preventDefault(); // Prevents the default form submission behavior
        if(input.value){    // Checks if the input field is not empty
            socket.send(JSON.stringify({  // Sends a message to the WebSocket server in a String format, Websockets require messages to be sent as strings or binary data
                type: 'message',
                content: input.value,
            }));
            input.value=''; // Clears the input field after sending the message
        }
    })
}
socket.onmessage = (event)=>{   // Event handler for when a message is received from the WebSocket server
    const msgData = JSON.parse(event.data)
    let msgItem = `<li class="chat-msg">${msgData.content}</li>`;  // Creates a new list item with the received message
    messages.insertAdjacentHTML('beforeend', msgItem); // Inserts the new message into the messages list
}
socket.onerror = (error) => {
    console.error('Error:', error);
};