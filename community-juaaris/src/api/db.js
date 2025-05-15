import { neon, neonConfig, Pool } from "@neondatabase/serverless";

// In Vite/React applications, environment variables are accessed through import.meta.env
// instead of process.env
let DATABASE_URL;
if (import.meta.env.ENV == "development") {
  // Configuring Neon for local development
  DATABASE_URL = "postgres://postgres:postgres@db.localtest.me:5432/main";
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] =
      host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
    return `${protocol}://${host}:${port}/sql`;
  };
} else if (import.meta.env.ENV == "production") {
  // Connect to Neon in production
  if (!import.meta.env.VITE_DATABASE_URL) {
    console.error("Invalid environment variable, VITE_DATABASE_URL not found");
    process.exit(1);
  }
  DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
} else {
  console.error(
    "Invalid environment variable, ENV must be either development or production"
  );
  console.log("Environment variables:", import.meta.env);
  process.exit(1);
}

let neonConnection = neon(DATABASE_URL);

export const sql = neonConnection;

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
