import os
import psycopg2
from dotenv import load_dotenv

# Load .env file
load_dotenv()
print("Loading environment variables")

# Get the connection string from the environment variable
connection_string = os.getenv('DATABASE_URL')

# Connect to the database
conn = psycopg2.connect(connection_string)
cur = conn.cursor()

def check_juaari_match_entries():
    try:
        # First, get all juaaris
        cur.execute("SELECT id, display_name FROM new_juaaris ORDER BY id")
        juaaris = cur.fetchall()
        
        # Expected match IDs (1 through 57)
        expected_match_ids = set(range(1, 58))  # 1 to 57 inclusive
        
        print(f"Total juaaris: {len(juaaris)}")
        print(f"Expected match entries per juaari: 57")
        print("\n----- Checking win history entries for each juaari -----\n")
        
        for juaari_id, juaari_name in juaaris:
            # Get the match IDs this juaari has entries for
            cur.execute("""
                SELECT match_id
                FROM new_juaari_win_history
                WHERE juaari_id = %s
                AND match_id IS NOT NULL
                AND trivia_id IS NULL
                ORDER BY match_id
            """, (juaari_id,))
            
            juaari_match_ids = set(row[0] for row in cur.fetchall())
            count = len(juaari_match_ids)
            
            if count < 57:
                # Find missing match IDs
                missing_match_ids = expected_match_ids - juaari_match_ids
                
                print(f"Juaari {juaari_id} ({juaari_name}): {count} entries - MISSING {57 - count} ENTRIES")
                print(f"Missing match IDs: {sorted(missing_match_ids)}")
                print("-" * 70)
            else:
                print(f"Juaari {juaari_id} ({juaari_name}): {count} entries - OK")
    
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    check_juaari_match_entries()
