-- Create trivia table
CREATE TABLE trivia (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    bet_amount INTEGER NOT NULL DEFAULT 10
);

-- Modify new_juaaris_win_history table
ALTER TABLE new_juaaris_win_history
    ALTER COLUMN match_id DROP NOT NULL,
    ADD COLUMN trivia_id INTEGER REFERENCES trivia(id);

-- Create trivia_bets table
CREATE TABLE trivia_bets (
    id SERIAL PRIMARY KEY,
    trivia_id INTEGER NOT NULL REFERENCES trivia(id),
    juaari_id INTEGER NOT NULL REFERENCES juaaris(id),
    selected_option CHAR(1) CHECK (selected_option IN ('A', 'B', 'C', 'D')),
    successful BOOLEAN DEFAULT NULL,
    UNIQUE(trivia_id, juaari_id)
); 