import { useState, useEffect } from "react";
import { getMatches } from "../api/matches";

export default function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate most recent Sunday and next Sunday
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.

  // Calculate most recent Sunday
  const mostRecentSunday = new Date(today);
  mostRecentSunday.setDate(today.getDate() - currentDay);
  mostRecentSunday.setHours(0, 0, 0, 0);

  // Calculate next Sunday
  const nextSunday = new Date(mostRecentSunday);
  nextSunday.setDate(mostRecentSunday.getDate() + 7);

  // Filter matches for the current week
  const currentWeekMatches = matches.filter((match) => {
    const matchDate = new Date(match.match_datetime);
    return matchDate >= mostRecentSunday && matchDate < nextSunday;
  });

  useEffect(() => {
    async function fetchMatches() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  if (loading) return <div>Loading matches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Matches</h2>

      <div className="grid gap-4">
        {currentWeekMatches.map((match) => (
          <div
            key={match.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="font-medium">{match.first_team_name}</div>
                <div className="text-sm text-gray-600">vs</div>
                <div className="font-medium">{match.second_team_name}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  {new Date(match.match_datetime).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(match.match_datetime).toLocaleTimeString()}
                </div>
                <div className="text-sm font-medium">{match.venue_name}</div>
                {match.winning_team_id && (
                  <div className="text-sm text-green-600 font-medium mt-2">
                    Winner:{" "}
                    {match.winning_team_id === match.first_team_id
                      ? match.first_team_name
                      : match.second_team_name}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
