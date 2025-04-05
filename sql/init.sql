-- Initialize database schema for Community Juaaris

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL
);

-- Venues table
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL
);

-- Gameplay Rules table
CREATE TABLE gameplay_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    days_in_advance_for_bet INTEGER NOT NULL,
    max_defaults INTEGER NOT NULL,
    second_dimension_cutoff INTEGER NOT NULL,
    last_bet_cutoff_hours INTEGER NOT NULL
);

-- Juaaris (Players) table
CREATE TABLE juaaris (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name VARCHAR(255) NOT NULL,
    is_purple_capped BOOLEAN DEFAULT FALSE,
    is_orange_capped BOOLEAN DEFAULT FALSE,
    winnings DECIMAL(10,2) DEFAULT 0.00
);

-- Matches table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_team_id UUID NOT NULL REFERENCES teams(id),
    second_team_id UUID NOT NULL REFERENCES teams(id),
    venue_id UUID NOT NULL REFERENCES venues(id),
    datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    outcome_winning_team UUID REFERENCES teams(id),
    outcome_total_score INTEGER,
    outcome_more_or_less VARCHAR(50),
    bet_amount INTEGER NOT NULL,
    CONSTRAINT different_teams CHECK (first_team_id != second_team_id)
);

-- Bets table
CREATE TABLE bets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID NOT NULL REFERENCES matches(id),
    juaari_id UUID NOT NULL REFERENCES juaaris(id),
    predicted_winning_team UUID NOT NULL REFERENCES teams(id),
    predicted_more_or_less VARCHAR(50) NOT NULL,
    bet_amount INTEGER NOT NULL,
    successful BOOLEAN,
    bumper BOOLEAN DEFAULT FALSE,
    mini_bumper BOOLEAN DEFAULT FALSE
);

-- Party Fund table
CREATE TABLE party_fund (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    fund DECIMAL(10,2) NOT NULL
);

-- Juaari Win History table
CREATE TABLE juaari_win_history (
    juaari_id UUID REFERENCES juaaris(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    bet_id UUID REFERENCES bets(id),
    match_id UUID REFERENCES matches(id),
    delta_winnings_this_game DECIMAL(10,2) NOT NULL,
    accumulated_winnings DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (juaari_id, date)
);

-- Purple Cap History table
CREATE TABLE purple_cap (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    holder_id UUID NOT NULL REFERENCES juaaris(id)
);

-- Orange Cap History table
CREATE TABLE orange_cap (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    holder_id UUID NOT NULL REFERENCES juaaris(id)
);

-- Create indexes for frequently accessed columns
CREATE INDEX idx_matches_datetime ON matches(datetime);
CREATE INDEX idx_bets_match_id ON bets(match_id);
CREATE INDEX idx_bets_juaari_id ON bets(juaari_id);
CREATE INDEX idx_win_history_juaari_id ON juaari_win_history(juaari_id);

-- Add constraints for more_or_less values
ALTER TABLE matches 
ADD CONSTRAINT valid_more_or_less 
CHECK (outcome_more_or_less IN ('MORE', 'LESS'));

ALTER TABLE bets 
ADD CONSTRAINT valid_predicted_more_or_less 
CHECK (predicted_more_or_less IN ('MORE', 'LESS')); 