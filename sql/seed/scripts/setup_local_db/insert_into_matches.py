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

# venues = pd.read_csv('neondb_backup/new_venues.csv')

# for i, row in venues.iterrows():
#     cur.execute('''
#         INSERT INTO new_venues (
#             id, name
#                 ) VALUES (%s, %s);
#                 ''', (row['id'], row ['name']))
# conn.commit()

matches = pd.read_csv('neondb_backup/new_matches.csv')

for i, row in matches.iterrows():
    # if i<10:
    #     print(row)
    cur.execute('''
        INSERT INTO new_matches (
            id, first_team_id, second_team_id, venue_id, 
            datetime, outcome_winning_team, outcome_total_score, 
            outcome_more_or_less, bet_amount
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
    ''', (
        row['id'], 
        row['first_team_id'], 
        row['second_team_id'], 
        row['venue_id'],
        row['datetime'],
        row['outcome_winning_team'] if pd.notna(row['outcome_winning_team']) else None,
        row['outcome_total_score'] if pd.notna(row['outcome_total_score']) else None,
        row['outcome_more_or_less'] if pd.notna(row['outcome_more_or_less']) else None,
        row['bet_amount']
    ))

conn.commit()
cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()