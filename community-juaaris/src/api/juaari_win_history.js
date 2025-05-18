import { query } from "./db";

export const getJuaariWinHistoryForMatch = async (matchId) => {
  const sql = `
    SELECT * FROM new_juaari_win_history
    WHERE match_id = $1
  `;
  return query(sql, [matchId]);
};
