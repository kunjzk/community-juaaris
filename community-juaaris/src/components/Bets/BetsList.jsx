import React, { useState, useEffect } from "react";
import BetCard from "./BetCard";
import { useParams } from "react-router-dom";
import { useMatchesContext } from "../../contexts/matches";
import { useNavigate } from "react-router-dom";

function BetsList() {
  const { matches, getMatchById, getPreviousMatch, getNextMatch } =
    useMatchesContext();
  const navigate = useNavigate();
  let { matchId } = useParams();
  if (!matchId) {
    matchId = matches[0].id;
  }
  console.log("MATCH ID IS:", matchId);
  const match = getMatchById(matchId);
  console.log("MATCH IS:", match);

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

  // Mock database of users and their bets
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Madan",
      bet: { team: "CSK", option: "MORE" },
      cardColor: "#fdfdc4",
    },
    {
      id: 2,
      name: "Pratibha",
      bet: { team: "RCB", option: "LESS" },
      cardColor: "#ffd6d6",
    },
    {
      id: 3,
      name: "Anshu",
      bet: { team: "CSK", option: "LESS" },
      cardColor: "#fdfdc4",
    },
    { id: 4, name: "Kunal", bet: null, cardColor: "white" },
    { id: 5, name: "Prachi", bet: null, cardColor: "white" },
    {
      id: 6,
      name: "Rajiv",
      bet: { team: "CSK", option: "LESS" },
      cardColor: "#fdfdc4",
    },
  ]);

  // Function to update a user's bet
  const updateUserBet = (userId, newBet) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            bet: newBet,
            // Update card color based on team
            cardColor: newBet.team === "CSK" ? "#fdfdc4" : "#ffd6d6",
          };
        }
        return user;
      })
    );
  };

  const goToPrevMatch = () => {
    console.log("Going to previous match:", prevMatch);
    navigate(`/bets/${prevMatch.id}`);
  };

  const goToNextMatch = () => {
    console.log("Going to next match:", nextMatch);
    navigate(`/bets/${nextMatch.id}`);
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
          {users.map((user) => (
            <BetCard
              key={user.id}
              user={user}
              onUpdateBet={(newBet) => updateUserBet(user.id, newBet)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default BetsList;
