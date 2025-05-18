import React, { useState, useEffect } from "react";
import { getTriviaWithMatchTime } from "../../api/trivia";
import { getTriviaBetsForTrivia } from "../../api/trivia_bets";
import { Navigate } from "react-router-dom";

function DebugDatabase() {
  // Check if we're in development mode
  if (import.meta.env.VITE_VERCEL_TARGET_ENV !== "development") {
    return <Navigate to="/" replace />;
  }

  const [triviaList, setTriviaList] = useState([]);
  const [selectedTriviaId, setSelectedTriviaId] = useState("");
  const [triviaBets, setTriviaBets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrivia = async () => {
      const triviaData = await getTriviaWithMatchTime();
      setTriviaList(triviaData);
    };
    fetchTrivia();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTriviaId) return;

    setLoading(true);
    try {
      const bets = await getTriviaBetsForTrivia(selectedTriviaId);
      setTriviaBets(bets);
    } catch (error) {
      console.error("Error fetching trivia bets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Trivia Bets Table</h1>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Trivia
            </label>
            <select
              value={selectedTriviaId}
              onChange={(e) => setSelectedTriviaId(e.target.value)}
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
            {loading ? "Loading..." : "View Bets"}
          </button>
        </form>
      </div>

      {/* Table */}
      {triviaBets.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Juaari
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Selected Option
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Successful
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {triviaBets.map((bet) => (
                <tr key={`${bet.trivia_id}-${bet.juaari_id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bet.display_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bet.selected_option}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bet.successful === null ? (
                      "Pending"
                    ) : bet.successful ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DebugDatabase;
