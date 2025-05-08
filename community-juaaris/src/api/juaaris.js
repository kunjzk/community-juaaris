import { query } from "./db";

export async function getJuaaris() {
  const sql = `SELECT id, display_name FROM new_juaaris`;
  return query(sql);
}

export async function getJuaarisAndWinnings() {
  const sql = `SELECT id, display_name, winnings FROM new_juaaris ORDER BY winnings DESC`;
  return query(sql);
}

export async function updateTotalWinnings(
  winnerIds,
  netWinningsPerWinner,
  bet_amount
) {
  const sql = `UPDATE new_juaaris SET winnings = CASE
    WHEN id = ANY($1) THEN winnings + $2
    ELSE winnings - $3
  END`;
  return query(sql, [winnerIds, netWinningsPerWinner, bet_amount]);
}

export async function updateOrangeCap(match_datetime, orangeCapId) {
  const sql = `INSERT INTO new_orange_cap (holder_id, date) VALUES ($1, $2)`;
  return query(sql, [orangeCapId, match_datetime]);
}

export async function updatePurpleCap(match_datetime, purpleCapId) {
  const sql = `INSERT INTO new_purple_cap (holder_id, date) VALUES ($1, $2)`;
  return query(sql, [purpleCapId, match_datetime]);
}
