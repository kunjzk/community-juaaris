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

def insert_juaaris():
    print("Inserting into new_juaaris...")
    juaaris = pd.read_csv('neondb_backup/new_juaaris.csv')
    for i, row in juaaris.iterrows():
        cur.execute('''
            INSERT INTO new_juaaris (
                id, display_name, is_purple_capped, is_orange_capped,
                winnings, defaults_remaining
            ) VALUES (%s, %s, %s, %s, %s, %s);
        ''', (
            row['id'],
            row['display_name'],
            row['is_purple_capped'],
            row['is_orange_capped'],
            row['winnings'],
            row['defaults_remaining']
        ))

def insert_gameplay_rules():
    print("Inserting into new_gameplay_rules...")
    rules = pd.read_csv('neondb_backup/new_gameplay_rules.csv')
    for i, row in rules.iterrows():
        cur.execute('''
            INSERT INTO new_gameplay_rules (
                id,days_in_advance_for_bet,max_defaults,second_dimension_cutoff,last_bet_cutoff_hours,effective_from
            ) VALUES (%s, %s, %s, %s, %s, %s);
        ''', (
            row['id'],
            row['days_in_advance_for_bet'],
            row['max_defaults'],
            row['second_dimension_cutoff'],
            row['last_bet_cutoff_hours'],
            row['effective_from']
        ))

def insert_bets():
    print("Inserting into new_bets...")
    bets = pd.read_csv('neondb_backup/new_bets.csv')
    for i, row in bets.iterrows():
        cur.execute('''
            INSERT INTO new_bets (
                id,match_id,juaari_id,predicted_winning_team,predicted_more_or_less,successful,default_bet
            ) VALUES (%s, %s, %s, %s, %s, %s, %s);
        ''', (
            row['id'],
            row['match_id'],
            row['juaari_id'],
            row['predicted_winning_team'],
            row['predicted_more_or_less'],
            row['successful'] if pd.notna(row['successful']) else None,
            row['default_bet']
        ))

def insert_bumpers():
    print("Inserting into bumpers...")
    bumpers = pd.read_csv('neondb_backup/bumpers.csv')
    for i, row in bumpers.iterrows():
        cur.execute('''
            INSERT INTO bumpers (
                id, bet_id, bumper, mini_bumper
            ) VALUES (%s, %s, %s, %s);
        ''', (
            row['id'],
            row['bet_id'],
            row['bumper'],
            row['mini_bumper']
        ))

def insert_juaari_win_history():
    print("Inserting into new_juaari_win_history...")
    jwh = pd.read_csv('neondb_backup/new_juaari_win_history.csv')
    for i, row in jwh.iterrows():
        cur.execute('''
            INSERT INTO new_juaari_win_history (
                juaari_id, date, bet_id, match_id,
                delta_winnings_this_game, accumulated_winnings
            ) VALUES (%s, %s, %s, %s, %s, %s);
        ''', (
            row['juaari_id'],
            row['date'],
            row['bet_id'],
            row['match_id'],
            row['delta_winnings_this_game'],
            row['accumulated_winnings']
        ))

def insert_orange_cap():
    print("Inserting into new_orange_cap...")
    orange_cap = pd.read_csv('neondb_backup/new_orange_cap.csv')
    for i, row in orange_cap.iterrows():
        cur.execute('''
            INSERT INTO new_orange_cap (
                date, holder_id
            ) VALUES (%s, %s);
        ''', (
            row['date'],
            row['holder_id']
        ))

def insert_purple_cap():
    print("Inserting into new_purple_cap...")
    purple_cap = pd.read_csv('neondb_backup/new_purple_cap.csv')
    for i, row in purple_cap.iterrows():
        cur.execute('''
            INSERT INTO new_purple_cap (
                date, holder_id
            ) VALUES (%s, %s);
        ''', (
            row['date'],
            row['holder_id']
        ))

def insert_party_fund():
    print("Inserting into party_fund...")
    party_fund = pd.read_csv('neondb_backup/party_fund.csv')
    for i, row in party_fund.iterrows():
        cur.execute('''
            INSERT INTO party_fund (
                date, fund
            ) VALUES (%s, %s);
        ''', (
            row['date'],
            row['fund']
        ))

try:
    # Execute inserts in the correct order based on dependencies
    # insert_juaaris()
    # insert_gameplay_rules()
    # insert_bets()
    # insert_bumpers()
    insert_juaari_win_history()
    # insert_orange_cap()
    # insert_purple_cap()
    # insert_party_fund()
    
    # Commit all changes
    conn.commit()
    print("All data inserted successfully!")
    
except Exception as e:
    print(f"An error occurred: {e}")
    conn.rollback()
    
finally:
    # Clean up
    cur.close()
    connection_pool.putconn(conn)
    connection_pool.closeall() 