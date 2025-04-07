import { query } from "./db";

export async function getAllMatches() {
  const sql = `
    SELECT m.*, 
           t1.name as first_team_name,
           t2.name as second_team_name,
           v.name as venue_name
    FROM matches m
    JOIN teams t1 ON m.first_team_id = t1.id
    JOIN teams t2 ON m.second_team_id = t2.id
    JOIN venues v ON m.venue_id = v.id
    ORDER BY m.datetime DESC
  `;

  return query(sql);
}

export async function getMatchById(id) {
  const sql = `
    SELECT m.*, 
           t1.name as first_team_name,
           t2.name as second_team_name,
           v.name as venue_name
    FROM matches m
    JOIN teams t1 ON m.first_team_id = t1.id
    JOIN teams t2 ON m.second_team_id = t2.id
    JOIN venues v ON m.venue_id = v.id
    WHERE m.id = $1
  `;

  const results = await query(sql, [id]);
  return results[0];
}

export async function getMatchesByDateRange(startDate, endDate) {
  // Debug: Log the date parameters
  console.log("Date range parameters:", {
    startDate: startDate instanceof Date ? startDate.toISOString() : startDate,
    endDate: endDate instanceof Date ? endDate.toISOString() : endDate,
  });

  // Format dates to ensure we include the entire end date
  // We set the end date to 23:59:59.999 to include all matches on that day
  const formattedEndDate = new Date(endDate);
  formattedEndDate.setHours(23, 59, 59, 999);

  // Debug: Log the formatted end date
  console.log("Formatted end date:", formattedEndDate.toISOString());

  const sql = `
    SELECT 
      m.*,
      t1.name as first_team_name,
      t2.name as second_team_name,
      v.name as venue_name
    FROM matches m
    JOIN teams t1 ON m.first_team_id = t1.id
    JOIN teams t2 ON m.second_team_id = t2.id
    JOIN venues v ON m.venue_id = v.id
    WHERE m.datetime >= $1 AND m.datetime <= $2
    ORDER BY m.datetime ASC
  `;

  const results = await query(sql, [startDate, formattedEndDate]);

  // Debug: Log the query results
  console.log("Query results:", results);

  return results;
}
