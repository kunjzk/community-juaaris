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
