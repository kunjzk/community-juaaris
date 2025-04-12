import os
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
# Execute SQL commands to retrieve the current time and version from PostgreSQL
cur.execute('SELECT * from gameplay_rules;')

gameplay_rules = cur.fetchall()
# Close the cursor and return the connection to the pool

# Print the results
print(gameplay_rules)

# Write all values to the new_gameplay_rules table
for rule in gameplay_rules:
    cur.execute('INSERT INTO new_gameplay_rules (days_in_advance_for_bet, max_defaults, second_dimension_cutoff, last_bet_cutoff_hours, effective_from) VALUES (%s, %s, %s, %s, %s);', (rule[1], 5, rule[3], 2, rule[0]))

# Commit the changes
conn.commit()

cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()