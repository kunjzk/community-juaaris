# community-juaaris

IPL site for the $$

## Run locally

1. Clone repo
2. `npm run dev`

## Designs

Figma: https://www.figma.com/design/DMyWfAbupmqbiXH60ZAeGy/IPL-Bet-site?node-id=0-1&t=Nz7Rse5bugtYuVrR-1

## Project notes

1. Page design done with v0, free tier isn't too generous, might try easel: https://www.tryeasel.dev
2. For reasons explained below, we will use NeonDB + Vercel. Luckily a separate backend is not required. We can "expose" APIs for the react component's consumption by defining js files in a new directory.
3. Integrating Vercel with NeonDB + local development
   - Spin up a NeonDB instance from the vercel dashboard. Got an instance in SG, default settings.
   - For speed we will create tables using the neondb console instead of CLI or anything else.
   - Use Cursor to generate the DDL from the Eraser ERD code. SQL is in the `sql` directory in project root. Migration instructions there too - important to version control all changes.
4. Data transformation & upload to DB
   - Asking cursor to read CSVs and create SQL statements is super duper error prone. It hallucinates like anything and struggles to implement complicated text parsing logic, and performing data processing based on "businesses logic".
   - UUIDs are a pain to work with when uploading data. Would have been way easier to use ints initially, then alter tables later on to use UUID maybe?
   - Solution: write business logic (parsing CSV) yourself, use cursor to generate python scripts that generate SQL.
   - postgres schema validations is a LIFESAVER! Saved me from so many cursor hallucinations and painful debugging later on. Always always do this!
5. State, context and localStorage:
   - We call the database api to retrieve this week's games when the home page loads.
   - This data is saved to react state, and then react context for easy sharing.
   - We also want to save the data to local storage so that it persists across refreshes. Flow:
     - App is first loaded, matches are retrieved and stored to localStorage and context
     - When the app is refreshed, context and state are reset to their intial values. So we can have a useEffect hook that reads matches from localStorage and persists the data in Context's `matches` variable. This way, I can always get matches from the context, even after a refresh, from any page.

## Database Modelling & Choice

- 2 choices for databases (on vercel): JSON blob storage (beta) or Postgres. Tradeoff between complexity and exrepssiveness. Depends on requirements.

### Requirements

I want to see:

1. Gameplay rules
2. A listing of all matches for the week
3. Winnings over time for all juaaris
4. All betting and succees history for each juaari
5. Purple cap history, orange cap history
6. Party fund history (total party fund and contribution per person)

Data to be stored:

1. Match data
   - At the bare minimum, we want to store the list of matches and associated results.
2. Juaari data
   - Juaari name, all bets placed, defaults, winnings/losses over time
3. Gameplay data (display this on a separate page)
   - Number of days in advance that a bet can be placed
   - Maximum number of default bets per player
   - Second dimension cutoff
   - Cutoff time for placing bets

### Data Model

Eraser link: https://app.eraser.io/workspace/RRcqhQoAn4xWIMkP0FOX?origin=share
![Data model](/images/data_model.png)

### Conclusion

Given the need for time series processing and filtering, as well as foreign key relationships between entitites, postgres is the better choice. We shall use NeonDB integration with Vercel. Woohoo.

# Changelog

| Date       | Version | Release Notes                                                                                                                        |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 03/04/2025 | v0.1.0  | Initial release with responsive design for mobile devices. 3 pages: game list, bets standings. No user interaction for now           |
| 05/04/2025 | v0.2.0  | Initialized vercel + postgres, then hours of laborious database migration work.                                                      |
| 06/04/2025 | v0.3.0  | Migrated entire dabase, home page renders dynmically, tried to vibe code the bets page but it sucked                                 |
| 07/04/2025 | v0.4.0  | Reverted all vibe coded changes, got basic vercel + neondb rendering to work for home page                                           |
| 09/04/2025 | v0.5.0  | Bets page renders matches and context works                                                                                          |
| 10/04/2025 | v0.6.0  | Match data saved to localStorage, standings page renders table. Left with bet read/write, DB changes, and result upload + db changes |
| 12/04/2025 | v0.7.0  | Dropped UUIDs, such a pain. Slight DB schema refactoring. So important to get this right the first time!                             |

## TODO

- Add playoff matches (71-74) to the database once teams are determined
- Update team IDs and other relevant data for these matches:
  - Semi-final 1 (Match 71)
  - Semi-final 2 (Match 72)
  - Qualifier (Match 73)
  - Final (Match 74)
- Add funationality in database to share purple and orange caps. For now they just go to the first index.
- Figure out a way to inject the postgres DATABASE*URL without leaking it to the browser. Prefixing it with VITE* will leak it to the browser - if you inspect element and open sources -> the js file, search for "postgres://", you'll see the database connection string right there!
