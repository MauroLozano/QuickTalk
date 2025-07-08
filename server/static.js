
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

export async function serveStaticFiles(req, res) {
    let filePath = req.url === '/' ? '/index.html' : req.url;   // If the request is for the root, serve index.html, otherwise serve the requested file
    // Ensure the requested files are in the 'public' directory, or where Webpack outputs the files.
    let fullPath = path.join(process.cwd(),'public', filePath); // Joins the current working directory with the 'public' folder and the requested file path
    try{
        const data = await fs.readFile(fullPath); // Reads the file from the filesystem
        // Determine the content type based on the file extension
        let ext = path.extname(fullPath);
        let contentType = 'text/html';
        if (ext === '.ico') contentType = 'image/x-icon'
        if (ext === '.js') contentType = 'application/javascript'
        if (ext === '.css') contentType = 'text/css'
        res.writeHead(200, {'Content-Type': contentType})   // Sets the response header with the content type
        return res.end(data)   // Sends the file data as the response
    }catch{
        res.writeHead(404,{'Content-Type': 'text/plain'})   // If the file is not found, set the response header to 404
        return res.end('File not found')
    }
}
