import { React, useState, useEffect } from "react";
import { useMatchesContext } from "../../../contexts/matches";
import { getTriviaHistory, createTrivia } from "../../../api/trivia";

function CreateTrivia() {
  const { matches, getMatchById } = useMatchesContext();
  const [triviaHistory, setTriviaHistory] = useState([]);
  const [refreshTrivia, setRefreshTrivia] = useState(false);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  // Form state
  const [selectedMatchId, setSelectedMatchId] = useState(0);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    // Filter matches to only include upcoming ones (datetime in the future)
    const now = new Date();
    const filtered = matches.filter((match) => new Date(match.datetime) > now);
    setUpcomingMatches(filtered);

    const fetchTrivia = async () => {
      const triviaData = await getTriviaHistory();
      setTriviaHistory(triviaData);
    };
    fetchTrivia();
  }, [refreshTrivia, matches]);

  const handleCreateTrivia = async () => {
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

    const match = getMatchById(selectedMatchId);
    if (!match) {
      alert("Selected match not found");
      return;
    }

    // Double-check that the match is still in the future
    const matchDate = new Date(match.datetime);
    const now = new Date();
    if (matchDate <= now) {
      alert("You can only create trivia for upcoming matches");
      return;
    }

    let matchNameStr =
      match.first_team_name +
      " vs " +
      match.second_team_name +
      " - " +
      new Date(match.datetime).toLocaleDateString();

    await createTrivia(
      selectedMatchId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      betAmount,
      matchNameStr
    );

    // Reset form
    setSelectedMatchId(0);
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setBetAmount(0);

    setRefreshTrivia(!refreshTrivia);
  };

  // Add a function to format dates with timezone info
  const formatDateWithTimezone = (dateString) => {
    // Database has UTC time, but we display in user's local timezone
    const date = new Date(dateString);

    // Extract just the time portion in 24-hour format
    const timeStr = date.toISOString().slice(11, 16); // HH:MM format

    // For admin purposes, we'll display local time with GMT reference
    return date.toLocaleString() + ` (Local) [${timeStr} GMT]`;
  };

  return (
    <>
      <div>
        <h3 className="text-3xl font-serif mb-8">Create New Trivia</h3>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {/* Match Selection */}
            <div className="mb-4">
              <label className="block text-base sm:text-xl mb-2">
                Select Upcoming Match
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedMatchId}
                onChange={(e) => setSelectedMatchId(Number(e.target.value))}
              >
                <option value="">Select a match</option>
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((match) => (
                    <option key={match.id} value={match.id}>
                      {match.first_team_name} vs {match.second_team_name} -{" "}
                      {formatDateWithTimezone(match.datetime)}
                    </option>
                  ))
                ) : (
                  <option disabled>No upcoming matches available</option>
                )}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Only upcoming matches are shown. You cannot create trivia for
                past matches.
              </p>
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
              <button
                className="w-full bg-[#27ae60] hover:bg-[#2ecc71] text-white py-2 rounded-md font-medium mt-6"
                onClick={handleCreateTrivia}
                disabled={upcomingMatches.length === 0}
              >
                Create Trivia
              </button>
            </div>
          </div>
        </div>

        {/* Trivia History Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-serif mb-8">All Trivia</h3>

          <div className="space-y-4">
            {triviaHistory.length > 0 ? (
              triviaHistory.map((trivia) => (
                <div
                  key={trivia.id}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="grid grid-cols-4 sm:grid-cols-9 gap-4">
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
                        {trivia.question}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option A</div>
                      <div className="text-xs">{trivia.option_a}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option B</div>
                      <div className="text-xs">{trivia.option_b}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option C</div>
                      <div className="text-xs">{trivia.option_c}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Option D</div>
                      <div className="text-xs">{trivia.option_d}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Points</div>
                      <div className="font-medium text-sm">
                        {trivia.bet_amount}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No trivia questions found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTrivia;
