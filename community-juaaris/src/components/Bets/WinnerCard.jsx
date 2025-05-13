import React, { useState, useEffect } from "react";
import { getWinnerNamesAndWinnings } from "../../api/bets";

function WinnerCard({ matchId, winningTeam, moreOrLess, bet_amount }) {
  const [winners, setWinners] = useState([]);
  const [netWinningsPerWinner, setNetWinningsPerWinner] = useState([]);

  useEffect(() => {
    const fetchWinnersAndWinnings = async () => {
      try {
        const winnersAndWinnings = await getWinnerNamesAndWinnings(matchId);
        console.log("Winners and winnings:", winnersAndWinnings);
        setWinners(winnersAndWinnings);
        const netWinnings = (14 - winnersAndWinnings.length) * bet_amount;
        setNetWinningsPerWinner(
          parseFloat((netWinnings / winnersAndWinnings.length).toFixed(2))
        );
      } catch (error) {
        console.error("Error getting winners and winnings:", error);
      }
    };
    fetchWinnersAndWinnings();
  }, []);

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
            Match Results
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-600">Winning Team</p>
              <p className="text-lg font-medium text-gray-900">{winningTeam}</p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-600">Second Dimension</p>
              <p className="text-lg font-medium text-gray-900">{moreOrLess}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-sm text-gray-600">Net Winnings per Winner</p>
            <p className="text-2xl font-bold text-green-600">
              ${netWinningsPerWinner}
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

export default WinnerCard;
