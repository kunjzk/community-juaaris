import React from "react";
import ResultsCard from "./ResultsCard";
import { useMatchesContext } from "../../contexts/matches";

function ResultsList() {
  const { matches } = useMatchesContext();

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

  const updateResult = async (newResult) => {
    console.log("Updating result for match:", newResult.matchId);
    console.log("Winning team:", newResult.winningTeam);
    console.log("Total score:", newResult.totalScore);
    console.log("Second dim valid:", newResult.secondDimValidBool);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Results List</h1>
      {/* Game Cards */}
      <div className="space-y-4">
        {matches.length > 0 ? (
          matches.map((match) => {
            return (
              <ResultsCard
                key={match.id}
                matchId={match.id}
                teams={`${match.first_team_name} vs ${match.second_team_name}`}
                dateTime={formatDateTime(match.datetime)}
                updateResult={(newResult) => updateResult(newResult)}
              />
            );
          })
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
