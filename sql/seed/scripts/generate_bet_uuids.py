#!/usr/bin/env python3
import uuid
import pandas as pd
from datetime import datetime

# Read the bets CSV file
df = pd.read_csv('../csvs/bets.csv')

# Juaari name to ID variable map
juaari_name_to_id_variable_map = {
    'Pratibha': 'pratibha_id',
    'Anshu': 'anshu_id',
    'Madan': 'madan_id',
    'Reena': 'reena_id',
    'Suresh': 'suresh_id',
    'Pamela': 'pamela_id',
    'Sanjeev': 'sanjeev_id',
    'Archit': 'archit_id',
    'S.Laks': 'slaks_id',
    'Sanjana': 'sanjana_id',
    'Rajiv': 'rajiv_id',
    'Nidhi': 'nidhi_id',
    'Prachi': 'prachi_id',
    'Kunal': 'kunal_id',
}

# Team to ID variable map
team_to_id_variable_map = {
    'KKR': 'kkr_id',
    'RCB': 'rcb_id',
    'SRH': 'srh_id',
    'RR': 'rr_id',
    'CSK': 'csk_id',
    'MI': 'mi_id',
    'DC': 'dc_id',
    'LSG': 'lsg_id',
    'GT': 'gt_id',
    'PBKS': 'pbks_id',
}

# Sign to more or less map
sign_to_more_or_less_map = {
    '>': 'MORE',
    '<': 'LESS',
}

