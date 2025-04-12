import os
import json
from psycopg2 import pool
from dotenv import load_dotenv
# Load .env file
load_dotenv()
# Get the connection string from the environment variable
connection_string = os.getenv('DATABASE_URL')
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

# Get all juaaris from the old table
cur.execute('SELECT * from matches ORDER BY datetime ASC;')
matches = cur.fetchall()
print(matches)
match_id_to_uuid = {}

juaari_uuid_to_id = json.load(open('juaari_id_to_uuid.json'))
team_uuid_to_id = json.load(open('team_id_to_uuid.json'))
venue_uuid_to_id = json.load(open('venue_id_to_uuid.json'))

# Write all values to the new_juaaris table
for i, match in enumerate(matches):
    # match_id_to_uuid[match[0]] = (i+1, match[4].isoformat())
    winning_team = team_uuid_to_id[match[5]][0] if match[5] else None
    cur.execute('INSERT INTO new_matches (first_team_id, second_team_id, venue_id, datetime, outcome_winning_team, outcome_total_score, outcome_more_or_less, bet_amount) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);', (team_uuid_to_id[match[1]][0], team_uuid_to_id[match[2]][0], venue_uuid_to_id[match[3]][0], match[4].isoformat(), winning_team, match[6], match[7], match[8]))

conn.commit()
# print(juaari_id_to_uuid)
# save the dict to a json file
# with open('match_id_to_uuid.json', 'w') as f:
#     json.dump(match_id_to_uuid, f)

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
