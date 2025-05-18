 -- Drop the check_win_history_source constraint
ALTER TABLE new_juaari_win_history
    DROP CONSTRAINT IF EXISTS check_win_history_source; 