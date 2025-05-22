-- Migration: 012_insert_new_matches.sql
-- Description: Removes existing matches with high IDs and inserts new match data

-- IMPORTANT: Make sure to back up your data before running this script!

-- First, check how many matches will be affected
-- SELECT COUNT(*) FROM new_matches WHERE id > 58;

-- Delete all matches with IDs greater than 58
DELETE FROM new_matches WHERE id > 58;

-- Delete related records in the win history table
DELETE FROM new_juaari_win_history WHERE match_id > 58;

-- Delete related records in the bets table
DELETE FROM new_bets WHERE match_id > 58;

-- Insert matches
INSERT INTO new_matches (
  id,                  -- Match ID
  first_team_id,       -- ID of first team
  second_team_id,      -- ID of second team
  venue_id,            -- ID of venue
  datetime,            -- Date and time (UTC)
  bet_amount,          -- Default bet amount
  outcome_winning_team, -- NULL until match is complete
  outcome_total_score,  -- NULL until match is complete
  outcome_more_or_less, -- NULL until match is complete
  outcome_washout       -- Default false
) VALUES 
-- Times converted from SGT (UTC+8) to UTC by subtracting 8 hours
(58, 9, 1, 9, '2025-05-17 14:00:00', 10, NULL, NULL, NULL, false),  -- RCB vs KKR at Bengaluru
(59, 6, 10, 11, '2025-05-18 10:00:00', 10, NULL, NULL, NULL, false), -- RR vs PBKS at Jaipur
(60, 4, 5, 12, '2025-05-18 14:00:00', 10, NULL, NULL, NULL, false),  -- DC vs GT at Delhi
(61, 8, 2, 8, '2025-05-19 14:00:00', 10, NULL, NULL, NULL, false),   -- LSG vs SRH at Lucknow
(62, 3, 6, 12, '2025-05-20 14:00:00', 10, NULL, NULL, NULL, false),  -- CSK vs RR at Delhi
(63, 7, 4, 7, '2025-05-21 14:00:00', 10, NULL, NULL, NULL, false),   -- MI vs DC at Mumbai
(64, 5, 8, 5, '2025-05-22 14:00:00', 10, NULL, NULL, NULL, false),   -- GT vs LSG at Ahmedabad
(65, 9, 2, 9, '2025-05-23 14:00:00', 10, NULL, NULL, NULL, false),   -- RCB vs SRH at Bengaluru
(66, 4, 10, 11, '2025-05-24 14:00:00', 10, NULL, NULL, NULL, false), -- DC vs PBKS at Jaipur
(67, 5, 3, 5, '2025-05-25 10:00:00', 10, NULL, NULL, NULL, false),   -- GT vs CSK at Ahmedabad
(68, 1, 2, 12, '2025-05-25 14:00:00', 10, NULL, NULL, NULL, false),  -- KKR vs SRH at Delhi
(69, 7, 10, 11, '2025-05-26 14:00:00', 10, NULL, NULL, NULL, false), -- MI vs PBKS at Jaipur
(70, 8, 9, 8, '2025-05-27 14:00:00', 10, NULL, NULL, NULL, false)    -- LSG vs RCB at Lucknow
;

-- Reset the sequence after inserting with explicit IDs
SELECT setval('new_matches_id_seq', 70);

-- To find team IDs, run: SELECT id, name FROM new_teams ORDER BY name;
-- To find venue IDs, run: SELECT id, name FROM new_venues ORDER BY name;

-- If you need to get the next ID in the sequence:
-- SELECT nextval('new_matches_id_seq');

-- If you need to reset the sequence after inserting with explicit IDs:
-- SELECT setval('new_matches_id_seq', (SELECT MAX(id) FROM new_matches)); 