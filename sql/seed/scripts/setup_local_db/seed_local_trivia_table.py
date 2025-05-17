import os
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
if connection_pool:
    print("Connection pool created successfully")

# Get a connection from the pool
conn = connection_pool.getconn()
cur = conn.cursor()
conn.rollback()

# Trivia data to insert
trivia_data = [
    (28, "Number of wickets lost by the side bating first", "0-3", "4-5", "6-7", "8-10", 5, "RR vs RCB - 13/4/25"),
    (35, "How many runs will Gill make?", "0 to 24", "25 to 35", "36 to 50", ">50", 5, "GT vs DC - 19/4/25"),
    (37, "Number of sixes in the match", "0-14", "15 to 18", "19 to 22", "more than 22", 5, "PBKS vs RCB - 20/4/25"),
    (44, "Number of wickets lost in the powerplay (first 6 overs) by the side batting first", "0", "1", "2", ">2", 5, "KKR vs PBKS - 26/4/25"),
    (45, "Number of runs scored in the powerplay (first 6 overs) by the side batting first", "<=40", "41-50", "51-60", ">60", 5, "MI vs LSG - 27/4/25"),
    (52, "Number of runs scored in the last 5 overs by the side batting first", "<=42", "43-49", "50-56", ">56", 5, "RCB vs CSK - 3/5/25"),
    (53, "Number of wickets lost in the last 5 overs (16-20) by the side batting first", "0 or 1", "2", "3", "more than 3", 5, "KKR vs RR - 4/5/25"),
    (58, "Number of players scoring >=25 in the match", "<=4", "5-6", "7-8", ">8", 5, "RCB vs KKR - 17/5/25"),
    (61, "Highest score by an individual in the match", "<50", "51-60", "61-70", ">70", 5, "PBKS vs MI - 18/5/25"),
    (70, "Highest number of wickets taken by an individual in the match", "2 or less", "3", "4", ">4", 5, "GT vs CSK - 25/5/25"),
]

try:
    for entry in trivia_data:
        cur.execute(
            """
            INSERT INTO trivia (
                match_id, question, option_a, option_b, option_c, option_d, bet_amount, match_name
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
            """,
            entry
        )
    conn.commit()
    print("Trivia data seeded successfully.")
except Exception as e:
    print("Error inserting trivia data:", e)
    conn.rollback()
finally:
    cur.close()
    connection_pool.putconn(conn)
    connection_pool.closeall()
