import { neon, neonConfig, Pool } from "@neondatabase/serverless";

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

// // Configuring Neon for local development
// if (process.env.NODE_ENV === "development") {
//   connectionString = "postgres://postgres:postgres@db.localtest.me:5432/main";
//   neonConfig.fetchEndpoint = (host) => {
//     const [protocol, port] =
//       host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
//     return `${protocol}://${host}:${port}/sql`;
//   };
//   const connectionStringUrl = new URL(connectionString);
//   neonConfig.useSecureWebSocket =
//     connectionStringUrl.hostname !== "db.localtest.me";
//   neonConfig.wsProxy = (host) =>
//     host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`;
// }
// neonConfig.webSocketConstructor = ws;

// // Neon supports both HTTP and WebSocket clients. Choose the one that fits your needs:

// // HTTP Client (sql)
// // - Best for serverless functions and Lambda environments
// // - Ideal for stateless operations and quick queries
// // - Lower overhead for single queries
// // - Better for applications with sporadic database access
// export const sql = neon(connectionString);

// // WebSocket Client (pool)
// // - Best for long-running applications (like servers)
// // - Maintains a persistent connection
// // - More efficient for multiple sequential queries
// // - Better for high-frequency database operations
// export const pool = new Pool({ connectionString });
