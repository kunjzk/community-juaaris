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
