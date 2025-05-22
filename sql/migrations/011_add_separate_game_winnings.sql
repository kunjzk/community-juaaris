-- Add new columns to new_juaaris
ALTER TABLE new_juaaris 
ADD COLUMN match_winnings DECIMAL(10,2),
ADD COLUMN trivia_winnings DECIMAL(10,2);

-- Update match_winnings with cumulative delta_winnings_this_game from match bets
UPDATE new_juaaris j
SET match_winnings = COALESCE((
  SELECT SUM(wh.delta_winnings_this_game)
  FROM new_juaari_win_history wh
  WHERE wh.juaari_id = j.id
  AND wh.match_id IS NOT NULL
  AND wh.trivia_id IS NULL
), 0);

-- Update trivia_winnings with cumulative delta_winnings_this_game from trivia bets
UPDATE new_juaaris j
SET trivia_winnings = COALESCE((
  SELECT SUM(wh.delta_winnings_this_game)
  FROM new_juaari_win_history wh
  WHERE wh.juaari_id = j.id
  AND wh.trivia_id IS NOT NULL
  AND wh.match_id IS NULL
), 0);

-- -- Create an index to speed up these kinds of queries in the future
-- CREATE INDEX idx_win_history_juaari_id ON new_juaari_win_history(juaari_id);

-- -- Update the existing winnings column to be the sum of match_winnings and trivia_winnings
-- UPDATE new_juaaris
-- SET winnings = COALESCE(match_winnings, 0) + COALESCE(trivia_winnings, 0);