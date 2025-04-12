-- Initialize database schema for Community Juaaris

-- Teams table
CREATE TABLE new_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Venues table
CREATE TABLE new_venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Gameplay Rules table
CREATE TABLE new_gameplay_rules (
    id SERIAL PRIMARY KEY,
    days_in_advance_for_bet INTEGER NOT NULL,
    max_defaults INTEGER NOT NULL,
    second_dimension_cutoff INTEGER NOT NULL,
    last_bet_cutoff_hours INTEGER NOT NULL
);

-- Juaaris (Players) table
CREATE TABLE new_juaaris (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    is_purple_capped BOOLEAN DEFAULT FALSE,
    is_orange_capped BOOLEAN DEFAULT FALSE,
    winnings DECIMAL(10,2) DEFAULT 0.00,
    defaults_remaining INTEGER NOT NULL DEFAULT 5
);

-- Matches table
CREATE TABLE new_matches (
    id SERIAL PRIMARY KEY,
    first_team_id SERIAL NOT NULL REFERENCES new_teams(id),
    second_team_id SERIAL NOT NULL REFERENCES new_teams(id),
    venue_id SERIAL NOT NULL REFERENCES new_venues(id),
    datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    outcome_winning_team SERIAL REFERENCES new_teams(id),
    outcome_total_score INTEGER,
    outcome_more_or_less VARCHAR(50),
    bet_amount INTEGER NOT NULL,
    CONSTRAINT different_teams CHECK (first_team_id != second_team_id)
);

-- Bets table
CREATE TABLE new_bets (
    id SERIAL PRIMARY KEY ,
    match_id SERIAL NOT NULL REFERENCES new_matches(id),
    juaari_id SERIAL NOT NULL REFERENCES new_juaaris(id),
    predicted_winning_team SERIAL NOT NULL REFERENCES new_teams(id),
    predicted_more_or_less VARCHAR(50) NOT NULL,
    bet_amount INTEGER NOT NULL,
    successful BOOLEAN,
    defaults BOOLEAN DEFAULT 5
);

CREATE TABLE bumpers (
    id SERIAL PRIMARY KEY,
    bet_id SERIAL NOT NULL REFERENCES new_bets(id),
    bumper BOOLEAN DEFAULT FALSE,
    mini_bumper BOOLEAN DEFAULT FALSE
);

-- Party Fund table
CREATE TABLE party_fund (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    fund DECIMAL(10,2) NOT NULL
);

-- Juaari Win History table
CREATE TABLE new_juaari_win_history (
    juaari_id SERIAL REFERENCES new_juaaris(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    bet_id SERIAL REFERENCES new_bets(id),
    match_id SERIAL REFERENCES new_matches(id),
    delta_winnings_this_game DECIMAL(10,2) NOT NULL,
    accumulated_winnings DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (juaari_id, date)
);

-- Purple Cap History table
CREATE TABLE purple_cap (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    holder_id SERIAL NOT NULL REFERENCES new_juaaris(id)
);

-- Orange Cap History table
CREATE TABLE orange_cap (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    holder_id SERIAL NOT NULL REFERENCES new_juaaris(id)
);

-- Create indexes for frequently accessed columns
CREATE INDEX idx_new_matches_datetime ON new_matches(datetime);
CREATE INDEX idx_new_bets_match_id ON new_bets(match_id);
CREATE INDEX idx_new_bets_juaari_id ON new_bets(juaari_id);
CREATE INDEX idx_new_juaari_win_history_juaari_id ON new_juaari_win_history(juaari_id);

-- Add constraints for more_or_less values
ALTER TABLE new_matches 
ADD CONSTRAINT valid_more_or_less 
CHECK (outcome_more_or_less IN ('MORE', 'LESS'));

ALTER TABLE new_bets 
ADD CONSTRAINT valid_predicted_more_or_less 
CHECK (predicted_more_or_less IN ('MORE', 'LESS')); 