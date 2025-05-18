import React from "react";
import { useNavigate } from "react-router-dom";
import { updateTriviaCorrectOption } from "../../../api/trivia";
import { updateTriviaBetSuccess } from "../../../api/trivia_bets";

function TriviaResultsCard({
  trivia,
  selectedOptions,
  onOptionChange,
  onRefresh,
}) {
  const navigate = useNavigate();

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

      onRefresh();
    } catch (error) {
      console.error("Error updating correct option:", error);
      alert("Failed to update correct option");
    }
  };

  const handleViewWinners = (triviaId) => {
    navigate(`/triviabets/${triviaId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{trivia.match_name}</h3>
        <p className="text-gray-700">{trivia.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          {selectedOptions[trivia.id] ? (
            <div className="text-green-600 font-medium">
              Option {selectedOptions[trivia.id]} is set as correct
            </div>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Option
              </label>
              <select
                value={selectedOptions[trivia.id] || ""}
                onChange={(e) => onOptionChange(trivia.id, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select correct option</option>
                <option value="A">A: {trivia.option_a}</option>
                <option value="B">B: {trivia.option_b}</option>
                <option value="C">C: {trivia.option_c}</option>
                <option value="D">D: {trivia.option_d}</option>
              </select>
            </>
          )}
        </div>
        <div className="flex items-end space-x-4">
          {selectedOptions[trivia.id] ? (
            <button
              onClick={() => handleViewWinners(trivia.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              View Winners
            </button>
          ) : (
            <button
              onClick={() => handleSubmitCorrectOption(trivia.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TriviaResultsCard;
