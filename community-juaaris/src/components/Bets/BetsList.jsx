import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBetsByMatchId } from "../../api/bets";
import { getMatchById } from "../../api/matches";
import BetCard from "./BetCard";

function BetsList() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [bets, setBets] = useState([]);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        // Fetch match details
        const matchData = await getMatchById(matchId);
        if (!matchData) {
          throw new Error("Match not found");
        }

        // Fetch bets for this match
        const betsData = await getBetsByMatchId(matchId);

        if (isMounted) {
          setMatch(matchData);
          setBets(betsData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [matchId]);

  // Format date and time for display
  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date string:", dateString);
        return "Invalid date";
      }
      return (
        date.toLocaleString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) + " SGT"
      );
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-black">Loading bets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:text-blue-800"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center py-8">
        <div className="text-black mb-4">Match not found</div>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:text-blue-800"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Match Details Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-medium mb-4 text-center text-black">
          {match.first_team_name} vs {match.second_team_name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
          <div>
            <p className="font-medium text-gray-600">Venue</p>
            <p className="font-bold">{match.venue_name}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Date & Time</p>
            <p className="font-bold">{formatDateTime(match.datetime)}</p>
          </div>
        </div>
      </div>

      {/* Bets Section */}
      <div>
        <h3 className="text-xl font-medium mb-4 text-black">All Bets</h3>
        {bets.length > 0 ? (
          <div className="space-y-4">
            {bets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-black">No bets placed yet for this match</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BetsList;
