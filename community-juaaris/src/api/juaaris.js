import { query } from "./db";

export async function getJuaarisAndWinnings() {
  const sql = `SELECT display_name, winnings FROM juaaris ORDER BY winnings DESC`;
  return query(sql);
}
