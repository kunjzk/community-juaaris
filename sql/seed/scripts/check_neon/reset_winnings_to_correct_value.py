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

def reset_winnings():
    try:
        # Get all juaaris
        cur.execute("SELECT id, display_name, winnings, match_winnings, trivia_winnings FROM new_juaaris ORDER BY id")
        juaaris = cur.fetchall()
        
        print(f"Total juaaris: {len(juaaris)}")
        print("\n----- Calculating and resetting winnings for each juaari -----\n")
        
        for juaari_id, juaari_name, current_winnings, current_match_winnings, current_trivia_winnings in juaaris:
            # Calculate match winnings
            cur.execute("""
                SELECT COALESCE(SUM(delta_winnings_this_game), 0)
                FROM new_juaari_win_history
                WHERE juaari_id = %s
                AND match_id IS NOT NULL
                AND trivia_id IS NULL
            """, (juaari_id,))
            
            calculated_match_winnings = cur.fetchone()[0] or 0
            
            # Calculate trivia winnings
            cur.execute("""
                SELECT COALESCE(SUM(delta_winnings_this_game), 0)
                FROM new_juaari_win_history
                WHERE juaari_id = %s
                AND match_id IS NULL
                AND trivia_id IS NOT NULL
            """, (juaari_id,))
            
            calculated_trivia_winnings = cur.fetchone()[0] or 0
            
            # Calculate total winnings
            calculated_total_winnings = calculated_match_winnings + calculated_trivia_winnings
            
            # Print current and calculated values
            print(f"Juaari {juaari_id} ({juaari_name}):")
            print(f"  Current values: winnings={current_winnings}, match_winnings={current_match_winnings}, trivia_winnings={current_trivia_winnings}")
            print(f"  Calculated values: winnings={calculated_total_winnings}, match_winnings={calculated_match_winnings}, trivia_winnings={calculated_trivia_winnings}")
            
            # Update the juaari record with calculated values
            cur.execute("""
                UPDATE new_juaaris
                SET winnings = %s,
                    match_winnings = %s,
                    trivia_winnings = %s
                WHERE id = %s
            """, (calculated_total_winnings, calculated_match_winnings, calculated_trivia_winnings, juaari_id))
            
            print(f"  Updated successfully.")
            print("-" * 70)
        
        # Commit the transaction
        conn.commit()
        print("\nAll juaari winnings have been reset to the correct values.")
    
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    reset_winnings()
