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

| Date       | Version | Release Notes                                                                                                              |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| 03/04/2024 | v0.1.0  | Initial release with responsive design for mobile devices. 3 pages: game list, bets standings. No user interaction for now |
