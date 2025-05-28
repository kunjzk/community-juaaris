import os
import psycopg2
from dotenv import load_dotenv

def get_all_juaaris(cur):
    try:
        cur.execute("SELECT * FROM new_juaaris")
        all_juaaris = cur.fetchall()
        juaaris_map = {}
        for j in all_juaaris:
            juaaris_map[j[0]] = j[1]
        return juaaris_map
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
        raise e

def get_all_teams(cur):
    try:
        cur.execute("SELECT * FROM new_teams")
        teams_data = cur.fetchall()
        teams = {}
        for t in teams_data:
            teams[t[0]] = t[1]
        return teams
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
        raise e

def get_matches_for_today(cur):
    try:
        # Get matches whose date = today's date
        today_date = datetime.datetime.(2025, 3, 27)
        cur.execute('''
                    SELECT *
                    FROM new_matches
                    LIMIT 10
                    ''', (today_date,))
        all_matches = cur.fetchall()
        return all_matches
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
        raise e

def get_bets_for_match(cur, match_id):
    try:
        cur.execute('''
                    SELECT *
                    FROM new_bets
                    JOIN new_juaaris ON new_bets.juaari_id = new_juaaris.id
                    WHERE match_id = %s
                    ''', (match_id,))
        all_bets = cur.fetchall()
        return all_bets
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
        raise e

def generate_message(match, teams, bets, all_juaaris):
    starter_text = f"Match {match["id"]}"

    # First, check if all bets are in
    if len(bets) == len(all_juaaris):
        return "All bets are in!"




if __name__ == "__main__":
    # Load .env file
    load_dotenv()
    print("Loading environment variables")

    # Get the connection string from the environment variable
    connection_string = os.getenv('LOCAL_DB_URL')

    # Connect to the database
    conn = psycopg2.connect(connection_string)
    cur = conn.cursor()
    try:
        all_juaaris = get_all_juaaris(cur)
        print(all_juaaris)
        teams = get_all_teams(cur)
        print(teams)
        today_matches = get_matches_for_today(cur)
        print(today_matches)
        for match in today_matches:
            bets = get_bets_for_match(cur, match.id)
            message_string = generate_message(match, teams, bets, all_juaaris)
            # status = send_message(message_string)
            status=True
            print(f"Status of message for match {match["id"]}: {message_string}")
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()