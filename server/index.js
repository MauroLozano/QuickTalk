import * as http from 'node:http'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import db from './db.js' // Importing the database connection
import { WebSocketServer } from 'ws'
import { registerUser } from './auth.js' // Importing the registerUser function from auth.js, if needed
import { serveStaticFiles } from './static.js' // Importing the serveStaticFiles function to serve static files

//HTTP server to serve static files and handle API requests

const server = http.createServer(async (req,res)=>{ //Creates the HTTP server and handles requests
    // Authentication API endpoints
    if(req.url === '/api/register' && req.method === 'POST'){
        return registerUser(req,res);
    }
    //Serve static files from the 'public' directory
    return serveStaticFiles(req,res);
})
server.listen(3000, ()=>{   // Starts the server on port 3000
    console.log('Server listening on 3000')
})

// WebSocket server to handle real-time communication and modify the database
const wss = new WebSocketServer({server})   // Creates a WebSocket server using the HTTP server
wss.on('connection', (socket) =>{   // Handles new WebSocket connections
    console.log('New conection')
    socket.on('close', () => {  // Handles when a WebSocket connection is closed
        console.log('Client disconnected')
    })
    socket.on('message', async (msg) => { // Handles when a Websocket recives a message
        try{
            const data = JSON.parse(msg);   // Parses the incoming stringified message as JSON

            if (data.type==='message'){ // Checks if the message type is 'message'
                // Executes a SQL query to insert the message into the database
                const result = await db.execute({
                    sql: `INSERT INTO messages (content) VALUES (:content)`,
                    args: {content: data.content}  // Uses the content from the parsed message to insert into the database
                })
                if (!result.lastInsertRowid) {  // Checks if the last inserted row ID is not present, indicating an error in insertion
                    console.error("Could not insert message into the database");
                    return;
                }
                data.id = result.lastInsertRowid.toString();  // Adds the last inserted row ID to the data object, converting it to a string

                // Sends the message to all connected WebSocket clients as a JSON string
                wss.clients.forEach((client)=>{
                    client.send(JSON.stringify(data))
                })
            }else{
                console.log('Unknown message type:', data.type);  // Logs an error if the message type is unknown
            }
        }catch{
            console.log('Error parsing message:', msg);  // Logs an error if the message cannot be parsed
        }

    });
})
