import { query } from "./db";

export const createTriviaBet = async (triviaId, juaariId, selectedOption) => {
  const sql = `
    INSERT INTO trivia_bets (trivia_id, juaari_id, selected_option)
    VALUES ($1, $2, $3)
    ON CONFLICT (trivia_id, juaari_id) 
    DO UPDATE SET selected_option = $3
  `;
  return query(sql, [triviaId, juaariId, selectedOption]);
};

export const getTriviaBetsForTrivia = async (triviaId) => {
  const sql = `
    SELECT tb.*, j.display_name
    FROM trivia_bets tb
    JOIN new_juaaris j ON tb.juaari_id = j.id
    WHERE tb.trivia_id = $1
  `;
  return query(sql, [triviaId]);
};

export const updateTriviaBetSuccess = async (triviaId, correctOption) => {
  const sql = `
    UPDATE trivia_bets
    SET successful = (selected_option = $2)
    WHERE trivia_id = $1
  `;
  return query(sql, [triviaId, correctOption]);
};

export const getWinHistoryForTrivia = async (triviaId) => {
  const sql = `
    SELECT wh.*, j.display_name
    FROM new_juaari_win_history wh
    JOIN new_juaaris j ON wh.juaari_id = j.id
    WHERE wh.trivia_id = $1
  `;
  return query(sql, [triviaId]);
};

export const resetTriviaData = async (triviaId) => {
  // 1. Reset correct_option in trivia table
  const resetTriviaSql = `
    UPDATE trivia 
    SET correct_option = NULL 
    WHERE id = $1
  `;
  await query(resetTriviaSql, [triviaId]);

  // 2. Reset successful in trivia_bets table
  const resetBetsSql = `
    UPDATE trivia_bets 
    SET successful = NULL 
    WHERE trivia_id = $1
  `;
  await query(resetBetsSql, [triviaId]);

  // 3. Remove entries from new_juaari_win_history
  const deleteHistorySql = `
    DELETE FROM new_juaari_win_history 
    WHERE trivia_id = $1
  `;
  await query(deleteHistorySql, [triviaId]);
};

export const updateJuaariWinHistoryForTrivia = async (triviaId, betAmount) => {
  // First, get all bets for this trivia
  const getAllBetsSql = `
    SELECT juaari_id, successful
    FROM trivia_bets
    WHERE trivia_id = $1;`;

  const allBets = await query(getAllBetsSql, [triviaId]);
  if (allBets.length === 0) {
    // console.log("No bets found for trivia:", triviaId);
    return;
  }

  // Separate successful and unsuccessful bets
  const successfulBets = allBets.filter((bet) => bet.successful === true);
  const unsuccessfulBets = allBets.filter((bet) => bet.successful === false);

  // Calculate winnings for successful bets
  let winHistoryEntries = [];
  if (successfulBets.length > 0) {
    const totalWinningsPot = betAmount * unsuccessfulBets.length; // Total pot is bet_amount * number of losers
    const winningsPerWinner = parseFloat(
      (totalWinningsPot / successfulBets.length).toFixed(2)
    );

    // Add entries for winners
    winHistoryEntries.push(
      ...successfulBets.map((bet) => ({
        juaari_id: bet.juaari_id,
        trivia_id: triviaId,
        delta_winnings_this_game: winningsPerWinner,
      }))
    );
  }

  // Add entries for losers (negative bet amount)
  winHistoryEntries.push(
    ...unsuccessfulBets.map((bet) => ({
      juaari_id: bet.juaari_id,
      trivia_id: triviaId,
      delta_winnings_this_game: -betAmount,
    }))
  );

  // Delete any existing win history entries for this trivia
  const deleteExistingSql = `
    DELETE FROM new_juaari_win_history 
    WHERE trivia_id = $1
  `;
  await query(deleteExistingSql, [triviaId]);

  // Insert all win history entries
  const insertWinHistorySql = `
    INSERT INTO new_juaari_win_history (juaari_id, trivia_id, delta_winnings_this_game)
    VALUES ($1, $2, $3)
  `;

  // Use Promise.all to insert all entries concurrently
  await Promise.all(
    winHistoryEntries.map((entry) =>
      query(insertWinHistorySql, [
        entry.juaari_id,
        entry.trivia_id,
        entry.delta_winnings_this_game,
      ])
    )
  );
};

// Update total winnings for all juaaris after trivia results
export const updateTotalWinningsForTrivia = async (triviaId) => {
  // Get win history entries for this specific trivia
  const getWinHistorySql = `
    SELECT juaari_id, delta_winnings_this_game
    FROM new_juaari_win_history
    WHERE trivia_id = $1
  `;

  const winHistoryResults = await query(getWinHistorySql, [triviaId]);

  // For each juaari, update their total winnings based on this trivia's results
  for (const result of winHistoryResults) {
    const updateWinningsSql = `
      UPDATE new_juaaris
      SET winnings = winnings + $1
      WHERE id = $2
    `;
    await query(updateWinningsSql, [
      result.delta_winnings_this_game,
      result.juaari_id,
    ]);
  }
};

export const getWinnerNamesAndWinningsForTrivia = async (triviaId) => {
  const sql = `
    SELECT j.id, j.display_name
    FROM trivia_bets tb
    JOIN new_juaaris j ON tb.juaari_id = j.id
    WHERE tb.trivia_id = $1
    AND tb.successful = true
    ORDER BY j.display_name;
  `;
  return query(sql, [triviaId]);
};
