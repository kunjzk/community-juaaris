import { React, useState, useEffect } from "react";
import { useMatchesContext } from "../../../contexts/matches";
import { getTriviaHistory, createTrivia } from "../../../api/trivia";

function CreateTrivia() {
  const { matches, getMatchById } = useMatchesContext();
  const [triviaHistory, setTriviaHistory] = useState([]);
  const [refreshTrivia, setRefreshTrivia] = useState(false);

  // Form state
  const [selectedMatchId, setSelectedMatchId] = useState(0);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    const fetchTrivia = async () => {
      const triviaData = await getTriviaHistory();
      setTriviaHistory(triviaData);
    };
    fetchTrivia();
  }, [refreshTrivia]);

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
    console.log("Selected match ID: ", selectedMatchId);
    const match = getMatchById(selectedMatchId);
    console.log("MATCH: ", match);
    let matchNameStr =
      match.first_team_name +
      " vs " +
      match.second_team_name +
      " - " +
      new Date(match.datetime).toLocaleDateString();
    console.log(matchNameStr);
    console.log("Selected match: ", selectedMatchId);
    console.log("Question: ", question);
    console.log("option a: ", optionA);
    console.log("option b: ", optionB);
    console.log("option c: ", optionC);
    console.log("option d: ", optionD);
    console.log("Bet amount: ", betAmount);
    console.log("Match Name String: ", matchNameStr);

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

  return (
    <>
      <div>
        <h3 className="text-3xl font-serif mb-8">Create New Trivia</h3>

        <div className="bg-white rounded-lg shadow-md p-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base sm:text-xl mb-2">
                  Bet Amount
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
              >
                Create Trivia
              </button>
            </div>
          </div>
        </div>

        {/* Trivia History Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-serif mb-8">All Trivia</h3>

          {/* Table Header */}
          <div className="bg-gray-100 rounded-t-lg border border-gray-200 grid grid-cols-12 font-medium text-gray-700">
            <div className="px-3 py-3 border-r border-gray-200 text-center col-span-3">
              Match
            </div>
            <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
              Question
            </div>
            <div className="px-6 py-3 text-center col-span-3">Options</div>
          </div>

          {/* Table Body */}
          <div className="rounded-b-lg overflow-hidden border-x border-b border-gray-200 bg-white">
            {triviaHistory.map((trivia) => (
              <div
                key={trivia.id}
                className="grid grid-cols-12 border-t border-gray-200"
              >
                <div className="px-6 py-3 border-r border-gray-200 text-center col-span-3">
                  {trivia.match_name}
                </div>
                <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
                  {trivia.question}
                </div>
                <div className="px-6 py-3 text-center col-span-3">
                  A: {trivia.option_a}, B: {trivia.option_b}, C:{" "}
                  {trivia.option_c}, D: {trivia.option_d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTrivia;