# Generate SQL file
def generate_sql():
    sql = """-- Bet data seed for Community Juaaris
-- Generated on {date}

DO $$
DECLARE
    -- Match UUIDs from 002_match_data.sql
    match_1_id UUID := '0e15ecb5-26b7-4a23-9103-500f4f88b365'; -- KKR vs RCB
    match_2_id UUID := '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a'; -- SRH vs RR
    match_3_id UUID := '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53'; -- CSK vs MI
    match_4_id UUID := '8d96a373-57e9-4b39-a81f-9b2bd9a33134'; -- DC vs LSG
    match_5_id UUID := 'ea73347a-a243-4e3f-829c-06ba382ded12'; -- GT vs PBKS
    match_6_id UUID := '05ccf6c4-c7bb-486b-9487-28fd17d2dedd'; -- RR vs KKR
    match_7_id UUID := '023f3967-cdc8-409a-ae44-0e98a4381b37'; -- SRH vs LSG
    match_8_id UUID := '09e0b78b-5f75-479e-9f6c-501bac6e726a'; -- CSK vs RCB
    match_9_id UUID := 'b1659aec-827c-4c99-b58e-52aa4ebb25b8'; -- GT vs MI
    match_10_id UUID := '56b2b5c3-6666-4c02-b436-2d8934f294dd'; -- DC vs SRH
    match_11_id UUID := '0e15ecb5-26b7-4a23-9103-500f4f88b365'; -- RR vs CSK
    match_12_id UUID := '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a'; -- MI vs KKR
    match_13_id UUID := '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53'; -- LSG vs PBKS
    match_14_id UUID := '8d96a373-57e9-4b39-a81f-9b2bd9a33134'; -- RCB vs GT
    match_15_id UUID := 'ea73347a-a243-4e3f-829c-06ba382ded12'; -- KKR vs SRH
    match_16_id UUID := '05ccf6c4-c7bb-486b-9487-28fd17d2dedd'; -- LSG vs MI
    match_17_id UUID := '023f3967-cdc8-409a-ae44-0e98a4381b37'; -- CSK vs DC
    match_18_id UUID := '09e0b78b-5f75-479e-9f6c-501bac6e726a'; -- PBKS vs RR

    -- Juaari UUIDs from seed_uuids.txt
    madan_id UUID := 'ff2c177f-7ed9-42a1-8180-2cef8f0c072f';
    anshu_id UUID := 'b3d480e4-f868-4c7f-bc3d-3db38c62a38a';
    pratibha_id UUID := 'ccfb2098-6fde-405f-ba80-2b153bab89ef';
    reena_id UUID := 'be08b4a2-b430-48c7-b56a-cb34b71eaae1';
    suresh_id UUID := '9f40dba6-7f53-4f4c-a1d5-54aad2ae9058';
    pamela_id UUID := '3a281f9b-1b23-4a3f-ac3a-887571c96612';
    sanjeev_id UUID := '24dfbdaa-8839-4692-bec5-ba213062c9e9';
    archit_id UUID := '97695455-d3ab-49ae-9feb-f385117e360a';
    slaks_id UUID := '80a2604a-399f-48e3-a22b-989b035dee02';
    sanjana_id UUID := '0d7f55eb-c101-4366-b01c-12c78dd0dc42';
    rajiv_id UUID := '278e27c7-c1d0-47eb-a17e-206dfae0ab54';
    nidhi_id UUID := '091e4931-51e7-4e2f-9277-30f34ebf006e';
    prachi_id UUID := 'f5f3efe6-36ee-4d5b-81e7-0e380b1e4785';
    kunal_id UUID := '22366429-c4ff-4cec-bd43-2e3c6dc6d676';

    -- Team UUIDs from seed_uuids.txt
    kkr_id UUID := '0e15ecb5-26b7-4a23-9103-500f4f88b365';
    rcb_id UUID := '9198b9ed-3cfd-41ad-b4fa-dffd5ea9219a';
    srh_id UUID := '6c4d7ebd-a3b7-4614-8ace-4a4b9cc4df53';
    rr_id UUID := '8d96a373-57e9-4b39-a81f-9b2bd9a33134';
    csk_id UUID := 'ea73347a-a243-4e3f-829c-06ba382ded12';
    mi_id UUID := '05ccf6c4-c7bb-486b-9487-28fd17d2dedd';
    dc_id UUID := '023f3967-cdc8-409a-ae44-0e98a4381b37';
    lsg_id UUID := '09e0b78b-5f75-479e-9f6c-501bac6e726a';
    gt_id UUID := 'b1659aec-827c-4c99-b58e-52aa4ebb25b8';
    pbks_id UUID := '56b2b5c3-6666-4c02-b436-2d8934f294dd';

    -- Bet UUIDs
""".format(date=datetime.now().strftime("%Y-%m-%d"))

    # Generate bet UUIDs
    bet_uuid_counter = 1
    for match_index, row in df.iterrows():
        for juaari_name in row.index:
            if juaari_name == "Result":
                continue
            bet_uuid = str(uuid.uuid4())
            sql += f"    bet_{match_index+1}_{bet_uuid_counter}_id UUID := '{bet_uuid}';  -- Match {match_index+1}, {juaari_name}\n"
            bet_uuid_counter += 1

    sql += """
BEGIN
    
    INSERT INTO bets (id, match_id, juaari_id, predicted_winning_team, predicted_more_or_less, bet_amount, successful) VALUES
"""

    # Generate bet insert statements
    bet_counter = 1
    for match_index, row in df.iterrows():
        result = row['Result']
        for juaari_name in row.index:
            if juaari_name == "Result":
                continue
            
            juaari_id = juaari_name_to_id_variable_map[juaari_name]
            predicted_winning_team = team_to_id_variable_map[row[juaari_name][:-1]]
            predicted_more_or_less = sign_to_more_or_less_map[row[juaari_name][-1]]
            successful = "TRUE" if result == row[juaari_name] else "FALSE"
            
            sql += f"    (bet_{match_index+1}_{bet_counter}_id, match_{match_index+1}_id, {juaari_id}, {predicted_winning_team}, '{predicted_more_or_less}', {5}, {successful})"
            
            if match_index < len(df) - 1 or juaari_name != list(row.index)[-2]:
                sql += ",\n"
            else:
                sql += ";\n"
            
            bet_counter += 1

    sql += "\nEND $$;\n"
    return sql

# Write to file
with open("out/py_bet_data.sql", "w") as f:
    f.write(generate_sql())

print("Generated bet data SQL file with unique UUIDs for all bets.") 