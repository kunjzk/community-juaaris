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

def fix_missing_win_history_entries():
    try:
        # First, get all juaaris
        cur.execute("SELECT id, display_name FROM new_juaaris ORDER BY id")
        juaaris = cur.fetchall()
        
        # Expected match IDs (1 through 57)
        expected_match_ids = set(range(1, 58))  # 1 to 57 inclusive
        
        print(f"Total juaaris: {len(juaaris)}")
        print("\n----- Fixing missing win history entries for each juaari -----\n")
        
        total_entries_added = 0
        
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
            
            # Find missing match IDs
            missing_match_ids = expected_match_ids - juaari_match_ids
            
            if missing_match_ids:
                print(f"Juaari {juaari_id} ({juaari_name}) missing {len(missing_match_ids)} match entries")
                print(f"Missing match IDs: {sorted(missing_match_ids)}")
                
                entries_added = 0
                
                # For each missing match ID
                for match_id in missing_match_ids:
                    # Find the bet for this juaari and match
                    cur.execute("""
                        SELECT id
                        FROM new_bets
                        WHERE juaari_id = %s AND match_id = %s
                        LIMIT 1
                    """, (juaari_id, match_id))
                    
                    bet_result = cur.fetchone()
                    
                    if bet_result:
                        bet_id = bet_result[0]
                        
                        # Insert a new win history entry
                        cur.execute("""
                            INSERT INTO new_juaari_win_history
                            (juaari_id, match_id, bet_id, delta_winnings_this_game, trivia_id)
                            VALUES (%s, %s, %s, NULL, NULL)
                        """, (juaari_id, match_id, bet_id))
                        
                        entries_added += 1
                        total_entries_added += 1
                    else:
                        print(f"  No bet found for match_id {match_id} - skipping")
                
                print(f"  Added {entries_added} new win history entries for juaari {juaari_id}")
                print("-" * 70)
            else:
                print(f"Juaari {juaari_id} ({juaari_name}): No missing entries - OK")
        
        # Commit the transaction
        conn.commit()
        print(f"\nTotal new win history entries added: {total_entries_added}")
    
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    fix_missing_win_history_entries() 