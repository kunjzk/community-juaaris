import { React, useState, useEffect } from "react";
import { useMatchesContext } from "../../../contexts/matches";
import {
  getUpcomingTrivia,
  updateTrivia,
  deleteTrivia,
} from "../../../api/trivia";

function EditTrivia() {
  const { matches, getMatchById, refreshMatches } = useMatchesContext();
  const [triviaList, setTriviaList] = useState([]);
  const [selectedTrivia, setSelectedTrivia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  // Edit form state
  const [selectedMatchId, setSelectedMatchId] = useState(0);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const triviaData = await getUpcomingTrivia();
        setTriviaList(triviaData);
      } catch (error) {
        console.error("Error fetching trivia:", error);
        alert("Failed to load trivia data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshData]);

  // Handle selecting a trivia to edit
  const handleSelectTrivia = (trivia) => {
    setSelectedTrivia(trivia);
    setSelectedMatchId(trivia.match_id);
    setQuestion(trivia.question);
    setOptionA(trivia.option_a);
    setOptionB(trivia.option_b);
    setOptionC(trivia.option_c);
    setOptionD(trivia.option_d);
    setBetAmount(trivia.bet_amount);
    setIsEditing(true);
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setSelectedTrivia(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  // Handle updating the trivia
  const handleUpdateTrivia = async () => {
    // Validation
    if (!selectedMatchId) {
      alert("Please select a match");
      return;
    }

    if (!question.trim()) {
      alert("Question cannot be empty");
      return;
    }

    if (
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim()
    ) {
      alert("All options must be filled");
      return;
    }

    if (!betAmount || betAmount <= 0) {
      alert("Please enter a valid number of points");
      return;
    }

    try {
      const match = getMatchById(selectedMatchId);

      if (!match) {
        alert("Selected match not found");
        return;
      }

      let matchNameStr =
        match.first_team_name +
        " vs " +
        match.second_team_name +
        " - " +
        new Date(match.datetime).toLocaleDateString();

      await updateTrivia(
        selectedTrivia.id,
        selectedMatchId,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        betAmount,
        matchNameStr
      );

      alert("Trivia updated successfully!");

      // Reset and refresh
      setSelectedTrivia(null);
      setIsEditing(false);
      setRefreshData(!refreshData);
    } catch (error) {
      console.error("Error updating trivia:", error);
      alert("Failed to update trivia. Please try again.");
    }
  };

  // Handle deleting the trivia
  const handleDeleteTrivia = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    try {
      await deleteTrivia(selectedTrivia.id);

      alert("Trivia deleted successfully!");

      // Reset and refresh
      setSelectedTrivia(null);
      setIsEditing(false);
      setIsDeleting(false);
      setRefreshData(!refreshData);
    } catch (error) {
      console.error("Error deleting trivia:", error);
      alert(error.message || "Failed to delete trivia. Please try again.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    // Database has UTC time, but we display in user's local timezone
    const date = new Date(dateString);

    // Extract just the time portion in 24-hour format
    const timeStr = date.toISOString().slice(11, 16); // HH:MM format

    // For admin purposes, we'll add GMT time indicator for clarity
    return date.toLocaleString() + ` (Local) [${timeStr} GMT]`;
  };

  // Format text to show a preview (first 50 characters)
  const formatPreview = (text) => {
    return text.length > 50 ? text.substring(0, 50) + "..." : text;
  };

  return (
    <>
      <div>
        <h3 className="text-3xl font-serif mb-8">Edit Upcoming Trivia</h3>

        {isEditing ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-xl font-semibold">
                Editing Trivia #{selectedTrivia.id}
              </h4>
              <button
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>

            <div className="space-y-4">
              {/* Match Selection */}
              <div className="mb-4">
                <label className="block text-base sm:text-xl mb-2">
                  Select Match
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedMatchId}
                  onChange={(e) => setSelectedMatchId(Number(e.target.value))}
                >
                  <option value="">Select a match</option>
                  {matches.map((match) => (
                    <option key={match.id} value={match.id}>
                      {match.first_team_name} vs {match.second_team_name} -{" "}
                      {new Date(match.datetime).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question Input */}
              <div className="mb-4">
                <label className="block text-base sm:text-xl mb-2">
                  Question
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="3"
                  placeholder="Enter your trivia question"
                />
              </div>

              {/* Options Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base sm:text-xl mb-2">
                    Option A
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="Enter option A"
                  />
                </div>
                <div>
                  <label className="block text-base sm:text-xl mb-2">
                    Option B
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="Enter option B"
                  />
                </div>
                <div>
                  <label className="block text-base sm:text-xl mb-2">
                    Option C
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    placeholder="Enter option C"
                  />
                </div>
                <div>
                  <label className="block text-base sm:text-xl mb-2">
                    Option D
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    placeholder="Enter option D"
                  />
                </div>
              </div>

              {/* Bet Amount Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base sm:text-xl mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <button
                  className="bg-[#27ae60] hover:bg-[#2ecc71] text-white py-2 rounded-md font-medium"
                  onClick={handleUpdateTrivia}
                >
                  Update Trivia
                </button>
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className={`${
                    isDeleting
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-100 hover:bg-red-200 text-red-800"
                  } py-2 rounded-md font-medium`}
                  onClick={handleDeleteTrivia}
                >
                  {isDeleting ? "Confirm Delete" : "Delete Trivia"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-700 mb-6">
              Select an upcoming trivia question below to edit its details or
              delete it.
              <br />
              <span className="text-amber-600 font-medium">
                Note: You can only edit trivia for matches that have not started
                yet.
              </span>
            </p>
          </div>
        )}

        {/* Trivia List */}
        <div className="mt-8">
          <h3 className="text-2xl font-serif mb-6">Upcoming Trivia</h3>

          {loading ? (
            <div className="text-center py-8">Loading trivia questions...</div>
          ) : triviaList.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              No upcoming trivia found
            </div>
          ) : (
            <div className="space-y-4">
              {triviaList.map((trivia) => (
                <div
                  key={trivia.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center"
                >
                  <div className="grid grid-cols-4 sm:grid-cols-9 gap-4 flex-1 w-full mb-4 sm:mb-0">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">ID</div>
                      <div className="font-medium text-sm">{trivia.id}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Match</div>
                      <div className="font-medium text-sm">
                        {trivia.match_name
                          ? trivia.match_name.split(" - ")[0]
                          : ""}
                      </div>
                    </div>
                    <div className="text-center sm:col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Question</div>
                      <div className="font-medium text-sm">
                        {formatPreview(trivia.question)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option A</div>
                      <div className="text-xs">
                        {formatPreview(trivia.option_a)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option B</div>
                      <div className="text-xs">
                        {formatPreview(trivia.option_b)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option C</div>
                      <div className="text-xs">
                        {formatPreview(trivia.option_c)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option D</div>
                      <div className="text-xs">
                        {formatPreview(trivia.option_d)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Points</div>
                      <div className="font-medium text-sm">
                        {trivia.bet_amount}
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto sm:ml-4">
                    <button
                      className="w-full sm:w-auto bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                      onClick={() => handleSelectTrivia(trivia)}
                    >
                      Edit Trivia
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditTrivia;
