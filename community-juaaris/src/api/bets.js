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

export const updateSuccessfulColumnInBetsTable = async (
  matchId,
  winningTeam,
  moreOrLess
) => {
  const sql = `
    UPDATE new_bets
    SET successful = TRUE
    WHERE match_id = $1 AND predicted_winning_team = $2 AND predicted_more_or_less = $3
  `;
  return query(sql, [matchId, winningTeam, moreOrLess]);
};

export const getWinnerIDs = async (matchId) => {
  const sql = `
    SELECT juaari_id FROM new_bets
    WHERE match_id = $1 AND successful = TRUE
  `;
  return query(sql, [matchId]);
};

export const updateNetWinnings = async (
  matchId,
  winnerIds,
  netWinningsPerWinner,
  bet_amount
) => {
  const sql = `
    UPDATE new_juaari_win_history
    SET delta_winnings_this_game = CASE 
        WHEN juaari_id = ANY($2) THEN $3
        ELSE $4
    END
    WHERE match_id = $1
  `;
  return query(sql, [matchId, winnerIds, netWinningsPerWinner, bet_amount]);
};
