import { query } from "./db";

export async function getSecondDimension() {
  const sql = `SELECT second_dimension_cutoff, effective_from
                from new_gameplay_rules;`;
  return query(sql);
}
