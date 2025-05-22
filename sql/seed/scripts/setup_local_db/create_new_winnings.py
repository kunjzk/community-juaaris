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

cur.execute('''
ALTER TABLE new_juaaris 
ADD COLUMN match_winnings DECIMAL(10,2),
ADD COLUMN trivia_winnings DECIMAL(10,2);

UPDATE new_juaaris j
SET match_winnings = COALESCE((
  SELECT SUM(wh.delta_winnings_this_game)
  FROM new_juaari_win_history wh
  WHERE wh.juaari_id = j.id
  AND wh.match_id IS NOT NULL
  AND wh.trivia_id IS NULL
), 0);

UPDATE new_juaaris j
SET trivia_winnings = COALESCE((
  SELECT SUM(wh.delta_winnings_this_game)
  FROM new_juaari_win_history wh
  WHERE wh.juaari_id = j.id
  AND wh.trivia_id IS NOT NULL
  AND wh.match_id IS NULL
), 0);
'''
)


conn.commit()
cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()