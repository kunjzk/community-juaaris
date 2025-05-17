import { query } from "./db";

export const getTriviaHistory = async () => {
  const sql = `
    SELECT * FROM trivia
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
