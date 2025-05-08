import { query } from "./db";

export async function getJuaaris() {
  const sql = `SELECT id, display_name FROM new_juaaris`;
  return query(sql);
}

export async function getJuaarisAndWinnings() {
  const sql = `SELECT display_name, winnings FROM new_juaaris ORDER BY winnings DESC`;
  return query(sql);
}

export async function updateTotalWinnings() {}
