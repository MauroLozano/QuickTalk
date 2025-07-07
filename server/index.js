import * as http from 'node:http'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { WebSocketServer } from 'ws'

// Database setup
dotenv.config()
const token = process.env.DB_TOKEN;
if (!token) {
    throw new Error("DB_TOKEN is not defined in .env");
}
export const db = createClient({   // Creates a database client using the LibSQL client
    url: "libsql://grateful-man-wolf-maurolozano.aws-us-east-1.turso.io",
    authToken: token || ''  // Uses the DB_TOKEN from the environment variables or an empty string if not set
})
await db.execute(`
    CREATE TABLE IF NOT EXISTS users(
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT UNQIUE NOT NULL,
        userPasswordHash TEXT UNIQUE NOT NULL,
    );
    CREATE TABLE IF NOT EXISTS messages(
        messageId INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
    );
`)//Make sure not to leave comas at the end of the last column definition





//Http server to serve static files
const server = http.createServer(async (req,res)=>{ //Creates the HTTP server and handles requests
    let filePath = req.url === '/' ? '/index.html' : req.url;   // If the request is for the root, serve index.html, otherwise serve the requested file
    
    // Ensure the requested files are in the 'public' directory, or where Webpack outputs the files.
    let fullPath = path.join(process.cwd(),'public', filePath); // Joins the current working directory with the 'public' folder and the requested file path

    try{
        console.log(`Request for ${fullPath}`)   // Logs the requested file
        const data = await fs.readFile(fullPath); // Reads the file from the filesystem
        // Determine the content type based on the file extension
        let ext = path.extname(fullPath);
        let contentType = 'text/html';
        if (ext === '.ico') contentType = 'image/x-icon'
        if (ext === '.js') contentType = 'application/javascript'
        if (ext === '.css') contentType = 'text/css'
        res.writeHead(200, {'Content-Type': contentType})   // Sets the response header with the content type
        res.end(data)   // Sends the file data as the response
    }catch{
        res.writeHead(404,{'Content-Type': 'text/plain'})   // If the file is not found, set the response header to 404
        res.end('File not found')
    }
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

            if (data.type==='clientInfo'){ // Checks if the message type is 'clientInfo'
                
            }

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

