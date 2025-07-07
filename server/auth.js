import bcrypt from "bcryptjs";
const saltRounds = 10 // Number of rounds for bcrypt hashing
import db from './db.js' // Importing the database connection

export async function registerUser(req, res) {
    let body = '';
    req.on('data', (chunk) => { body += chunk})  // Collects data chunks from the request and appends them to the body variable
    req.on('end', async ()=>{   // When the request ends, this function is called
        try{
            body = JSON.parse(body);   // Parses the collected body data as JSON
            const resultUsername = await db.execute({
                sql: `SELECT * FROM users WHERE userName = :userName`,    // Executes a SQL query to check if the user already exists in the database
                args: {userName: body.userName}  // Uses the userName from the parsed body to check if the user already exists
            })
            if(resultUsername.rows.length > 0){
                res.writeHead(400,{'Content-Type':'text/plain'}) // If the user already exists, sends a 400 Bad Request response
                res.end('User already exists')  // Ends the response with an error message
                return;  // Exits the function to prevent further processing
            }else{
                const userPasswordHash = await bcrypt.hash(body.password, saltRounds); // Hashes the password using bcrypt with the specified number of salt rounds
                const resultRegistration = await db.execute({
                    sql: `INSERT INTO users (userName, userPasswordHash) VALUES (:userName, :userPasswordHash)`, // Executes a SQL query to insert the new user into the database
                    args: { userName: body.userName, userPasswordHash: userPasswordHash}
                })
                res.writeHead(201, {'Content-Type':'application/json'}) // If the registration is successful, sends a 201 Created response
                return res.end(JSON.stringify({  // Ends the response with the user ID and userName in JSON format
                    userId: resultRegistration.lastInsertRowid.toString(),  // Converts the last inserted row ID to a string, since SQLite returns it as a BigInt
                    userName: body.userName,
                    register: true  // Indicates that the registration was successful
                }))
            }
        }catch(err){
            console.error('Error during registration:', err);  // Logs an error if there is an issue during registration
        }

    })
    return;  // Exits the function to prevent further processing
}
