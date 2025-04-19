import React from "react";
import { getSecondDimensionForDate } from "../../api/gameplay";
import { getMatchById } from "../../api/matches";

function getSecondDimensionForMatch(matchId) {
  const matchDate = getMatchById(matchId).date;
  const secondDimension = getSecondDimension(matchDate);
  return secondDimension;
}

function ResultsCard({ matchId, teams, venue }) {
  return (
    <div>
      <div className="rounded-xl border border-gray-200 bg-[#fafdf7] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4 flex-1 w-full mb-3 sm:mb-0">
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Match ID
            </div>
            <div className="font-medium text-xs sm:text-sm">{matchId}</div>
          </div>
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
              Second Dimension
            </div>
            <div className="font-medium text-xs sm:text-sm">
              {() => {
                getSecondDimensionForMatch(matchId);
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;
