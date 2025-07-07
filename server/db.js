import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

// Database setup
dotenv.config()
const token = process.env.DB_TOKEN;
if (!token) {
    throw new Error("DB_TOKEN is not defined in .env");
}
const db = createClient({   // Creates a database client using the LibSQL client
    url: "libsql://grateful-man-wolf-maurolozano.aws-us-east-1.turso.io",
    authToken: token || ''  // Uses the DB_TOKEN from the environment variables or an empty string if not set
})
await db.execute(`
    CREATE TABLE IF NOT EXISTS users(
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT UNIQUE NOT NULL,
        userPasswordHash TEXT UNIQUE NOT NULL
    );
`)
await db.execute(`
    CREATE TABLE IF NOT EXISTS messages(
        messageId INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
    );
`)//Make sure not to leave comas at the end of the last column definition

export default db;  // Exports the database client for use in other modules