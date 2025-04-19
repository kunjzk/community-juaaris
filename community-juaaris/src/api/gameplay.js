import { query } from "./db";

export async function getSecondDimension() {
  const sql = `SELECT second_dimension_cutoff, effective_from
                from new_gameplay_rules;`;
  return query(sql);
}

export async function postSecondDimension(
  secondDimensionCutoff,
  effectiveFrom
) {
  const sql = `INSERT INTO new_gameplay_rules (second_dimension_cutoff, effective_from, days_in_advance_for_bet, max_defaults, last_bet_cutoff_hours)
                VALUES ($1, $2, 7, 5, 2);`;
  return query(sql, [secondDimensionCutoff, effectiveFrom]);
}
