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
cur.execute('SELECT * from juaaris;')
juaaris = cur.fetchall()

juaari_id_to_uuid = {}

# Write all values to the new_juaaris table
for i, juaari in enumerate(juaaris):
    print(i, juaari[0], juaari[1])
    juaari_id_to_uuid[juaari[0]] = (i+1, juaari[1])
    cur.execute('INSERT INTO new_juaaris (display_name, is_purple_capped, is_orange_capped, winnings, defaults_remaining) VALUES (%s, %s, %s, %s, %s);', (juaari[1], juaari[2], juaari[3], juaari[4], juaari[5]))

conn.commit()
# print(juaari_id_to_uuid)
# save the dict to a json file
with open('juaari_id_to_uuid.json', 'w') as f:
    json.dump(juaari_id_to_uuid, f)

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
