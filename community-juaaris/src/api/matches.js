import { query } from "./db";

export async function getAllMatches() {
  const sql = `
    SELECT m.*, 
           t1.name as first_team_name,
           t2.name as second_team_name,
           v.name as venue_name
    FROM new_matches m
    JOIN new_teams t1 ON m.first_team_id = t1.id
    JOIN new_teams t2 ON m.second_team_id = t2.id
    JOIN new_venues v ON m.venue_id = v.id
    ORDER BY m.datetime DESC
  `;

  return query(sql);
}

export async function getMatchByIdApi(id) {
  const sql = `
    SELECT *, 
    FROM new_matches m
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
    FROM new_matches m
    JOIN new_teams t1 ON m.first_team_id = t1.id
    JOIN new_teams t2 ON m.second_team_id = t2.id
    JOIN new_venues v ON m.venue_id = v.id
    WHERE m.datetime >= $1 AND m.datetime <= $2
    ORDER BY m.datetime ASC
  `;

  const results = await query(sql, [startDate, formattedEndDate]);

  // Debug: Log the query results
  console.log("Query results:", results);

  return results;
}

export async function saveResult(
  matchId,
  winningTeam,
  totalScore,
  more_or_less,
  washout
) {
  const sql = `
    UPDATE new_matches
    SET outcome_winning_team = $2, outcome_total_score = $3, outcome_more_or_less = $4, outcome_washout = $5
    WHERE id = $1
  `;
  return query(sql, [matchId, winningTeam, totalScore, more_or_less, washout]);
}

export async function updateWashoutAndBetAmount(matchId, washout, bet_amount) {
  const sql = `
    UPDATE new_matches
    SET outcome_washout = $2, bet_amount = $3
    WHERE id = $1
  `;
  return query(sql, [matchId, washout, bet_amount]);
}

export const updateBetAmount = async (matchId, bet_amount) => {
  console.log("Doubling bet amount for match id: ", matchId);
  const sql = `
    UPDATE new_matches
    SET bet_amount = $2
    WHERE id = $1
  `;
  return query(sql, [matchId, bet_amount]);
};

export const doubleBetAmount = async (matchId) => {
  console.log("Doubling bet amount for match id: ", matchId);
  const sql = `
    UPDATE new_matches
    SET bet_amount = bet_amount * 2
    WHERE id = $1
  `;
  return query(sql, [matchId]);
};

export const resetMatchData = async (matchId) => {
  // 1. Get match datetime
  const matchSql = `
    SELECT datetime FROM new_matches WHERE id = $1
  `;
  const match = await query(matchSql, [matchId]);

  if (match.length > 0) {
    // 2. Remove orange and purple cap table entries for the match date
    const orangeCapSql = `
      DELETE FROM new_orange_cap WHERE date = $1
    `;
    const purpleCapSql = `
      DELETE FROM new_purple_cap WHERE date = $1
    `;
    await Promise.all([
      query(orangeCapSql, [match[0].datetime]),
      query(purpleCapSql, [match[0].datetime]),
    ]);
  }

  // 3. Remove juaari win history entries for the match
  const historySql = `
    DELETE FROM new_juaari_win_history WHERE match_id = $1
  `;
  await query(historySql, [matchId]);

  // 4. Set successful column to null for all bets
  const betsSql = `
    UPDATE new_bets SET successful = NULL WHERE match_id = $1
  `;
  await query(betsSql, [matchId]);

  // 5. Reset outcome columns in matches table
  const matchesSql = `
    UPDATE new_matches 
    SET outcome_winning_team = NULL,
        outcome_total_score = NULL,
        outcome_more_or_less = NULL,
        outcome_washout = false
    WHERE id = $1
  `;
  await query(matchesSql, [matchId]);
};

