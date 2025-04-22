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

tables = ["new_teams", "new_venues", "new_gameplay_rules", "new_juaaris", "new_matches", "new_bets", "bumpers", "party_fund", "new_juaari_win_history", "new_purple_cap", "new_orange_cap"]
table_name_idx = 0
for i in range(len(tables)):
    table_name_idx = i
    print("Checking table ", tables[table_name_idx] )
    cur.execute(f'SELECT * FROM {tables[table_name_idx]}')
    res = cur.fetchall()
    print(res)

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()