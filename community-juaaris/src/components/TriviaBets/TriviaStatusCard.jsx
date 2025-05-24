import React, { useState, useEffect } from "react";
import { getWinnerNamesAndWinningsForTrivia } from "../../api/trivia_bets";

function TriviaStatusCard({ trivia, nextTrivia }) {
  const [winners, setWinners] = useState([]);
  const [netWinningsPerWinner, setNetWinningsPerWinner] = useState(0);

  useEffect(() => {
    const fetchWinnersAndWinnings = async () => {
      try {
        const winnersAndWinnings = await getWinnerNamesAndWinningsForTrivia(
          trivia.id
        );
        setWinners(winnersAndWinnings);
        if (winnersAndWinnings.length > 0) {
          const netWinnings =
            (14 - winnersAndWinnings.length) * trivia.bet_amount;
          setNetWinningsPerWinner(
            parseFloat((netWinnings / winnersAndWinnings.length).toFixed(2))
          );
        }
      } catch (error) {
        console.error("Error getting winners and winnings:", error);
      }
    };

    if (trivia.correct_option && trivia.correct_option !== "X") {
      fetchWinnersAndWinnings();
    }
  }, [trivia]);

  if (!trivia.correct_option) {
    return null;
  }

  if (trivia.correct_option === "X") {
    return (
      <div className="mb-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-yellow-800">
              Trivia Status
            </h2>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-lg font-medium text-yellow-800">
              This trivia has been voided
            </p>
            {nextTrivia && (
              <p className="text-base text-yellow-700 mt-2">
                The next trivia is worth {nextTrivia.bet_amount} points
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-green-800">
            Trivia Results
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-sm text-gray-600">Correct Option</p>
            <p className="text-lg font-medium text-gray-900">
              Option {trivia.correct_option}
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-sm text-gray-600">Net Winnings per Winner</p>
            <p className="text-2xl font-bold text-green-600">
              {netWinningsPerWinner} Points
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm">
          <p className="text-sm text-gray-600 mb-3">Winners</p>
          <div className="flex flex-wrap gap-3">
            {winners.map((winner) => (
              <span
                key={winner.id}
                className="inline-flex items-center px-4 py-2 rounded-lg text-base font-semibold bg-green-100 text-green-800 border border-green-200 shadow-sm hover:bg-green-200 transition-colors duration-200"
              >
                {winner.display_name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TriviaStatusCard;
