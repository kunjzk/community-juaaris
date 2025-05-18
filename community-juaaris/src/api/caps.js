import { query } from "./db";

export const getCapsForDate = async (date) => {
  const sql = `
    SELECT 
      'ORANGE' as cap_type,
      holder_id as juaari_id,
      date
    FROM new_orange_cap
    WHERE date = $1
    UNION ALL
    SELECT 
      'PURPLE' as cap_type,
      holder_id as juaari_id,
      date
    FROM new_purple_cap
    WHERE date = $1
  `;
  return query(sql, [date]);
};
