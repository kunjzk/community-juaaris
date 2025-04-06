import { query } from "./db";

/**
 * Get all bets for a specific match
 * @param {number} matchId - The ID of the match
 * @returns {Promise<Array>} - Array of bet objects
 */
export async function getBetsByMatchId(matchId) {
  const sql = `
    SELECT 
      b.*,
      j.display_name as juaari_name,
      t.name as predicted_team_name,
      m.datetime,
      t1.name as first_team_name,
      t2.name as second_team_name,
      v.name as venue_name
    FROM bets b
    JOIN juaaris j ON b.juaari_id = j.id
    JOIN teams t ON b.predicted_winning_team = t.id
    JOIN matches m ON b.match_id = m.id
    JOIN teams t1 ON m.first_team_id = t1.id
    JOIN teams t2 ON m.second_team_id = t2.id
    JOIN venues v ON m.venue_id = v.id
    WHERE b.match_id = $1
  `;

  return await query(sql, [matchId]);
}

/**
 * Get a specific bet by ID
 * @param {number} betId - The ID of the bet
 * @returns {Promise<Object>} - Bet object
 */
export async function getBetById(betId) {
  const sql = `
    SELECT 
      b.*,
      j.display_name as juaari_name,
      t.name as predicted_team_name,
      m.datetime,
      t1.name as first_team_name,
      t2.name as second_team_name,
      v.name as venue_name
    FROM bets b
    JOIN juaaris j ON b.juaari_id = j.id
    JOIN teams t ON b.predicted_winning_team = t.id
    JOIN matches m ON b.match_id = m.id
    JOIN teams t1 ON m.first_team_id = t1.id
    JOIN teams t2 ON m.second_team_id = t2.id
    JOIN venues v ON m.venue_id = v.id
    WHERE b.id = $1
  `;

  const results = await query(sql, [betId]);
  return results[0];
}

/**
 * Create a new bet
 * @param {Object} betData - The bet data
 * @returns {Promise<Object>} - The created bet
 */
export async function createBet(betData) {
  const {
    match_id,
    juaari_id,
    predicted_winning_team,
    predicted_more_or_less,
    bet_amount,
  } = betData;

  const sql = `
    INSERT INTO bets (
      match_id, 
      juaari_id, 
      predicted_winning_team, 
      predicted_more_or_less, 
      bet_amount
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const results = await query(sql, [
    match_id,
    juaari_id,
    predicted_winning_team,
    predicted_more_or_less,
    bet_amount,
  ]);

  return results[0];
}
