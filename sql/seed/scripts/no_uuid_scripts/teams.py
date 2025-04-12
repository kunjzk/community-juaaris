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
cur.execute('SELECT * from teams;')
teams = cur.fetchall()

team_id_to_uuid = {}

# Write all values to the new_juaaris table
for i, team in enumerate(teams):
    print(i, team[0], team[1])
    team_id_to_uuid[team[0]] = (i+1, team[1])
    cur.execute('INSERT INTO new_teams (name) VALUES (%s);', (team[1],))

conn.commit()
# print(juaari_id_to_uuid)
# save the dict to a json file
with open('team_id_to_uuid.json', 'w') as f:
    json.dump(team_id_to_uuid, f)

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
