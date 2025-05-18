import React, { useState, useEffect } from "react";
import { useMatchesContext } from "../../contexts/matches";
import { useNavigate } from "react-router-dom";
import { getTriviaHistory, updateTriviaCorrectOption } from "../../api/trivia";
import { updateTriviaBetSuccess } from "../../api/trivia_bets";

function PostTrivia() {
  const { matches } = useMatchesContext();
  const [triviaList, setTriviaList] = useState([]);
  const [refreshTrivia, setRefreshTrivia] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrivia = async () => {
      const triviaData = await getTriviaHistory();
      setTriviaList(triviaData);
      // Initialize selectedOptions with current correct options
      const initialOptions = {};
      triviaData.forEach((trivia) => {
        initialOptions[trivia.id] = trivia.correct_option || "";
      });
      setSelectedOptions(initialOptions);
    };
    fetchTrivia();
  }, [refreshTrivia]);

  const handleOptionChange = (triviaId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [triviaId]: option,
    }));
  };

  // TODOs:
  // Update trivia bets table
  // Update juaari win history table
  // Update juaaris winnings table
  // Update orange and purple caps.
  // If a trivia is invalid, next one doubles. Just do it manually for now bro.
  const handleSubmitCorrectOption = async (triviaId) => {
    if (!selectedOptions[triviaId]) {
      alert("Please select a correct option");
      return;
    }
    try {
      // Update the correct option in the trivia table
      await updateTriviaCorrectOption(triviaId, selectedOptions[triviaId]);

      // Update the success status of all bets for this trivia
      await updateTriviaBetSuccess(triviaId, selectedOptions[triviaId]);

      setRefreshTrivia(!refreshTrivia);
    } catch (error) {
      console.error("Error updating correct option:", error);
      alert("Failed to update correct option");
    }
  };

  const handleViewWinners = (triviaId) => {
    navigate(`/trivia/${triviaId}/winners`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Post Trivia Results</h2>
      <div className="space-y-6">
        {triviaList.map((trivia) => (
          <div key={trivia.id} className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {trivia.match_name}
              </h3>
              <p className="text-gray-700">{trivia.question}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Option
                </label>
                <select
                  value={selectedOptions[trivia.id] || ""}
                  onChange={(e) =>
                    handleOptionChange(trivia.id, e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  disabled={!!selectedOptions[trivia.id]}
                >
                  <option value="">Select correct option</option>
                  <option value="A">A: {trivia.option_a}</option>
                  <option value="B">B: {trivia.option_b}</option>
                  <option value="C">C: {trivia.option_c}</option>
                  <option value="D">D: {trivia.option_d}</option>
                </select>
              </div>
              <div className="flex items-end space-x-4">
                {!selectedOptions[trivia.id] ? (
                  <button
                    onClick={() => handleSubmitCorrectOption(trivia.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={() => handleViewWinners(trivia.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    View Winners
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostTrivia;
