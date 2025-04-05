# SQL Stuff

- Using NeonDB, for now (no backend)

`init.sql` contains DDL for defining database structure.

## Migrations

- `migrations/` folder contains DML for altering initial structure.

## Seed

- `csvs/` contains initial seed CSV data
- `sql` contains DML for inserting it

## Cursor prompts

### Note

Cursor was great, but failed at parsing complicated CSVs and translating them to SQL statements. Where needed, I used python scripts to parse the data and create blocks of SQL, still abiding by the overall SQL script structure created by the cursor AI agent.

### Transfer all match, bet and winnings data from CSV to SQL

Ok, the next up is the hard one. Using the new "All matches and results" CSV, I need you to extract data for and figure out what values to put in the following tables:. It doesnt need to be in this order but this probably makes the most sense.

1. matches
2. bets
3. juaari_win_history
4. orange_cap
5. purple_cap
6. party_fund

This will be tricky, but it needs to be 100% accurate, so if you are lost at any point please ask me. It is super important to maintain data integrity here, so be very very careful.

Some notes to help:

1. Please use the UUIDs for teams , juaaris and venues desribed in seed_uuids.txt.
2. "matches" table: The first 10 columns can be used to populate the Matches table. Columns 5 and 6 can be ignored, those are the full form of thh team names. Please generate a UUID for each match, as we'll need to reference this later.
3. "matches" table: The date and time are in separate columns, but in postgres we have a single datetime field, and I'd like to stick to using the SGT timezone.
4. "matches" table: The last 4 matches are the semi finals and finals, and for which none of the teams have qualified yet. Please leave the necessary fields blank (or if not possible, put some placeholder team value for now and make a note in the script as well as the readme to adjust this later).
5. "matches" table: The "outcome_winning_team" field and "outcome_more_or_less" field need to be populated by inspecting the "Result" column in the CSV. The values in this column contain the winning team (eg RCB) as well as whether the outcome was more or less based on the comparison operator: > means MORE and < means LESS.
6. "bets" table: After the "Bet amount" column, the next 14 columns correspond to the bets that each juaari made for that match. Use this data to populate the bets table. the values in these columns need some special parsing, each one is a composite string containing a "predicted_winning_team" (eg KKR, RCB) and a value for "predicted_more_or_less". The bet_amount is the same as the bet amount for the match. If the juaari's bet is identical to teh value in the "Result" column, then "successful" is TRUE, else it is FALSE. If there is no value in the "Result" column, the match hasn't been completed yet. "bumper" is true if the juaari's bet was unique for that match (ie nobody else bet on that outcome) and "mini bumper" is true if only 2 juaari's bet on that particular outcome. Again, we need a Bet UUID for each bet which we will reference after this.
7. "juaari_win_history' table: The 14 columns after "Result" correspond to the amout of money each player has cumulatively won or lost after a game. If a player gets a bet wrong, they lose the "bet amount". If they got the bet right, then they receive the total amount bet for that game divided by the number of people that got the bet right. Use these values to populate the accumulated_winnings field, and infer the value of the "delta_winnings_this_game" field, which is the difference in accumulated winnings between the current match and the previous one (in this case of the first match, consider the accumulated winnings from the previous one to be 0). The date field in this table corresponds to the datetime of the match.
8. "party_fund" table: You can populate the values in this table with the values in the last column of the csv. Basically, the party fund is the absolute value of the sum of the cumulative losses (i.e accumulated_winnings < 0) across all juaaris. With every match therefore, the party fund changes.
9. "purple_cap" table: populate this table with the ID of the player who has the highest accumulated winnings after each game. The most recent entry in this table should match the ID of the juaari for whom "is_purple_cap" is true in the seeded juaaris table.
10. "orange_cap" table: populate this table with the ID of the player who has the lowest accumulated winnings after each game. The most recent entry in this table should match the ID of the juaari for whom "is_orange_cap" is true in the seeded juaaris table.

That should be all. Please be careful, and pause to ask for help and confirmation wherever you need it. Please also advise me on how I can quickly verify the accuracy of your SQL data insertion statements.
