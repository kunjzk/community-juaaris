import { query } from "./db";

export const getBetsForGame = async (matchId) => {
  const sql = `
    SELECT * FROM new_bets
    WHERE match_id = $1
  `;
  return query(sql, [matchId]);
};

// Add a debug function to check bet status
export const checkBetsStatus = async (matchId) => {
  const sql = `
    SELECT id, juaari_id, predicted_winning_team, predicted_more_or_less, successful
    FROM new_bets
    WHERE match_id = $1
    ORDER BY juaari_id
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
  console.log(`DEBUG: Updating bets for match ${matchId}`);
  console.log(`DEBUG: Winning team: ${winningTeam}`);
  console.log(`DEBUG: More or Less: ${moreOrLess}`);

  // Check bets before update
  console.log(`DEBUG: Bets before update:`);
  const beforeBets = await checkBetsStatus(matchId);
  console.log(beforeBets);

  const sql = `
    UPDATE new_bets
    SET successful = CASE
      WHEN predicted_winning_team = $2 AND predicted_more_or_less = $3 THEN TRUE
      ELSE FALSE
    END
    WHERE match_id = $1
  `;
  console.log(`DEBUG: SQL: ${sql}`);
  console.log(`DEBUG: Parameters: [${matchId}, ${winningTeam}, ${moreOrLess}]`);

  const result = await query(sql, [matchId, winningTeam, moreOrLess]);
  console.log(`DEBUG: Update result:`, result);

  // Check bets after update
  console.log(`DEBUG: Bets after update:`);
  const afterBets = await checkBetsStatus(matchId);
  console.log(afterBets);

  return result;
};

export const getWinnerIDs = async (matchId) => {
  const sql = `
    SELECT juaari_id FROM new_bets
    WHERE match_id = $1 AND successful = TRUE
  `;
  return query(sql, [matchId]);
};

export const getWinnerNamesAndWinnings = async (matchId) => {
  const sql = `
    SELECT new_juaaris.id, new_juaaris.display_name
    FROM new_bets
    JOIN new_juaaris ON new_bets.juaari_id = new_juaaris.id
    WHERE new_bets.match_id = $1 AND new_bets.successful = TRUE
  `;
  const result = await query(sql, [matchId]);
  // console.log("Result:", result);
  return result;
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
        WHEN juaari_id = ANY($2) THEN $3::DECIMAL(10,2)
        ELSE ($4 * -1)::DECIMAL(10,2)
    END
    WHERE match_id = $1
  `;
  return query(sql, [matchId, winnerIds, netWinningsPerWinner, bet_amount]);
};

export const allBetsUnsuccessful = async (matchId) => {
  const sql = `
    UPDATE new_bets
    SET successful = FALSE
    WHERE match_id = $1
  `;
  return query(sql, [matchId]);
};

export const insertBetIntoJuaariWinHistory = async (
  betId,
  matchId,
  juaariId
) => {
  const sql = `
    INSERT INTO new_juaari_win_history (juaari_id, match_id, bet_id)
    VALUES ($1, $2, $3)
  `;
  return query(sql, [juaariId, matchId, betId]);
};

export const updateSuccessfulColumnInBetsTableForInvalid = async (
  matchId,
  winningTeam
) => {
  console.log(`DEBUG (INVALID): Updating bets for match ${matchId}`);
  console.log(`DEBUG (INVALID): Winning team: ${winningTeam}`);

  // Check bets before update
  console.log(`DEBUG (INVALID): Bets before update:`);
  const beforeBets = await checkBetsStatus(matchId);
  console.log(beforeBets);

  const sql = `
    UPDATE new_bets
    SET successful = (predicted_winning_team = $2)
    WHERE match_id = $1
  `;
  console.log(`DEBUG (INVALID): SQL: ${sql}`);
  console.log(`DEBUG (INVALID): Parameters: [${matchId}, ${winningTeam}]`);

  const result = await query(sql, [matchId, winningTeam]);
  console.log(`DEBUG (INVALID): Update result:`, result);

  // Check bets after update
  console.log(`DEBUG (INVALID): Bets after update:`);
  const afterBets = await checkBetsStatus(matchId);
  console.log(afterBets);

  return result;
};

export const checkNullSuccessfulBets = async (matchId) => {
  const sql = `
    SELECT id, juaari_id, predicted_winning_team, predicted_more_or_less, successful
    FROM new_bets
    WHERE match_id = $1 AND successful IS NULL
  `;
  return query(sql, [matchId]);
};

export const setNonWinnersToFalse = async (
  matchId,
  winningTeam,
  moreOrLess
) => {
  console.log(`DEBUG: Setting non-winners to FALSE for match ${matchId}`);
  console.log(`DEBUG: Winning team: ${winningTeam}`);
  console.log(`DEBUG: More or Less: ${moreOrLess}`);

  const sql = `
    UPDATE new_bets
    SET successful = FALSE
    WHERE match_id = $1 
    AND (predicted_winning_team != $2 OR predicted_more_or_less != $3)
  `;
  console.log(`DEBUG: SQL: ${sql}`);
  console.log(`DEBUG: Parameters: [${matchId}, ${winningTeam}, ${moreOrLess}]`);

  const result = await query(sql, [matchId, winningTeam, moreOrLess]);
  console.log(`DEBUG: Update result:`, result);

  return result;
};

export const setNonWinnersToFalseForInvalid = async (matchId, winningTeam) => {
  console.log(
    `DEBUG (INVALID): Setting non-winners to FALSE for match ${matchId}`
  );
  console.log(`DEBUG (INVALID): Winning team: ${winningTeam}`);

  const sql = `
    UPDATE new_bets
    SET successful = FALSE
    WHERE match_id = $1 
    AND predicted_winning_team != $2
  `;
  console.log(`DEBUG (INVALID): SQL: ${sql}`);
  console.log(`DEBUG (INVALID): Parameters: [${matchId}, ${winningTeam}]`);

  const result = await query(sql, [matchId, winningTeam]);
  console.log(`DEBUG (INVALID): Update result:`, result);

  return result;
};

// Create a default bet for a juaari
export const createDefaultBet = async (
  newBetId,
  matchId,
  juaariId,
  team,
  option
) => {
  const sql = `
    INSERT INTO new_bets (id, match_id, juaari_id, predicted_winning_team, predicted_more_or_less, default_bet)
    VALUES ($1, $2, $3, $4, $5, TRUE)
  `;
  return query(sql, [newBetId, matchId, juaariId, team, option]);
};

// Decrement defaults_remaining for a juaari
export const decrementDefaultsRemaining = async (juaariId) => {
  const sql = `
    UPDATE new_juaaris 
    SET defaults_remaining = defaults_remaining - 1
    WHERE id = $1 AND defaults_remaining > 0
    RETURNING defaults_remaining
  `;
  return query(sql, [juaariId]);
};

// Get juaari's current defaults_remaining count
export const getDefaultsRemaining = async (juaariId) => {
  const sql = `
    SELECT defaults_remaining FROM new_juaaris WHERE id = $1
  `;
  return query(sql, [juaariId]);
};
