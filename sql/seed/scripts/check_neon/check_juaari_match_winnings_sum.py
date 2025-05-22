import os
import json
from psycopg2 import pool
from dotenv import load_dotenv
import psycopg2

# Load .env file
load_dotenv()
print("Loading environment variables")
print(os.getenv('DATABASE_URL'))
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


def check_juaari_match_winnings(juaari_id):
    
    try:
        # Query to sum match winnings (where match_id is not NULL and trivia_id is NULL)
        query = """
        SELECT 
            juaari_id,
            SUM(delta_winnings_this_game) AS total_match_winnings
        FROM 
            new_juaari_win_history
        WHERE 
            juaari_id = %s
            AND match_id IS NOT NULL
            AND trivia_id IS NULL
        GROUP BY 
            juaari_id
        """
        
        # Execute the query with juaari_id parameter
        cur.execute(query, (juaari_id,))
        
        # Fetch the result
        result = cur.fetchone()
        
        if result:
            print(f"Juaari ID: {juaari_id}")
            print(f"Total match winnings: {result[1]}")
        else:
            print(f"No match winnings found for juaari ID: {juaari_id}")
            
        # Query to get a breakdown of all win history entries for this juaari
        detail_query = """
        SELECT 
            match_id,
            trivia_id,
            delta_winnings_this_game
        FROM 
            new_juaari_win_history
        WHERE 
            juaari_id = %s
            AND match_id IS NOT NULL
            AND trivia_id IS NULL
        ORDER BY 
            match_id
        """
        
        cur.execute(detail_query, (juaari_id,))
        details = cur.fetchall()
        
        if details:
            print("\nDetailed breakdown:")
            print("Match ID | Delta Winnings | Cumulative Sum")
            print("----------------------------------------")
            
            # Initialize cumulative sum
            cumulative_sum = 0
            
            for row in details:
                match_id = row[0]
                delta_winnings = row[2]
                cumulative_sum += delta_winnings
                
                print(f"{match_id}      | {delta_winnings:12.2f} | {cumulative_sum:13.2f}")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        connection_pool.putconn(conn)
        # Close all connections in the pool
        connection_pool.closeall()
        conn.close()

# Example usage:
if __name__ == "__main__":
    # Replace with the juaari_id you want to check
    juaari_id = 1  
    
    # Command-line argument handling
    import sys
    if len(sys.argv) > 1:
        try:
            juaari_id = int(sys.argv[1])
        except ValueError:
            print("Error: juaari_id must be an integer")
            sys.exit(1)
    
    check_juaari_match_winnings(juaari_id)