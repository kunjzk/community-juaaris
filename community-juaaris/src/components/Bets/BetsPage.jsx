import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMatchById } from "../../api/matches";
import { getJuaaris } from "../../api/juaaris";
import { getBetsByMatchId, createBet } from "../../api/bets";
import BetCard from "./BetCard";

function BetsPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [juaaris, setJuaaris] = useState([]);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBets, setEditingBets] = useState({});
  const [activeTab, setActiveTab] = useState("view"); // "view" or "place"

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

        // Fetch all juaaris
        const juaarisData = await getJuaaris();

        // Fetch existing bets for this match
        const betsData = await getBetsByMatchId(matchId);

        if (isMounted) {
          setMatch(matchData);
          setJuaaris(juaarisData);
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

  // Handle edit button click
  const handleEditClick = (juaariId) => {
    setEditingBets({
      ...editingBets,
      [juaariId]: true,
    });
  };

  // Handle save button click
  const handleSaveClick = async (juaariId, selectedTeam, selectedMoreLess) => {
    try {
      // Create the bet
      await createBet({
        match_id: matchId,
        bettor_id: juaariId,
        predicted_winning_team: selectedTeam,
        predicted_more_or_less: selectedMoreLess,
        amount: 10, // Default amount for now
      });

      // Update the editing state
      setEditingBets({
        ...editingBets,
        [juaariId]: false,
      });

      // Refresh the bets
      const updatedBets = await getBetsByMatchId(matchId);
      setBets(updatedBets);
    } catch (err) {
      console.error("Error saving bet:", err);
      setError(err.message);
    }
  };

  // Get existing bet for a juaari
  const getExistingBet = (juaariId) => {
    return bets.find((bet) => bet.bettor_id === juaariId);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-black">Loading...</p>
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

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("view")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "view"
              ? "text-[#4b6c43] border-b-2 border-[#4b6c43]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          View Bets
        </button>
        <button
          onClick={() => setActiveTab("place")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "place"
              ? "text-[#4b6c43] border-b-2 border-[#4b6c43]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Place Bets
        </button>
      </div>

      {/* View Bets Tab */}
      {activeTab === "view" && (
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
      )}

      {/* Place Bets Tab */}
      {activeTab === "place" && (
        <div>
          <h3 className="text-xl font-medium mb-4 text-black">
            Place Your Bets
          </h3>
          <div className="space-y-4">
            {juaaris.map((juaari) => {
              const existingBet = getExistingBet(juaari.id);
              const isEditing = editingBets[juaari.id] || false;

              return (
                <div
                  key={juaari.id}
                  className="rounded-xl border border-gray-200 bg-[#fafdf7] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center"
                >
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4 flex-1 w-full mb-3 sm:mb-0">
                    <div className="text-center col-span-1">
                      <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                        Player
                      </div>
                      <div className="font-medium text-xs sm:text-sm">
                        {juaari.display_name}
                      </div>
                    </div>
                    <div className="text-center col-span-1">
                      <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                        Winning Team
                      </div>
                      <div className="font-medium text-xs sm:text-sm">
                        {isEditing ? (
                          <select
                            className="w-full p-1 border rounded"
                            defaultValue={
                              existingBet
                                ? existingBet.predicted_team_name
                                : "no-selection"
                            }
                          >
                            <option value="no-selection">
                              No selection yet
                            </option>
                            <option value={match.first_team_name}>
                              {match.first_team_name}
                            </option>
                            <option value={match.second_team_name}>
                              {match.second_team_name}
                            </option>
                          </select>
                        ) : existingBet ? (
                          existingBet.predicted_team_name
                        ) : (
                          "No selection yet"
                        )}
                      </div>
                    </div>
                    <div className="text-center col-span-1">
                      <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                        More/Less
                      </div>
                      <div className="font-medium text-xs sm:text-sm">
                        {isEditing ? (
                          <select
                            className="w-full p-1 border rounded"
                            defaultValue={
                              existingBet
                                ? existingBet.predicted_more_or_less
                                : "no-selection"
                            }
                          >
                            <option value="no-selection">
                              No selection yet
                            </option>
                            <option value="MORE">More</option>
                            <option value="LESS">Less</option>
                          </select>
                        ) : existingBet ? (
                          existingBet.predicted_more_or_less
                        ) : (
                          "No selection yet"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto sm:ml-4 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(juaari.id)}
                      disabled={isEditing}
                      className={`w-full sm:w-auto px-3 py-1.5 rounded-md transition-colors text-xs sm:text-sm whitespace-nowrap ${
                        isEditing
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#4b6c43] text-white hover:bg-[#3d5836]"
                      }`}
                    >
                      Edit Bet
                    </button>
                    <button
                      onClick={() => handleSaveClick(juaari.id)}
                      disabled={!isEditing}
                      className={`w-full sm:w-auto px-3 py-1.5 rounded-md transition-colors text-xs sm:text-sm whitespace-nowrap ${
                        !isEditing
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#4b6c43] text-white hover:bg-[#3d5836]"
                      }`}
                    >
                      Save Bet
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default BetsPage;
