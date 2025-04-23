import { query } from "./db";

export const getBetsForGame = async (matchId) => {
  const sql = `
    SELECT * FROM new_bets
    WHERE match_id = $1
  `;
  return query(sql, [matchId]);
};

export const updateBet = async (betId, team, option) => {
  const sql = `
    UPDATE new_bets
    SET predicted_winning_team = $2, predicted_more_or_less = $3
    WHERE id = $1
  `;
  return query(sql, [betId, team, option]);
};

export const getLargestBetId = async () => {
  const sql = `
    SELECT MAX(id) FROM new_bets
  `;
  return query(sql);
};

export const createBet = async (newBetId, matchId, juaariId, team, option) => {
  const sql = `
    INSERT INTO new_bets (id, match_id, juaari_id, predicted_winning_team, predicted_more_or_less)
    VALUES ($1, $2, $3, $4, $5)
  `;
  return query(sql, [newBetId, matchId, juaariId, team, option]);
};
