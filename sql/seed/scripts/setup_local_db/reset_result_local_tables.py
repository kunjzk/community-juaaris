import os
import json
from psycopg2 import pool
from dotenv import load_dotenv
import pandas as pd
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
conn.rollback()

# match_id = 53
# cur.execute('''
#     UPDATE new_matches 
#     SET outcome_washout = FALSE, outcome_total_score = NULL, outcome_more_or_less = NULL
#     WHERE id = %s;
# ''', (match_id,)
# )

# match_id = 61
# cur.execute('''
# UPDATE new_bets
# SET successful = FALSE
# WHERE match_id = %s;      
#             ''', (match_id,)
# )

# cur.execute('''
#             UPDATE new_matches
#             SET outcome_winning_team = NULL, outcome_total_score = NULL, outcome_more_or_less = NULL
#             WHERE id = %s;
#             ''', (match_id,)
# )

# # Remove entries from juaari_win_history table where match_id = 61
# cur.execute('''
# DELETE FROM new_juaari_win_history
# WHERE match_id = %s;
#             ''', (match_id,)
# )

# cur.execute('''
#             CREATE TABLE trivia (
#     id SERIAL PRIMARY KEY,
#     match_id INTEGER REFERENCES new_matches(id),
#     question TEXT NOT NULL,
#     option_a TEXT NOT NULL,
#     option_b TEXT NOT NULL,
#     option_c TEXT NOT NULL,
#     option_d TEXT NOT NULL,
#     correct_option CHAR(1) CHECK (correct_option IN ('A', 'B', 'C', 'D')),
#     bet_amount INTEGER NOT NULL DEFAULT 10
# );

# ALTER TABLE new_juaari_win_history
#     ALTER COLUMN match_id DROP NOT NULL,
#     ADD COLUMN trivia_id INTEGER REFERENCES trivia(id);

# CREATE TABLE trivia_bets (
#     id SERIAL PRIMARY KEY,
#     trivia_id INTEGER NOT NULL REFERENCES trivia(id),
#     juaari_id INTEGER NOT NULL REFERENCES new_juaaris(id),
#     selected_option CHAR(1) CHECK (selected_option IN ('A', 'B', 'C', 'D')),
#     successful BOOLEAN DEFAULT NULL,
#     UNIQUE(trivia_id, juaari_id)
# ); 
#             ''')

# cur.execute('''
#             ALTER TABLE trivia
# ADD COLUMN match_name TEXT;
#             ''')

# cur.execute('''
# ALTER TABLE trivia
# DROP CONSTRAINT trivia_correct_option_check;

# ALTER TABLE trivia
# ADD CONSTRAINT trivia_correct_option_check 
# CHECK (correct_option IN ('A', 'B', 'C', 'D', 'X'));
#             ''')

seed_data = [{"effective_from":"2025-03-22 00:00:00+00","days_in_advance_for_bet":7,"max_defaults":5,"second_dimension_cutoff":345,"last_bet_cutoff_hours":2},{"effective_from":"2025-03-30 00:00:00+00","days_in_advance_for_bet":7,"max_defaults":5,"second_dimension_cutoff":365,"last_bet_cutoff_hours":2},{"effective_from":"2025-04-06 00:00:00+00","days_in_advance_for_bet":7,"max_defaults":5,"second_dimension_cutoff":350,"last_bet_cutoff_hours":2},{"effective_from":"2025-04-13 00:00:00+00","days_in_advance_for_bet":7,"max_defaults":5,"second_dimension_cutoff":351,"last_bet_cutoff_hours":2}]

for row in seed_data:
    cur.execute('''
    INSERT INTO new_gameplay_rules (effective_from, days_in_advance_for_bet, max_defaults, second_dimension_cutoff, last_bet_cutoff_hours)
    VALUES (%s, %s, %s, %s, %s)
                ''', (row['effective_from'], row['days_in_advance_for_bet'], row['max_defaults'], row['second_dimension_cutoff'], row['last_bet_cutoff_hours']))
    conn.commit()


cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()