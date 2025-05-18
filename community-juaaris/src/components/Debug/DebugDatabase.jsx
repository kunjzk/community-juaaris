import React, { useState, useEffect } from "react";
import { getTriviaWithMatchTime } from "../../api/trivia";
import {
  getTriviaBetsForTrivia,
  getWinHistoryForTrivia,
  resetTriviaData,
} from "../../api/trivia_bets";
import { Navigate } from "react-router-dom";
import { getAllMatches } from "../../api/matches";
import { getBetsForGame } from "../../api/bets";
import { getJuaariWinHistoryForMatch } from "../../api/juaari_win_history";
import { getCapsForDate } from "../../api/caps";
import { resetMatchData } from "../../api/matches";

function DebugDatabase() {
  // Check if we're in development mode
  if (import.meta.env.VITE_VERCEL_TARGET_ENV !== "development") {
    return <Navigate to="/" replace />;
  }

  const [activeTab, setActiveTab] = useState("trivia"); // "trivia" or "match"
  const [triviaList, setTriviaList] = useState([]);
  const [selectedTriviaId, setSelectedTriviaId] = useState("");
  const [triviaBets, setTriviaBets] = useState([]);
  const [winHistory, setWinHistory] = useState([]);
  const [selectedTrivia, setSelectedTrivia] = useState(null);
  const [triviaLoading, setTriviaLoading] = useState(false);
  const [triviaResetLoading, setTriviaResetLoading] = useState(false);

  // Match debugging states
  const [matchList, setMatchList] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [matchDetails, setMatchDetails] = useState(null);
  const [matchBets, setMatchBets] = useState([]);
  const [matchWinHistory, setMatchWinHistory] = useState([]);
  const [matchCaps, setMatchCaps] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResetLoading, setMatchResetLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [triviaData, matchesData] = await Promise.all([
        getTriviaWithMatchTime(),
        getAllMatches(),
      ]);
      setTriviaList(triviaData);
      setMatchList(matchesData);
    };
    fetchData();
  }, []);

  // Update selected trivia whenever selectedTriviaId changes
  useEffect(() => {
    if (selectedTriviaId) {
      const trivia = triviaList.find((t) => t.id === selectedTriviaId);
      setSelectedTrivia(trivia);
    } else {
      setSelectedTrivia(null);
    }
  }, [selectedTriviaId, triviaList]);

  // Update selected match whenever selectedMatchId changes
  useEffect(() => {
    if (selectedMatchId) {
      const match = matchList.find((m) => m.id === selectedMatchId);
      setMatchDetails(match);
    } else {
      setMatchDetails(null);
    }
  }, [selectedMatchId, matchList]);

  const handleTriviaSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTriviaId) return;

    setTriviaLoading(true);
    try {
      const [bets, history] = await Promise.all([
        getTriviaBetsForTrivia(selectedTriviaId),
        getWinHistoryForTrivia(selectedTriviaId),
      ]);
      setTriviaBets(bets);
      setWinHistory(history);
    } catch (error) {
      console.error("Error fetching trivia data:", error);
    } finally {
      setTriviaLoading(false);
    }
  };

  const handleTriviaReset = async () => {
    if (!selectedTriviaId) return;

    setTriviaResetLoading(true);
    try {
      await resetTriviaData(selectedTriviaId);
      const triviaData = await getTriviaWithMatchTime();
      setTriviaList(triviaData);
      const updatedTrivia = triviaData.find((t) => t.id === selectedTriviaId);
      setSelectedTrivia(updatedTrivia);
      handleTriviaSubmit({ preventDefault: () => {} });
    } catch (error) {
      console.error("Error resetting trivia data:", error);
      alert("Error resetting trivia data. Please tell Kunal.");
    } finally {
      setTriviaResetLoading(false);
    }
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMatchId) return;

    setMatchLoading(true);
    try {
      const [bets, history, caps] = await Promise.all([
        getBetsForGame(selectedMatchId),
        getJuaariWinHistoryForMatch(selectedMatchId),
        getCapsForDate(matchDetails.datetime),
      ]);
      setMatchBets(bets);
      setMatchWinHistory(history);
      setMatchCaps(caps);
    } catch (error) {
      console.error("Error fetching match data:", error);
    } finally {
      setMatchLoading(false);
    }
  };

  const handleMatchReset = async () => {
    if (!selectedMatchId) return;

    setMatchResetLoading(true);
    try {
      await resetMatchData(selectedMatchId);
      const matchesData = await getAllMatches();
      setMatchList(matchesData);
      const updatedMatch = matchesData.find((m) => m.id === selectedMatchId);
      setMatchDetails(updatedMatch);
      handleMatchSubmit({ preventDefault: () => {} });
    } catch (error) {
      console.error("Error resetting match data:", error);
      alert("Error resetting match data. Please tell Kunal.");
    } finally {
      setMatchResetLoading(false);
    }
  };

  const renderTable = (data, columns, title) => (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">{title}</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Debug Database</h1>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("trivia")}
              className={`${
                activeTab === "trivia"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Trivia
            </button>
            <button
              onClick={() => setActiveTab("match")}
              className={`${
                activeTab === "match"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Match
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "trivia" ? (
        <>
          {/* Trivia Form */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <form
              onSubmit={handleTriviaSubmit}
              className="flex gap-4 items-end"
            >
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Trivia
                </label>
                <select
                  value={selectedTriviaId}
                  onChange={(e) => setSelectedTriviaId(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select a trivia</option>
                  {triviaList.map((trivia) => (
                    <option key={trivia.id} value={trivia.id}>
                      {trivia.match_name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={!selectedTriviaId || triviaLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {triviaLoading ? "Loading..." : "View Data"}
              </button>
              <button
                type="button"
                onClick={handleTriviaReset}
                disabled={!selectedTriviaId || triviaResetLoading}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {triviaResetLoading ? "Resetting..." : "Reset Data"}
              </button>
            </form>
          </div>

          {/* Trivia Details */}
          {selectedTrivia && (
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">Trivia Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Match Name</p>
                  <p className="font-medium">{selectedTrivia.match_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Question</p>
                  <p className="font-medium">{selectedTrivia.question}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Correct Option</p>
                  <p className="font-medium">
                    {selectedTrivia.correct_option || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bet Amount</p>
                  <p className="font-medium">${selectedTrivia.bet_amount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Trivia Bets Table */}
          {triviaBets.length > 0 &&
            renderTable(
              triviaBets,
              [
                { key: "display_name", label: "Juaari" },
                { key: "selected_option", label: "Selected Option" },
                {
                  key: "successful",
                  label: "Successful",
                  render: (row) =>
                    row.successful === null ? (
                      "Pending"
                    ) : row.successful ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    ),
                },
              ],
              "Trivia Bets"
            )}

          {/* Win History Table */}
          {winHistory.length > 0 &&
            renderTable(
              winHistory,
              [
                { key: "display_name", label: "Juaari" },
                { key: "delta_winnings_this_game", label: "Winnings" },
                { key: "trivia_id", label: "Trivia ID" },
              ],
              "Win History"
            )}
        </>
      ) : (
        <>
          {/* Match Form */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <form onSubmit={handleMatchSubmit} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Match
                </label>
                <select
                  value={selectedMatchId}
                  onChange={(e) => setSelectedMatchId(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select a match</option>
                  {matchList
                    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
                    .map((match) => {
                      const matchDate = new Date(match.datetime);
                      return (
                        <option key={match.id} value={match.id}>
                          [{match.id}] {match.first_team_name} vs{" "}
                          {match.second_team_name} -{" "}
                          {matchDate.toLocaleDateString()}
                        </option>
                      );
                    })}
                </select>
              </div>
              <button
                type="submit"
                disabled={!selectedMatchId || matchLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {matchLoading ? "Loading..." : "View Data"}
              </button>
              <button
                type="button"
                onClick={handleMatchReset}
                disabled={!selectedMatchId || matchResetLoading}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {matchResetLoading ? "Resetting..." : "Reset Data"}
              </button>
            </form>
          </div>

          {/* Match Details */}
          {matchDetails && (
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">Match Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Teams</p>
                  <p className="font-medium">
                    {matchDetails.first_team_name} vs{" "}
                    {matchDetails.second_team_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Venue</p>
                  <p className="font-medium">{matchDetails.venue_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date Time</p>
                  <p className="font-medium">
                    {new Date(matchDetails.datetime).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Winning Team</p>
                  <p className="font-medium">
                    {matchDetails.outcome_winning_team || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Score</p>
                  <p className="font-medium">
                    {matchDetails.outcome_total_score || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">More or Less</p>
                  <p className="font-medium">
                    {matchDetails.outcome_more_or_less || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Washout</p>
                  <p className="font-medium">
                    {matchDetails.washout ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bet Amount</p>
                  <p className="font-medium">${matchDetails.bet_amount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Match Bets Table */}
          {matchBets.length > 0 &&
            renderTable(
              matchBets,
              [
                { key: "juaari_id", label: "Juaari ID" },
                { key: "predicted_winning_team", label: "Predicted Team" },
                { key: "predicted_more_or_less", label: "Predicted More/Less" },
                {
                  key: "successful",
                  label: "Successful",
                  render: (row) =>
                    row.successful === null ? (
                      "Pending"
                    ) : row.successful ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    ),
                },
              ],
              "Match Bets"
            )}

          {/* Match Win History Table */}
          {matchWinHistory.length > 0 &&
            renderTable(
              matchWinHistory,
              [
                { key: "juaari_id", label: "Juaari ID" },
                { key: "delta_winnings_this_game", label: "Winnings" },
                { key: "match_id", label: "Match ID" },
              ],
              "Match Win History"
            )}

          {/* Caps Table */}
          {matchCaps.length > 0 &&
            renderTable(
              matchCaps,
              [
                { key: "cap_type", label: "Cap Type" },
                { key: "juaari_id", label: "Juaari ID" },
                { key: "date", label: "Date" },
              ],
              "Caps"
            )}
        </>
      )}
    </div>
  );
}

export default DebugDatabase;
