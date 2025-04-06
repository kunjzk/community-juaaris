import { query } from "./db";

export async function getJuaaris() {
  const sql = `
    SELECT * FROM juaaris
    ORDER BY display_name
  `;

  return query(sql);
}

export async function getJuaariWinHistory(juaariId) {
  const sql = `
    SELECT wh.*, 
           m.datetime as match_datetime,
           t1.name as first_team_name,
           t2.name as second_team_name
    FROM juaari_win_history wh
    JOIN matches m ON wh.match_id = m.id
    JOIN teams t1 ON m.first_team_id = t1.id
    JOIN teams t2 ON m.second_team_id = t2.id
    WHERE wh.juaari_id = $1
    ORDER BY wh.date DESC
  `;

  return query(sql, [juaariId]);
}
