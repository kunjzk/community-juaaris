import React, { useState, useEffect } from "react";
import { getSecondDimensionForDate } from "../../api/gameplay";
import { getTeamNameById } from "../../api/teams";
import { saveResult } from "../../api/matches";
import { useMatchesContext } from "../../contexts/matches";

function ResultsCard({ matchId, teams, dateTime, venue }) {
  const { getMatchById, refreshMatches } = useMatchesContext();

  const match = getMatchById(matchId);
  if (!match || !match.datetime) {
    console.error("No match found or match has no datetime");
    return;
  }

  const [secondDimensionCutoff, setSecondDimensionCutoff] = useState(null);
  const [winningTeam, setWinningTeam] = useState("");
  const [totalScore, setTotalScore] = useState("");
  const [secondDimValidBool, setSecondDimValidBool] = useState(null);
  const [resultExists, setResultExists] = useState(false);

  useEffect(() => {
    if (matchId) {
      setWinningTeam(match.outcome_winning_team || "");
      setTotalScore(match.outcome_total_score || "");
      setSecondDimValidBool(
        match.outcome_more_or_less === "MORE" ||
          match.outcome_more_or_less === "LESS"
          ? true
          : false
      );
    }
  }, [matchId]);

  // Separate useEffect to check if result exists
  useEffect(() => {
    if (winningTeam && totalScore && secondDimValidBool !== null) {
      setResultExists(true);
    } else {
      setResultExists(false);
    }
  }, [winningTeam, totalScore, secondDimValidBool]);

  useEffect(() => {
    const fetchSecondDimension = async () => {
      try {
        // Convert the datetime to a format the database expects
        const matchDate = new Date(match.datetime);
        const formattedDate = matchDate.toISOString().split("T")[0];
        const records = await getSecondDimensionForDate(formattedDate);
        console.log("SECOND DIMENSION RECORDS: ", records);
        if (records && records.length > 0) {
          setSecondDimensionCutoff(records[0].second_dimension_cutoff);
        } else {
          setSecondDimensionCutoff("No second dimension set");
        }
      } catch (error) {
        console.error("Error fetching second dimension:", error);
        setSecondDimensionCutoff("Error loading second dimension");
      }
    };

    fetchSecondDimension();
  }, [matchId]);

  const handleSaveResult = async () => {
    // Input validation
    if (!winningTeam || !totalScore || !secondDimValidBool) {
      console.error("Missing required fields");
      alert(
        "Missing required fields: winning team, total score, or second dimension valid"
      );
      return;
    }

    console.log("Saving result to database");
    console.log("Winning team: ", winningTeam);
    console.log("Total score: ", totalScore);
    console.log("Second dim valid: ", secondDimValidBool);

    // Check if there is already a result for this match
    if (resultExists) {
      console.error("Result already exists for this match");
      alert(
        "Result already exists for this match and you cannot edit it for now"
      );
      return;
    }

    let more_or_less = "";
    if (secondDimValidBool === "true") {
      const second_dim_threshold = secondDimensionCutoff;
      if (totalScore > second_dim_threshold) {
        more_or_less = "MORE";
      } else {
        more_or_less = "LESS";
      }
    } else {
      more_or_less = "INVALID";
    }

    // Try to save the result
    try {
      console.log("Saving result to database");
      await saveResult(matchId, winningTeam, totalScore, more_or_less);
      setResultExists(true);
      refreshMatches(); // Refresh the matches data after saving
      console.log("Result saved to database");
    } catch (error) {
      console.error("Error saving result:", error);
      alert("Error saving result, please try again");
    }
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
              {secondDimensionCutoff === null
                ? "Loading..."
                : secondDimensionCutoff}
            </div>
          </div>
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Winning Team
            </div>
            {resultExists ? (
              <div className="font-medium text-xs sm:text-sm">
                {getTeamNameById(winningTeam)}
              </div>
            ) : (
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
            )}
          </div>
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Total Score
            </div>
            {resultExists ? (
              <div className="font-medium text-xs sm:text-sm">{totalScore}</div>
            ) : (
              <input
                type="number"
                className="border border-gray-300 rounded px-2 h-10 w-[120px] sm:w-[140px]"
                value={totalScore}
                onChange={(e) => setTotalScore(e.target.value)}
                min="0"
                step="1"
              />
            )}
          </div>
          <div className="text-center col-span-1">
            <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
              Second dimension valid?
            </div>
            {resultExists ? (
              <div className="font-medium text-xs sm:text-sm">
                {match.outcome_more_or_less === "INVALID" ? "NO" : "YES"}
              </div>
            ) : (
              <select
                className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
                value={secondDimValidBool}
                onChange={(e) => setSecondDimValidBool(e.target.value)}
              >
                <option value="">Select option</option>
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            )}
          </div>
          <button
            className="col-span-1 px-1 h-10 leading-none bg-[#4b6c43] text-white rounded-md hover:bg-[#3d5836] transition-colors text-xs sm:text-sm whitespace-nowrap"
            disabled={resultExists}
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
