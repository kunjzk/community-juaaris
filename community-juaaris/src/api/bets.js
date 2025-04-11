import { query } from "./db";

export const getBetsForGame = async (matchId) => {
  const sql = `
    SELECT * FROM bets
    WHERE match_id = $1
  `;
  return query(sql, [matchId]);
};
