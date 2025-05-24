import { query } from "./db";

export const getTriviaHistory = async () => {
  const sql = `
    SELECT * FROM trivia
  `;
  return query(sql);
};

export const getTriviaWithMatchTime = async () => {
  const sql = `
    SELECT t.*, m.datetime as match_datetime 
    FROM trivia t
    JOIN new_matches m ON t.match_id = m.id
    ORDER BY m.datetime ASC
  `;
  return query(sql);
};

export const createTrivia = async (
  matchId,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  betAmount,
  matchName
) => {
  const sql = `
    INSERT INTO trivia (match_id, question, option_a, option_b, option_c, option_d, bet_amount, match_name)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
  return query(sql, [
    matchId,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    betAmount,
    matchName,
  ]);
};

export const updateTriviaCorrectOption = async (triviaId, correctOption) => {
  const sql = `
    UPDATE trivia
    SET correct_option = $1
    WHERE id = $2
  `;
  return query(sql, [correctOption, triviaId]);
};

export const updateTriviaBetAmount = async (triviaId, betAmount) => {
  const sql = `
    UPDATE trivia
    SET bet_amount = $1
    WHERE id = $2
  `;
  return query(sql, [betAmount, triviaId]);
};

export const getUpcomingTrivia = async () => {
  const sql = `
    SELECT t.*, m.datetime as match_datetime, 
           m.first_team_name, m.second_team_name, m.venue_name
    FROM trivia t
    JOIN (
      SELECT m.*, 
             t1.name as first_team_name,
             t2.name as second_team_name,
             v.name as venue_name
      FROM new_matches m
      JOIN new_teams t1 ON m.first_team_id = t1.id
      JOIN new_teams t2 ON m.second_team_id = t2.id
      JOIN new_venues v ON m.venue_id = v.id
    ) m ON t.match_id = m.id
    WHERE m.datetime > NOW()
    ORDER BY m.datetime ASC
  `;
  return query(sql);
};

export const updateTrivia = async (
  triviaId,
  matchId,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  betAmount,
  matchName
) => {
  const sql = `
    UPDATE trivia
    SET match_id = $2,
        question = $3,
        option_a = $4,
        option_b = $5,
        option_c = $6,
        option_d = $7,
        bet_amount = $8,
        match_name = $9
    WHERE id = $1
  `;
  return query(sql, [
    triviaId,
    matchId,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    betAmount,
    matchName,
  ]);
};

export const deleteTrivia = async (triviaId) => {
  // First check if there are any bets for this trivia
  const checkBetsSql = `
    SELECT COUNT(*) FROM trivia_bets WHERE trivia_id = $1
  `;

  const betsResult = await query(checkBetsSql, [triviaId]);
  const betCount = parseInt(betsResult[0].count);

  if (betCount > 0) {
    throw new Error(
      `Cannot delete trivia: ${betCount} bets already placed on this question.`
    );
  }

  // If no bets, proceed with deletion
  const sql = `DELETE FROM trivia WHERE id = $1`;
  return query(sql, [triviaId]);
};
