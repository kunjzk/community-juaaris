import React, { useState, useEffect } from "react";
import BetCard from "./BetCard";
import { useParams } from "react-router-dom";
import { useMatchesContext } from "../../contexts/matches";
import { useNavigate } from "react-router-dom";
import { getJuaaris } from "../../api/juaaris";
import { getBetsForGame } from "../../api/bets";

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

function BetsList() {
  const { matches, getMatchById, getPreviousMatch, getNextMatch } =
    useMatchesContext();
  const navigate = useNavigate();

  // Get matchId from params
  let params = useParams();
  let matchId = getMatchIdFromParams(params, matches);
  const match = getMatchById(matchId);
  console.log("MATCH IS:", match);

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
  const updateJuaariBet = (juaariId, newBet, matchId) => {
    console.log(
      "Match ID ",
      matchId,
      " Updating bet for juaari:",
      juaariId,
      "to",
      newBet
    );
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
              <p className="text-base sm:text-lg font-medium">
                Second dimension: 335 runs
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {juaaris.map((juaari) => (
            <BetCard
              key={juaari.id}
              juaari={juaari}
              match={match}
              onUpdateBet={(newBet) =>
                updateJuaariBet(juaari.id, newBet, matchId)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default BetsList;
