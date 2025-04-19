import React, { useState, useEffect } from "react";
import { getSecondDimensionForDate } from "../../api/gameplay";
import { useMatchesContext } from "../../contexts/matches";

function ResultsCard({ matchId, teams, dateTime, venue }) {
  const [secondDimension, setSecondDimension] = useState(null);
  const { getMatchById } = useMatchesContext();

  useEffect(() => {
    const fetchSecondDimension = async () => {
      try {
        const match = getMatchById(matchId);
        if (!match || !match.datetime) {
          console.error("No match found or match has no datetime");
          return;
        }

        // Convert the datetime to a format the database expects
        const matchDate = new Date(match.datetime);
        const formattedDate = matchDate.toISOString().split("T")[0];

        const records = await getSecondDimensionForDate(formattedDate);
        if (records && records.length > 0) {
          setSecondDimension(records[0].second_dimension_cutoff);
        } else {
          setSecondDimension("No second dimension set");
        }
      } catch (error) {
        console.error("Error fetching second dimension:", error);
        setSecondDimension("Error loading second dimension");
      }
    };

    fetchSecondDimension();
  }, [matchId]);

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
              Date
            </div>
            <div className="font-medium text-xs sm:text-sm">{dateTime}</div>
          </div>
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Second Dimension
            </div>
            <div className="font-medium text-xs sm:text-sm">
              {secondDimension === null ? "Loading..." : secondDimension}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;
