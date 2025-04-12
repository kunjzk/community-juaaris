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
conn.rollback()
# Get all juaaris from the old table
cur.execute('SELECT * from bets;')
bets = cur.fetchall()
print(bets)
bet_id_to_uuid = {}

juaari_uuid_to_id = json.load(open('juaari_id_to_uuid.json'))
team_uuid_to_id = json.load(open('team_id_to_uuid.json'))
venue_uuid_to_id = json.load(open('venue_id_to_uuid.json'))
match_uuid_to_id = json.load(open('match_id_to_uuid.json'))
# Write all values to the new_juaaris table
for i, bet in enumerate(bets):
    bet_id_to_uuid[bet[0]] = (i+1)
    cur.execute('INSERT INTO new_bets (match_id, juaari_id, predicted_winning_team, predicted_more_or_less, successful, default_bet) VALUES (%s, %s, %s, %s, %s, %s);', (match_uuid_to_id[bet[1]][0], juaari_uuid_to_id[bet[2]][0], team_uuid_to_id[bet[3]][0], bet[4], bet[6], False))
    cur.execute('INSERT INTO bumpers (bet_id, bumper, mini_bumper) VALUES (%s, %s, %s);', (i+1, False, False))

conn.commit()
# print(juaari_id_to_uuid)
# save the dict to a json file
with open('bet_id_to_uuid.json', 'w') as f:
    json.dump(bet_id_to_uuid, f)

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
