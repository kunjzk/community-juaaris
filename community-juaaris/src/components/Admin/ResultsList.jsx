import React, { useState, useEffect } from "react";
import ResultsCard from "./ResultsCard";
import { useMatchesContext } from "../../contexts/matches";

const saveMatchResultAndCalculateAllWinnings = async (
  matchId,
  winningTeam,
  totalScore,
  more_or_less,
  washout
) => {
  // 1. Save the result of the match
  try {
    console.log("Saving result to database");
    await saveResult(matchId, winningTeam, totalScore, more_or_less, washout);
  } catch (error) {
    console.error("Error saving match result:", error);
    alert("Error saving match result, please tell Kunal");
  }

  if (washout) {
    console.log("Washout, so no need to calculate winnings");
  } else {
    // 2. Update the "successful" column in the bets table
    try {
      console.log("Updating successful column in bets table");
      await updateSuccessfulColumnInBetsTable(
        matchId,
        winningTeam,
        more_or_less
      );
    } catch (error) {
      console.error("Error updating successful column in bets table:", error);
      alert(
        "Error updating successful column in bets table, please tell Kunal"
      );
    }
  }
  // 2. Update the "successful" column in the bets table

  // 3. Keep track of user ID of winners

  // 4. Calculate the net change for each player
  // If you lose, you lose the amount you bet
};

function ResultsList() {
  const { matches, refreshMatches, getWinningTeamName } = useMatchesContext();
  const [refreshMatchesBool, setRefreshMatchesBool] = useState(false);

  useEffect(() => {
    console.log(
      "refreshMatchesBool was changed from the admin page. Value is now: ",
      refreshMatchesBool
    );
    refreshMatches();
  }, [refreshMatchesBool]);

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    try {
      // Check if dateTimeString is valid
      if (!dateTimeString) {
        console.error("Invalid date string:", dateTimeString);
        return "Date not available";
      }

      // Parse the date string
      const date = new Date(dateTimeString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date object:", date);
        return "Invalid date";
      }

      // Format the date and time
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are 0-indexed
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/25, ${hours}:${minutes} SGT`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date formatting error";
    }
  };

  const submitResult = async (newResult) => {
    console.log("Updating result for match:", newResult.matchId);
    console.log("Winning team:", newResult.winningTeam);
    console.log("Total score:", newResult.totalScore);
    console.log("More or less:", newResult.moreOrLess);
    console.log("Washout:", newResult.washout);

    await saveMatchResultAndCalculateAllWinnings(
      newResult.matchId,
      newResult.winningTeam,
      newResult.totalScore,
      newResult.moreOrLess,
      newResult.washout
    );
    setRefreshMatchesBool(!refreshMatchesBool);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Results List</h1>
      {/* Game Cards */}
      <div className="space-y-4">
        {matches.length > 0 ? (
          (() => {
            console.log(
              "Rendering match cards, since match length is more than 0."
            );
            const allMatchCards = matches.map((match) => {
              console.log("Rendering card content for match id: ", match.id);
              // If there is a result, supply the result to the ResultsCard
              // Otherwise, supply null
              let result = null;
              if (
                match.outcome_winning_team !== null &&
                match.outcome_total_score !== null &&
                match.outcome_more_or_less !== null
              ) {
                const winningTeamName = getWinningTeamName(match);
                result = {
                  winningTeam: winningTeamName,
                  totalScore: match.outcome_total_score,
                  secondDimension: match.outcome_more_or_less,
                  washout: false,
                };
              }
              if (match.washout) {
                result = {
                  winningTeam: "WASHOUT",
                  totalScore: 0,
                  secondDimension: null,
                  washout: true,
                };
              }
              console.log("Result:", result);
              return (
                <ResultsCard
                  key={match.id}
                  matchId={match.id}
                  teams={`${match.first_team_name} vs ${match.second_team_name}`}
                  dateTime={formatDateTime(match.datetime)}
                  result={result}
                  submitResult={(newResult) => submitResult(newResult)}
                />
              );
            });
            return allMatchCards;
          })()
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matches scheduled for this week
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsList;
