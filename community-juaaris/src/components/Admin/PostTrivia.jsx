import React, { useState, useEffect } from "react";
import { useMatchesContext } from "../../contexts/matches";
import { useNavigate } from "react-router-dom";
import { getTriviaHistory, updateTriviaCorrectOption } from "../../api/trivia";

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
      await updateTriviaCorrectOption(triviaId, selectedOptions[triviaId]);
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
    <div>
      <h1 className="text-3xl font-serif mb-8">Update Trivia Results</h1>

      {/* Table Header */}
      <div className="bg-gray-100 rounded-t-lg border border-gray-200 grid grid-cols-12 font-medium text-gray-700 text-xs sm:text-sm">
        <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-2 sm:col-span-2">
          Match
        </div>
        <div className="px-2 sm:px-6 py-3 border-r border-gray-200 text-center col-span-3 sm:col-span-3">
          Question
        </div>
        <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1">
          A
        </div>
        <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1">
          B
        </div>
        <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1">
          C
        </div>
        <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1">
          D
        </div>
        <div className="px-2 sm:px-6 py-3 border-r border-gray-200 text-center col-span-1">
          Correct
        </div>
        <div className="px-2 sm:px-6 py-3 text-center col-span-1">Action</div>
      </div>

      {/* Table Body */}
      <div className="rounded-b-lg overflow-hidden border-x border-b border-gray-200 bg-white">
        {triviaList.map((trivia) => (
          <div
            key={trivia.id}
            className="grid grid-cols-12 border-t border-gray-200 text-xs sm:text-sm"
          >
            <div className="px-2 sm:px-6 py-3 border-r border-gray-200 text-center col-span-2 sm:col-span-2 break-words">
              {trivia.match_name}
            </div>
            <div className="px-2 sm:px-6 py-3 border-r border-gray-200 text-center col-span-3 sm:col-span-3 break-words">
              {trivia.question}
            </div>
            <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1 break-words">
              {trivia.option_a}
            </div>
            <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1 break-words">
              {trivia.option_b}
            </div>
            <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1 break-words">
              {trivia.option_c}
            </div>
            <div className="px-2 sm:px-3 py-3 border-r border-gray-200 text-center col-span-1 break-words">
              {trivia.option_d}
            </div>
            <div className="px-2 sm:px-6 py-3 border-r border-gray-200 text-center col-span-1">
              {trivia.correct_option ? (
                <span className="font-semibold text-green-600">
                  {trivia.correct_option}
                </span>
              ) : (
                <select
                  className="border border-gray-300 rounded px-1 sm:px-2 py-1 w-full text-xs sm:text-sm"
                  value={selectedOptions[trivia.id] || ""}
                  onChange={(e) =>
                    handleOptionChange(trivia.id, e.target.value)
                  }
                >
                  <option value=""></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              )}
            </div>
            <div className="px-2 sm:px-6 py-3 text-center col-span-1">
              {trivia.correct_option ? (
                <button
                  onClick={() => handleViewWinners(trivia.id)}
                  className="bg-[#1554ba] hover:bg-[#303f58] text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap mx-auto"
                >
                  View Winners
                </button>
              ) : (
                <button
                  onClick={() => handleSubmitCorrectOption(trivia.id)}
                  className="bg-[#27ae60] hover:bg-[#2ecc71] text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap mx-auto"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostTrivia;
