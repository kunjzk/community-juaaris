#!/usr/bin/env python3
import uuid
import json
from datetime import datetime, timedelta
import pandas as pd

month_to_number_map = {
    'March': '03',
    'April': '04',
    'May': '05',
}
df = pd.read_csv('../csvs/All matches and results.csv')
matches = [] # Format: [match_number, first_team, second_team, venue, date, time_sgt, outcome_winning_team, outcome_total_score, outcome_more_or_less]]
for index, row in df.iterrows():
    if index > 69:
        break
    datestr = row['DATE']
    date = "2025-"+month_to_number_map[datestr.split(' ')[0]]+'-'+datestr.split(' ')[1]
    outcome_winning_team = "NULL"
    outcome_more_or_less = "NULL"
    if row['Result'] != '' and not pd.isna(row['Result']):
        outcome_winning_team = row['Result'][0:-1]
        outcome_more_or_less = "MORE" if row['Result'][-1:] == ">" else "LESS"
    matches.append([row['MATCH'], row['Team1'], row['Team2'], row['VENUE'], date, row['SGT'], outcome_winning_team, "NULL",outcome_more_or_less])

print(matches)

# Team UUIDs
team_uuids = {
    "KKR": "0e15ecb5-26b7-4a23-9103-500f4f88b365",
    "RCB": "9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a",
    "SRH": "6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53",
    "RR": "8d96a373-57e9-4b39-a81f-9b2bd9a33134",
    "CSK": "ea73347a-a243-4e3f-829c-06ba382ded12",
    "MI": "05ccf6c4-c7bb-486b-9487-28fd17d2dedd",
    "DC": "023f3967-cdc8-409a-ae44-0e98a4381b37",
    "LSG": "09e0b78b-5f75-479e-9f6c-501bac6e726a",
    "GT": "b1659aec-827c-4c99-b58e-52aa4ebb25b8",
    "PBKS": "56b2b5c3-6666-4c02-b436-2d8934f294dd"
}

# Venue UUIDs
venue_uuids = {
    "Kolkata": "288c830d-fa4a-478f-ba3f-311d50251c88",
    "Hyderabad": "44fe4eb1-0342-4dc4-8e96-e0f66f83a648",
    "Chennai": "67585d30-ecae-43d6-9152-32df7dcd061e",
    "Visakhapatnam": "91132c0a-bf06-44d6-9380-f2864f950f4d",
    "Ahmedabad": "64524cec-7f5f-45e0-a082-6425f683ee08",
    "Guwahati": "0eb6630d-3ebf-4b9b-b11c-bcdd43df7157",
    "Lucknow": "f5b09172-48f3-43f5-9727-70695a5f1c24",
    "Bengaluru": "6a8f82b0-9b42-44f9-b44d-dab75a2ed368",
    "Mumbai": "67c9ea53-b791-477c-abea-90eac8c4a20a",
    "New Chandigarh": "ff760c2d-4e7f-4aad-aa31-6930ce6d87c4",
    "Jaipur": "dd161096-c397-4e78-8110-f68dd6cc5f15",
    "Delhi": "4e851739-dabd-42f9-aae5-ed24f94c703e",
    "Dharamsala": "7ac9e82d-7055-4de9-bab8-74f5edb39cf1"
}

# Convert SGT time to UTC
def sgt_to_utc(time_sgt):
    # Parse the time string (format: "HH:MM")
    hours, minutes = map(int, time_sgt.split(':'))
    
    # Create a datetime object for today with the given time
    today = datetime.now().date()
    sgt_time = datetime.combine(today, datetime.min.time().replace(hour=hours, minute=minutes))
    
    # Subtract 8 hours to convert from SGT to UTC
    utc_time = sgt_time - timedelta(hours=8)
    
    # Format the time as "HH:MM:00+00"
    return utc_time.strftime("%H:%M:00+00")

# Generate SQL file
def generate_sql():
    sql = """-- Match data seed for Community Juaaris
-- Generated on {date}

DO $$
DECLARE
    -- Match UUIDs for all regular season matches
""".format(date=datetime.now().strftime("%Y-%m-%d"))

    # Generate match UUIDs
    for match in matches:
        match_num, team1, team2, venue, date, time_sgt, outcome_winning_team, outcome_total_score, outcome_more_or_less = match
        match_uuid = str(uuid.uuid4())
        sql += f"    match_{match_num}_id UUID := '{match_uuid}'; -- {team1} vs {team2}\n"

    sql += """
BEGIN
    -- Insert Matches (converting SGT to UTC by subtracting 8 hours)
    INSERT INTO matches (
        id, 
        first_team_id, 
        second_team_id, 
        venue_id, 
        datetime, 
        outcome_winning_team,
        outcome_total_score,
        outcome_more_or_less,
        bet_amount
    ) VALUES
"""

    # Generate match insert statements
    for match in matches:
        match_num, team1, team2, venue, date, time_sgt, outcome_winning_team, outcome_total_score, outcome_more_or_less = match
        utc_time = sgt_to_utc(time_sgt)
        sql += f"""    -- Match {match_num}: {team1} vs {team2} at {venue}
    (match_{match_num}_id,
     '{team_uuids[team1]}', -- {team1}
     '{team_uuids[team2]}', -- {team2}
     '{venue_uuids[venue]}', -- {venue}
     '{date} {utc_time}', -- {time_sgt} SGT converted to UTC
     '{team_uuids[outcome_winning_team] if outcome_winning_team != "NULL" else "NULL"}', -- Winning team
     '{outcome_total_score}', -- Total score
     '{outcome_more_or_less}', -- More or less
     {10 if match_num > 35 else 5}
    )"""

        if match_num < 70:
            sql += ",\n\n"
        else:
            sql += ";\n\n"

    sql += "END $$;\n"
    return sql

# Write to file
with open("out/py_match_data.sql", "w") as f:
    f.write(generate_sql())

print("Generated match data SQL file with unique UUIDs for all matches.") 