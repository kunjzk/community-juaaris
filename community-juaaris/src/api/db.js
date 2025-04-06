import { neon } from "@neondatabase/serverless";

// In Vite/React applications, environment variables are accessed through import.meta.env
// instead of process.env
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

// Debug: Print all environment variables
console.log("Environment variables:", import.meta.env);
console.log("DATABASE_URL:", DATABASE_URL);

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
}

// Create a connection to the database
const sql = neon(DATABASE_URL);

// Helper function to execute queries
export async function query(sqlQuery, params = []) {
  try {
    // Use the sql.query method for parameterized queries
    const result = await sql.query(sqlQuery, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
