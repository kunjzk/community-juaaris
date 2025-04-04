import React from "react";

function GameCard({ teams, venue, dateTime, betCutoffTime, cutoffExceeded }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#fafdf7] p-4 flex items-center">
      <div className="grid grid-cols-5 flex-1">
        <div className="text-center col-span-1">
          <div className="text-xs text-gray-500 mb-1">Teams</div>
          <div className="font-medium text-sm">{teams}</div>
        </div>
        <div className="text-center col-span-1">
          <div className="text-xs text-gray-500 mb-1">Venue</div>
          <div className="font-medium text-sm">{venue}</div>
        </div>
        <div className="text-center col-span-1">
          <div className="text-xs text-gray-500 mb-1">Date/Time</div>
          <div className="font-medium text-sm">{dateTime}</div>
        </div>
        <div className="text-center col-span-2 pl-6">
          <div className="text-xs text-gray-500 mb-1">Bet Cutoff Time</div>
          <div className="font-medium text-sm">{betCutoffTime}</div>
        </div>
      </div>
      <div className="ml-4">
        {cutoffExceeded ? (
          <button className="bg-[#d9534f] text-white px-3 py-1.5 rounded-md hover:bg-[#c9302c] transition-colors text-sm whitespace-nowrap">
            Cutoff exceeded, view
          </button>
        ) : (
          <button className="bg-[#4b6c43] text-white px-3 py-1.5 rounded-md hover:bg-[#3d5836] transition-colors text-sm">
            Place your bet
          </button>
        )}
      </div>
    </div>
  );
}

export default GameCard;
