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

# Add the outcome_washout column to the matches table
# cur.execute('''
#     ALTER TABLE new_matches ADD COLUMN outcome_washout BOOLEAN DEFAULT FALSE;
# ''')


# Alter the valid more or less constraint to include the 'INVALID' value
# cur.execute('''
#     ALTER TABLE new_matches ADD CONSTRAINT valid_more_or_less CHECK (outcome_more_or_less IN ('MORE', 'LESS', 'INVALID'));
# ''')

# cur.execute('''
#     ALTER TABLE new_matches ADD COLUMN outcome_washout BOOLEAN DEFAULT FALSE;
# ''')

# Check the current column type
cur.execute('''
    SELECT data_type, numeric_precision, numeric_scale 
    FROM information_schema.columns 
    WHERE table_name = 'new_juaari_win_history' 
    AND column_name = 'delta_winnings_this_game';
''')
print("Current column type:", cur.fetchone())

# First drop any existing constraints that might prevent the type change
cur.execute('''
    ALTER TABLE new_juaari_win_history 
    ALTER COLUMN delta_winnings_this_game TYPE DECIMAL(10,2) 
    USING delta_winnings_this_game::DECIMAL(10,2);
''')

# Verify the change
cur.execute('''
    SELECT data_type, numeric_precision, numeric_scale 
    FROM information_schema.columns 
    WHERE table_name = 'new_juaari_win_history' 
    AND column_name = 'delta_winnings_this_game';
''')
print("Column type after alteration:", cur.fetchone())

conn.commit()
cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()