export async function resetMatchResult(matchId) {
  try {
    // Step 1: Get win history for this match
    const winHistory = await query(
      "SELECT juaari_id, delta_winnings_this_game FROM new_juaari_win_history WHERE match_id = $1",
      [matchId]
    );

    // Step 2: Update juaaris winnings
    for (const record of winHistory) {
      // Update winnings by subtracting the delta (reversing the previous addition)
      await query(
        "UPDATE new_juaaris SET winnings = winnings - $1, match_winnings = match_winnings - $1 WHERE id = $2",
        [record.delta_winnings_this_game, record.juaari_id]
      );
    }

    // Step 3: Update win history entries instead of removing them
    await query(
      "UPDATE new_juaari_win_history SET delta_winnings_this_game = NULL WHERE match_id = $1",
      [matchId]
    );

    // Step 4: Reset bets
    await query("UPDATE new_bets SET successful = NULL WHERE match_id = $1", [
      matchId,
    ]);

    // Step 5: Reset match outcomes
    await query(
      `UPDATE new_matches 
       SET outcome_washout = false,
           outcome_more_or_less = NULL,
           outcome_total_score = NULL,
           outcome_winning_team = NULL
       WHERE id = $1`,
      [matchId]
    );

    return { success: true };
  } catch (error) {
    console.error("Error resetting match result:", error);
    throw error;
  }
}

export async function checkMatchIdExists(matchId) {
  const sql = `
    SELECT id FROM new_matches 
    WHERE id = $1
  `;

  const result = await query(sql, [matchId]);
  return result.length > 0;
}

export async function createMatch(
  matchId,
  firstTeamId,
  secondTeamId,
  venueId,
  dateTime,
  betAmount
) {
  // Convert SGT to UTC by subtracting 8 hours
  // The frontend provides datetime in SGT (UTC+8) format
  const sgtDate = new Date(dateTime);
  const utcDate = new Date(sgtDate.getTime() - 8 * 60 * 60 * 1000);

  const sql = `
    INSERT INTO new_matches (
      id, 
      first_team_id, 
      second_team_id, 
      venue_id, 
      datetime, 
      bet_amount, 
      outcome_winning_team, 
      outcome_total_score, 
      outcome_more_or_less, 
      outcome_washout
    )
    VALUES ($1, $2, $3, $4, $5, $6, NULL, NULL, NULL, false)
  `;

  return query(sql, [
    matchId,
    firstTeamId,
    secondTeamId,
    venueId,
    utcDate.toISOString(), // Store as UTC in the database
    betAmount,
  ]);
}

export async function getAllTeams() {
  const sql = `
    SELECT id, name FROM new_teams
    ORDER BY name
  `;

  return query(sql);
}

export async function getAllVenues() {
  const sql = `
    SELECT id, name FROM new_venues
    ORDER BY name
  `;

  return query(sql);
}

export async function updateMatch(
  matchId,
  firstTeamId,
  secondTeamId,
  venueId,
  dateTime,
  betAmount
) {
  // Convert SGT to UTC by subtracting 8 hours
  // The frontend provides datetime in SGT (UTC+8) format
  const sgtDate = new Date(dateTime);
  const utcDate = new Date(sgtDate.getTime() - 8 * 60 * 60 * 1000);

  const sql = `
    UPDATE new_matches
    SET first_team_id = $2,
        second_team_id = $3,
        venue_id = $4,
        datetime = $5,
        bet_amount = $6
    WHERE id = $1
  `;

  return query(sql, [
    matchId,
    firstTeamId,
    secondTeamId,
    venueId,
    utcDate.toISOString(), // Store as UTC in the database
    betAmount,
  ]);
}

export async function deleteMatch(matchId) {
  // First, check if there are any bets for this match
  const checkBetsSql = `
    SELECT COUNT(*) FROM new_bets WHERE match_id = $1
  `;

  const betsResult = await query(checkBetsSql, [matchId]);
  const betCount = parseInt(betsResult[0].count);

  if (betCount > 0) {
    throw new Error(
      `Cannot delete match: ${betCount} bets already placed on this match.`
    );
  }

  // If no bets, proceed with deletion
  const sql = `DELETE FROM new_matches WHERE id = $1`;
  return query(sql, [matchId]);
}

export async function getUpcomingMatches() {
  const sql = `
    SELECT m.*, 
           t1.name as first_team_name,
           t2.name as second_team_name,
           v.name as venue_name
    FROM new_matches m
    JOIN new_teams t1 ON m.first_team_id = t1.id
    JOIN new_teams t2 ON m.second_team_id = t2.id
    JOIN new_venues v ON m.venue_id = v.id
    WHERE m.datetime > NOW()
    ORDER BY m.datetime ASC
  `;

  return query(sql);
}
