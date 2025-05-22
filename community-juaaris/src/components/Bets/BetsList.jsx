import React, { useState, useEffect } from "react";
import BetCard from "./BetCard";
import WinnerCard from "./WinnerCard";
import { useParams } from "react-router-dom";
import { useMatchesContext } from "../../contexts/matches";
import { useNavigate } from "react-router-dom";
import { getJuaaris } from "../../api/juaaris";
import {
  getBetsForGame,
  updateBet,
  createBet,
  getLargestBetId,
  insertBetIntoJuaariWinHistory,
} from "../../api/bets";

function getMatchIdFromParams(params, matches) {
  let matchId = parseInt(params.matchId);
  if (matchId) {
    console.log("Match ID from params:", matchId);
    return matchId;
  }
  if (!matchId) {
    matchId = matches[0].id;
    console.log("No match ID from params, using first match ID: ", matchId);
  }
  return matchId;
}

function getBetForJuaari(combinedJuaarisAndBets, juaariId) {
  const juaariEntry = combinedJuaarisAndBets.find((jb) => jb.id === juaariId);
  return juaariEntry ? juaariEntry.bet : null;
}

function BetsList() {
  const {
    matches,
    getMatchById,
    getPreviousMatch,
    getNextMatch,
    getWinningTeamName,
  } = useMatchesContext();
  const navigate = useNavigate();

  // Get matchId from params
  let params = useParams();
  let matchId = getMatchIdFromParams(params, matches);
  const match = getMatchById(matchId);
  console.log("MATCH IS:", match);
  const [isCutoffExceeded, setIsCutoffExceeded] = useState(false);
  const [isWinnerDeclared, setIsWinnerDeclared] = useState(false);
  const [winningBet, setWinningBet] = useState({
    winningTeam: null,
    moreOrLess: null,
  });

  useEffect(() => {
    const checkCutoff = () => {
      let cutoffTime = new Date(match.datetime);
      cutoffTime.setHours(cutoffTime.getHours() - 2);
      console.log("Cutoff time:", cutoffTime);
      const now = new Date();
      if (now > cutoffTime) {
        console.log("Cutoff time exceeded");
        setIsCutoffExceeded(true);
      } else {
        console.log("Cutoff time not exceeded");
        setIsCutoffExceeded(false);
      }
    };
    checkCutoff();
    const checkWinningBet = () => {
      if (
        getWinningTeamName(match) !== null ||
        match.outcome_washout === true
      ) {
        setWinningBet({
          winningTeam: getWinningTeamName(match),
          moreOrLess: match.outcome_more_or_less,
        });
        setIsWinnerDeclared(true);
      } else {
        setIsWinnerDeclared(false);
      }
    };
    checkWinningBet();
  }, [match]);

  // --- NAVIGATION ---

  // Get previous and next matches
  const prevMatch = getPreviousMatch(matchId);
  const nextMatch = getNextMatch(matchId);

  // Check if prev/next buttons should be disabled
  useEffect(() => {
    console.log("Previous match:", prevMatch);
    console.log("Next match:", nextMatch);

    console.log("Prev button should be disabled:", prevMatch === null);
    console.log("Next button should be disabled:", nextMatch === null);
  }, [matchId, prevMatch, nextMatch]);

  const goToPrevMatch = () => {
    console.log("Going to previous match:", prevMatch);
    navigate(`/bets/${prevMatch.id}`);
  };

  const goToNextMatch = () => {
    console.log("Going to next match:", nextMatch);
    navigate(`/bets/${nextMatch.id}`);
  };

  // --- DATA REFRESH TRIGGER ---

  // This flag will trigger a re-fetch of bets for the game
  // We want to re-fetch all bets when:
  // - The current match changes
  // - The user updates a bet
  // - The user creates a new bet
  // One minute has passed since the last refresh (polling, to be implemented later)
  const [refreshBets, setRefreshBets] = useState(false);

  useEffect(() => {
    console.log("Value of refreshBets:", refreshBets);
  }, [refreshBets]);

  // --- DATA PREP: JUAARIS ---

  const [juaaris, setJuaaris] = useState([]);

  useEffect(() => {
    const fetchJuaaris = async () => {
      const fetchedJuaaris = await getJuaaris();
      setJuaaris(fetchedJuaaris);
    };
    fetchJuaaris();
  }, []);

  console.log("JUAARIS ARE:", juaaris);

  // --- DATA PREP: BETS ---

  const [betsForGame, setBetsForGame] = useState([]);

  useEffect(() => {
    const fetchBetsForGame = async () => {
      const fetchedBetsForGame = await getBetsForGame(matchId);
      console.log("Fetched bets for game:", fetchedBetsForGame);
      setBetsForGame(fetchedBetsForGame);
    };
    fetchBetsForGame();
  }, [matchId, refreshBets]);

  console.log("Bets for game:", betsForGame);

  // --- DATA PREP: COMBINED JUAARIS AND BETS ---

  const [combinedJuaarisAndBets, setCombinedJuaarisAndBets] = useState([]);

  useEffect(() => {
    const combineJuaarisAndBets = () => {
      const combined = juaaris.map((juaari) => {
        const bet = betsForGame.find((bet) => bet.juaari_id === juaari.id);
        return { ...juaari, bet };
      });
      console.log("Combined juaaris and bets:", combined);
      setCombinedJuaarisAndBets(combined);
    };
    combineJuaarisAndBets();
  }, [betsForGame]);

  console.log("Combined juaaris and bets:", combinedJuaarisAndBets);

  // Format date to DD MMM YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRefreshBets(!refreshBets);
  //   }, 10000); // Refresh every 10 seconds
  //   console.log(
  //     "Refreshing bets for game now that 10 seconds have passed:",
  //     matchId
  //   );
  //   return () => clearInterval(interval);
  // }, [refreshBets]);

  // Function to update a user's bet
  const updateJuaariBet = async (juaariId, newBet, matchId) => {
    console.log("Updating bet for juaari:", juaariId, "to", newBet);
    if (newBet.team === "") {
      console.log("Rejecting bet because team is empty");
      alert("You forgot to select a team, try again!");
      return;
    }
    if (newBet.option === "") {
      console.log("Rejecting bet because option is empty");
      alert("You forgot to select more or less, try again!");
      return;
    }

    // First check if a bet already exists
    const existingBet = betsForGame.find((b) => b.juaari_id === juaariId);

    if (existingBet) {
      console.log("Bet already exists, updating...");
      try {
        await updateBet(existingBet.id, newBet.team, newBet.option);
      } catch (error) {
        console.error("Error updating bet:", error);
        alert("Could not update bet, please try again");
        return;
      }
    } else {
      console.log("Creating new bet...");
      const largestBetId = await getLargestBetId();
      console.log("Largest bet ID:", largestBetId);
      const newBetId = largestBetId[0].max + 1;
      console.log("New bet ID:", newBetId);
      try {
        await createBet(
          newBetId,
          matchId,
          juaariId,
          newBet.team,
          newBet.option
        );
      } catch (error) {
        console.error("Error creating bet:", error);
        // If we get a duplicate key error, try to update instead
        if (error.message.includes("duplicate key")) {
          console.log("Race condition detected, trying to update instead...");
          const updatedBets = await getBetsForGame(matchId);
          const raceBet = updatedBets.find((b) => b.juaari_id === juaariId);
          if (raceBet) {
            await updateBet(raceBet.id, newBet.team, newBet.option);
          } else {
            alert("Could not create bet, please try again");
            return;
          }
        } else {
          alert("Could not create bet, please try again");
          return;
        }
      }
      // Insert bet into juaari_win_history
      try {
        await insertBetIntoJuaariWinHistory(newBetId, matchId, juaariId);
      } catch (error) {
        console.error("Error inserting bet into juaari_win_history:", error);
        alert("Could not insert bet into juaari_win_history, please try again");
        return;
      }
    }
    setRefreshBets(!refreshBets);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2">
            {match.first_team_name} vs {match.second_team_name}
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 gap-4">
            <div>
              <p className="text-base sm:text-lg">Venue: {match.venue_name}</p>
              <p className="text-base sm:text-lg">
                Date: {formatDate(match.datetime)}
              </p>
              <p className="text-base sm:text-lg">
                Bet amount: ${match.bet_amount}
              </p>
              <p className="text-base sm:text-lg font-medium">
                Second dimension: {match.second_dimension_cutoff} runs
              </p>
            </div>
            <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
              {prevMatch && (
                <button
                  onClick={goToPrevMatch}
                  className="bg-gray-100 hover:bg-gray-200 rounded-md px-2 sm:px-4 py-2 text-sm sm:text-base border border-gray-300"
                >
                  &lt; Prev Match
                </button>
              )}
              {nextMatch && (
                <button
                  onClick={goToNextMatch}
                  className="bg-gray-100 hover:bg-gray-200 rounded-md px-2 sm:px-4 py-2 text-sm sm:text-base border border-gray-300"
                >
                  Next Match &gt;
                </button>
              )}
            </div>
          </div>
        </div>

        {isCutoffExceeded && !isWinnerDeclared && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-red-600 text-center text-sm sm:text-base font-medium">
                Betting is closed. The cutoff time has been exceeded.
              </p>
            </div>
          </div>
        )}

        {isWinnerDeclared && (
          <WinnerCard
            matchId={matchId}
            winningTeam={winningBet.winningTeam}
            moreOrLess={winningBet.moreOrLess}
            bet_amount={match.bet_amount}
            outcomeWashout={match.outcome_washout === true}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {combinedJuaarisAndBets.map((jb) => (
            <BetCard
              key={jb.id}
              juaari_name={jb.display_name}
              match={match}
              bet={jb.bet}
              isCutoffExceeded={isCutoffExceeded}
              onUpdateBet={(newBet) => updateJuaariBet(jb.id, newBet, matchId)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default BetsList;
