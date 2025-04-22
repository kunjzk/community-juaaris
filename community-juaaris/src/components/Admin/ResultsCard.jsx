import React, { useState, useEffect } from "react";
import { getSecondDimensionForDate } from "../../api/gameplay";
import { useMatchesContext } from "../../contexts/matches";

function ResultsCard({ matchId, teams, dateTime, venue }) {
  const [secondDimension, setSecondDimension] = useState(null);
  const [winningTeam, setWinningTeam] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [secondDimValidBool, setSecondDimValidBool] = useState(true);
  const { getMatchById } = useMatchesContext();

  const match = getMatchById(matchId);
  if (!match || !match.datetime) {
    console.error("No match found or match has no datetime");
    return;
  }

  useEffect(() => {
    const fetchSecondDimension = async () => {
      try {
        // Convert the datetime to a format the database expects
        const matchDate = new Date(match.datetime);
        const formattedDate = matchDate.toISOString().split("T")[0];
        const records = await getSecondDimensionForDate(formattedDate);
        console.log("SECOND DIMENSION RECORDS: ", records);
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

  const handleSaveResult = () => {
    console.log("Saving result to database");
    console.log("Winning team: ", winningTeam);
    console.log("Total score: ", totalScore);
    console.log("Second dim valid: ", secondDimValidBool);
  };

  return (
    <div>
      <div className="rounded-xl border border-gray-200 bg-[#fafdf7] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 flex-1 w-full mb-3 sm:mb-0">
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
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Winning Team
            </div>
            <select
              className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
              value={winningTeam}
              onChange={(e) => setWinningTeam(e.target.value)}
            >
              <option value="">Select team</option>
              <option value={match.first_team_id}>
                {match.first_team_name}
              </option>
              <option value={match.second_team_id}>
                {match.second_team_name}
              </option>
              <option value="Draw">Draw</option>
            </select>
          </div>
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Input Total Score
            </div>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
              value={totalScore}
              onChange={(e) => setTotalScore(e.target.value)}
              min="0"
              step="1"
            />
          </div>
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Second dimension valid?
            </div>
            <select
              className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
              value={secondDimValidBool}
              onChange={(e) => setSecondDimValidBool(e.target.value)}
            >
              <option value="">Select option</option>
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
          </div>
          <button
            className="w-full sm:w-auto bg-[#4b6c43] text-white rounded-md hover:bg-[#3d5836] transition-colors text-xs sm:text-sm whitespace-nowrap"
            onClick={handleSaveResult}
          >
            Save result
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;
