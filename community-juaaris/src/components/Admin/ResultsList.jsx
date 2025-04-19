import React from "react";
import ResultsCard from "./ResultsCard";
import { useMatchesContext } from "../../contexts/matches";

function ResultsList() {
  const { matches } = useMatchesContext();
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
                venue={match.venue_name}
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
