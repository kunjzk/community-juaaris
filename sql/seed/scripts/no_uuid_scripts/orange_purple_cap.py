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
cur.execute('SELECT * from orange_cap;')
orange_cap = cur.fetchall()

juaari_uuid_to_id = json.load(open('juaari_id_to_uuid.json'))

# Write all values to the new_juaaris table
for i, o in enumerate(orange_cap):
    cur.execute('INSERT INTO new_orange_cap (date, holder_id) VALUES (%s, %s);', (o[0].isoformat(), juaari_uuid_to_id[o[1]][0]))

# Get all juaaris from the old table
cur.execute('SELECT * from purple_cap;')
purple_cap = cur.fetchall()

# Write all values to the new_juaaris table
for i, p in enumerate(purple_cap):
    cur.execute('INSERT INTO new_purple_cap (date, holder_id) VALUES (%s, %s);', (p[0].isoformat(), juaari_uuid_to_id[p[1]][0]))

conn.commit()
# print(juaari_id_to_uuid)
# save the dict to a json file

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
