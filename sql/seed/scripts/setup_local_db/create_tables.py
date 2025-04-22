import os
import json
from psycopg2 import pool
from dotenv import load_dotenv
# Load .env file
load_dotenv()
# Get the connection string from the environment variable
connection_string = os.getenv('LOCAL_DB_URL')
# Create a connection pool
connection_pool = pool.SimpleConnectionPool(
    1,  # Minimum number of connections in the pool
    10,  # Maximum number of connections in the pool
    connection_string
)
# Check if the pool was created successfully
if connection_pool:
    print("Connection pool created successfully")

# Get a connection from the pool
conn = connection_pool.getconn()
# Create a cursor object
cur = conn.cursor()

commands_to_run = []

# FIRST operation. Verified correct.
create_teams_table = '''
CREATE TABLE new_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
'''
commands_to_run.append(create_teams_table)

# Second operation. Verified correct.
create_venues_table = '''
CREATE TABLE new_venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
'''
commands_to_run.append(create_venues_table)

# Third operation. Verified correct
create_gameplay_rules_table = '''
CREATE TABLE new_gameplay_rules (
    id SERIAL PRIMARY KEY,
    days_in_advance_for_bet INTEGER NOT NULL,
    max_defaults INTEGER NOT NULL,
    second_dimension_cutoff INTEGER NOT NULL,
    last_bet_cutoff_hours INTEGER NOT NULL,
    effective_from TIMESTAMP WITH TIME ZONE NOT NULL
);
'''
commands_to_run.append(create_gameplay_rules_table)

# Fourth operation. Verified correct.
create_juaaris_table = '''
CREATE TABLE new_juaaris (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    is_purple_capped BOOLEAN DEFAULT FALSE,
    is_orange_capped BOOLEAN DEFAULT FALSE,
    winnings DECIMAL(10,2) DEFAULT 0.00,
    defaults_remaining INTEGER NOT NULL DEFAULT 5
);
'''
commands_to_run.append(create_juaaris_table)


# Fifth operation. Verified correct.
create_matches_table = '''
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
'''
commands_to_run.append(create_matches_table)

# Sixth operation. Verified correct.
create_bets_table = '''
CREATE TABLE new_bets (
    id SERIAL PRIMARY KEY ,
    match_id SERIAL NOT NULL REFERENCES new_matches(id),
    juaari_id SERIAL NOT NULL REFERENCES new_juaaris(id),
    predicted_winning_team SERIAL NOT NULL REFERENCES new_teams(id),
    predicted_more_or_less VARCHAR(50) NOT NULL,
    successful BOOLEAN,
    default_bet BOOLEAN DEFAULT FALSE
);
'''
commands_to_run.append(create_bets_table)

# seventh. verified.
create_bumpers_table = '''
CREATE TABLE bumpers (
    id SERIAL PRIMARY KEY,
    bet_id SERIAL NOT NULL REFERENCES new_bets(id),
    bumper BOOLEAN DEFAULT FALSE,
    mini_bumper BOOLEAN DEFAULT FALSE
);
'''
commands_to_run.append(create_bumpers_table)

# eigth. v
create_party_fund_table = '''
CREATE TABLE party_fund (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    fund DECIMAL(10,2) NOT NULL
);
'''

# ninth. v
create_jwh_table = '''
CREATE TABLE new_juaari_win_history (
    juaari_id SERIAL REFERENCES new_juaaris(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    bet_id SERIAL REFERENCES new_bets(id),
    match_id SERIAL REFERENCES new_matches(id),
    delta_winnings_this_game DECIMAL(10,2) NOT NULL,
    accumulated_winnings DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (juaari_id, date)
);
'''

# tenth. v
create_pc_table = '''
CREATE TABLE new_purple_cap (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    holder_id SERIAL NOT NULL REFERENCES new_juaaris(id)
);
'''

# eleventh. v
create_oc_table = '''
CREATE TABLE new_orange_cap (
    date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    holder_id SERIAL NOT NULL REFERENCES new_juaaris(id)
);
'''

# indices
create_indices = '''
CREATE INDEX idx_new_matches_datetime ON new_matches(datetime);
CREATE INDEX idx_new_bets_match_id ON new_bets(match_id);
CREATE INDEX idx_new_bets_juaari_id ON new_bets(juaari_id);
CREATE INDEX idx_new_juaari_win_history_juaari_id ON new_juaari_win_history(juaari_id);
'''


add_constraints = '''
ALTER TABLE new_matches 
ADD CONSTRAINT valid_more_or_less 
CHECK (outcome_more_or_less IN ('MORE', 'LESS'));

ALTER TABLE new_bets 
ADD CONSTRAINT valid_predicted_more_or_less 
CHECK (predicted_more_or_less IN ('MORE', 'LESS')); 
'''

for command in commands_to_run:
    cur.execute(command)
conn.commit()

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()