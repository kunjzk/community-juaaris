import { query } from "./db";

export async function getJuaaris() {
  const sql = `SELECT id, display_name FROM juaaris`;
  return query(sql);
}

export async function getJuaarisAndWinnings() {
  const sql = `SELECT display_name, winnings FROM juaaris ORDER BY winnings DESC`;
  return query(sql);
}
