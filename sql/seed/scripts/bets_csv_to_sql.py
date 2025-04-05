import pandas as pd

df = pd.read_csv('../csvs/bets.csv')

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
    'DC': 'dc_id',
}

sign_to_more_or_less_map = {
    '>': 'MORE',
    '<': 'LESS',
}

def create_bet_sql(index,row):
    sql = f"""
    INSERT INTO bets (match_id, juaari_id, predicted_winning_team, predicted_more_or_less, bet_amount, successful) VALUES\n
    """
    result = row['Result']
    for idx, name in enumerate(row.index):
        if name == "Result":
            continue
        end_char = ";\n\n" if idx == len(row) - 1 else ",\n"
        juaari_id = juaari_name_to_id_variable_map[name]
        predicted_winning_team = team_to_id_variable_map[row[name][:-1]]
        predicted_more_or_less = sign_to_more_or_less_map[row[name][-1]] 
        successful = "TRUE" if result == row[name] else "FALSE"
        sql+=f"(match_{index+1}_id, {juaari_id}, {predicted_winning_team}, '{predicted_more_or_less}', {5}, {successful})"+end_char
    
    return sql


sql = ""

# Iterate through all rows of the dataframe
for index, row in df.iterrows():
    sql += create_bet_sql(index, row)

with open(f'out/003_bet_data.sql', 'w') as f:
    f.write(sql)

