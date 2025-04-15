import { query } from "./db";
export const getTeamNameById = async (teamId) => {
  const sql = `
    SELECT name FROM new_teams WHERE id = $1
  `;
  const results = await query(sql, [teamId]);
  return results[0].name;
};
