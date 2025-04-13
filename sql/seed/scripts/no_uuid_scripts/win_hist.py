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
cur.execute('SELECT * from juaari_win_history;')
win_hist = cur.fetchall()
print(win_hist)

juaari_uuid_to_id = json.load(open('juaari_id_to_uuid.json'))
team_uuid_to_id = json.load(open('team_id_to_uuid.json'))
venue_uuid_to_id = json.load(open('venue_id_to_uuid.json'))
match_uuid_to_id = json.load(open('match_id_to_uuid.json'))
bet_uuid_to_id = json.load(open('bet_id_to_uuid.json'))
# Write all values to the new_juaaris table
for i, w in enumerate(win_hist):
    print(w)
    cur.execute('INSERT INTO new_juaari_win_history (juaari_id,date, bet_id, match_id, delta_winnings_this_game, accumulated_winnings) VALUES (%s, %s, %s, %s, %s, %s);', (juaari_uuid_to_id[w[0]][0], w[1].isoformat(), bet_uuid_to_id[w[2]], match_uuid_to_id[w[3]][0], w[4], w[5]))

conn.commit()
# print(juaari_id_to_uuid)
# save the dict to a json file

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
