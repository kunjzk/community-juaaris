import React from "react";
import { useNavigate } from "react-router-dom";

function GameCard({
  matchId,
  teams,
  venue,
  dateTime,
  betCutoffTime,
  cutoffExceeded,
  outcomeWashout,
  outcomeMoreOrLess,
  outcomeTotalScore,
  outcomeWinningTeam,
}) {
  const navigate = useNavigate();

  // Check if there is a result for the game
  const hasResult =
    outcomeWashout ||
    (outcomeMoreOrLess && outcomeTotalScore && outcomeWinningTeam);
  console.log("hasResult", hasResult);

  // Handle button click
  const handleButtonClick = () => {
    navigate(`/preds/${matchId}`);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-[#fafdf7] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4 flex-1 w-full mb-3 sm:mb-0">
        <div className="text-center col-span-1">
          <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
            Teams
          </div>
          <div className="font-medium text-xs sm:text-sm">{teams}</div>
        </div>
        <div className="text-center col-span-1">
          <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
            Venue
          </div>
          <div className="font-medium text-xs sm:text-sm">{venue}</div>
        </div>
        <div className="text-center col-span-1">
          <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
            Date/Time
          </div>
          <div className="font-medium text-xs sm:text-sm">{dateTime}</div>
        </div>
        <div className="text-center col-span-1 sm:col-span-2 sm:pl-6">
          <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
            Prediction Cutoff Time
          </div>
          <div className="font-medium text-xs sm:text-sm">{betCutoffTime}</div>
        </div>
      </div>
      <div className="w-full sm:w-auto sm:ml-4">
        {hasResult ? (
          <button
            onClick={handleButtonClick}
            className="w-full sm:w-auto bg-[#131aa3] text-white px-3 py-1.5 rounded-md hover:bg-[#3d5836] transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            View winners
          </button>
        ) : cutoffExceeded ? (
          <button
            onClick={handleButtonClick}
            className="w-full sm:w-auto bg-[#d9534f] text-white px-3 py-1.5 rounded-md hover:bg-[#c9302c] transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Cutoff exceeded, view all predictions
          </button>
        ) : (
          <button
            onClick={handleButtonClick}
            className="w-full sm:w-auto bg-[#4b6c43] text-white px-3 py-1.5 rounded-md hover:bg-[#3d5836] transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Predictions Open
          </button>
        )}
      </div>
    </div>
  );
}

export default GameCard;
