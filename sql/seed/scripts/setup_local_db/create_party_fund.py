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

# create_pf_table = '''
# CREATE TABLE party_fund (
#     date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
#     fund DECIMAL(10,2) NOT NULL
# );
# '''

# create_jwh_table = '''
# CREATE TABLE new_juaari_win_history (
#     juaari_id SERIAL REFERENCES new_juaaris(id),
#     date TIMESTAMP WITH TIME ZONE NOT NULL,
#     bet_id SERIAL REFERENCES new_bets(id),
#     match_id SERIAL REFERENCES new_matches(id),
#     delta_winnings_this_game DECIMAL(10,2) NOT NULL,
#     accumulated_winnings DECIMAL(10,2) NOT NULL,
#     PRIMARY KEY (juaari_id, date)
# );
# '''

# # tenth. v
# create_pc_table = '''
# CREATE TABLE new_purple_cap (
#     date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
#     holder_id SERIAL NOT NULL REFERENCES new_juaaris(id)
# );
# '''

# # eleventh. v
# create_oc_table = '''
# CREATE TABLE new_orange_cap (
#     date TIMESTAMP WITH TIME ZONE PRIMARY KEY,
#     holder_id SERIAL NOT NULL REFERENCES new_juaaris(id)
# );
# '''

# commands_to_run.append(create_pc_table)
# commands_to_run.append(create_oc_table)

# ALTER_MATCHES_TABLE = '''
# ALTER TABLE new_matches
# ADD COLUMN outcome_winning_team SERIAL REFERENCES new_teams(id);
# '''

DROP_BETS_TABLE = '''
DROP TABLE new_bets CASCADE
'''

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
for command in commands_to_run:
    cur.execute(command)
conn.commit()

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()