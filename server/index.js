import * as http from 'node:http'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { WebSocketServer } from 'ws'

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
        res.end('File not found')   // Sends a 'File not found' message
    }
})
server.listen(3000, ()=>{   // Starts the server on port 3000
    console.log('Server listening on 3000')
})

const wss = new WebSocketServer({server})   // Creates a WebSocket server using the HTTP server

wss.on('connection', (ws) =>{   // Handles new WebSocket connections
    console.log('New conection')
    ws.on('close', () => {  // Handles when a WebSocket connection is closed
        console.log('Client disconnected')
    })
})