const ws = new WebSocket('ws://localhost:3000'); // Connect to the WebSocket server  
console.log('WebSocket client initialized'); // Log to indicate the client has been initialized

ws.onopen = () => { // Event handler for when the WebSocket connection is opened
    console.log('Connected to the WebSocket server');
};