import React, { useState, useEffect } from "react";
import { getTriviaWithMatchTime } from "../../api/trivia";
import {
  getTriviaBetsForTrivia,
  getWinHistoryForTrivia,
  resetTriviaData,
} from "../../api/trivia_bets";
import { Navigate } from "react-router-dom";

function DebugDatabase() {
  // Check if we're in development mode
  if (import.meta.env.VITE_VERCEL_TARGET_ENV !== "development") {
    return <Navigate to="/" replace />;
  }

  const [triviaList, setTriviaList] = useState([]);
  const [selectedTriviaId, setSelectedTriviaId] = useState("");
  const [triviaBets, setTriviaBets] = useState([]);
  const [winHistory, setWinHistory] = useState([]);
  const [selectedTrivia, setSelectedTrivia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const fetchTrivia = async () => {
      const triviaData = await getTriviaWithMatchTime();
      setTriviaList(triviaData);
    };
    fetchTrivia();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTriviaId) return;

    setLoading(true);
    try {
      const [bets, history] = await Promise.all([
        getTriviaBetsForTrivia(selectedTriviaId),
        getWinHistoryForTrivia(selectedTriviaId),
      ]);
      setTriviaBets(bets);
      setWinHistory(history);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!selectedTriviaId) return;

    setResetLoading(true);
    try {
      await resetTriviaData(selectedTriviaId);
      // Refresh the trivia list to get updated correct option
      const triviaData = await getTriviaWithMatchTime();
      setTriviaList(triviaData);
      // Update selected trivia with the fresh data
      const updatedTrivia = triviaData.find((t) => t.id === selectedTriviaId);
      setSelectedTrivia(updatedTrivia);
      // Refresh the data tables
      handleSubmit({ preventDefault: () => {} });
    } catch (error) {
      console.error("Error resetting trivia data:", error);
      alert("Error resetting trivia data. Please tell Kunal.");
    } finally {
      setResetLoading(false);
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

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
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
            disabled={!selectedTriviaId || loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "View Data"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={!selectedTriviaId || resetLoading}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {resetLoading ? "Resetting..." : "Reset Data"}
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
    </div>
  );
}

export default DebugDatabase;
