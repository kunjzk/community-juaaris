import React, { useState, useEffect } from "react";
import { useMatchesContext } from "../../../contexts/matches";
import { useNavigate } from "react-router-dom";
import { resetMatchResult } from "../../../api/matches";

// 1. If there is a result for the match, show it
// 2. If there is no result for the match, show the form to add a result
// Editing of results is not allowed, for now.

function ResultsCard({ matchId, teams, dateTime, result, submitResult }) {
  // console.log("ResultsCard component rendered for match id: ", matchId);
  const {
    getMatchById,
    getWinningTeamName,
    getNextGameBetAmount,
    refreshMatches,
  } = useMatchesContext();
  const navigate = useNavigate();
  const match = getMatchById(matchId);
  if (!match || !match.datetime) {
    console.error("No match found or match has no datetime");
    return;
  }

  const [winningTeam, setWinningTeam] = useState("");
  const [totalScore, setTotalScore] = useState("");
  const [secondDimValidBool, setSecondDimValidBool] = useState(true);
  const [washoutBool, setWashoutBool] = useState(false);
  const [nextGameBetAmount, setNextGameBetAmount] = useState(0);

  // Get second dimension cutoff from the match object
  const secondDimensionCutoff = match.second_dimension_cutoff;

  useEffect(() => {
    const getNextGameBet = async () => {
      if (match.washout) {
        const nextGameBetAmount = await getNextGameBetAmount(matchId);
        setNextGameBetAmount(nextGameBetAmount);
      }
    };
    getNextGameBet();
  }, [result]);

  const handleSaveResult = () => {
    console.log(`DEBUG ResultsCard: Saving result for match id: ${matchId}`);
    console.log(
      `DEBUG ResultsCard: washoutBool=${washoutBool}, type=${typeof washoutBool}`
    );
    console.log(
      `DEBUG ResultsCard: secondDimValidBool=${secondDimValidBool}, type=${typeof secondDimValidBool}`
    );
    console.log(
      `DEBUG ResultsCard: winningTeam=${winningTeam}, totalScore=${totalScore}`
    );

    if (washoutBool === true) {
      // If washout, set more_or_less to "INVALID"
      console.log("WASHOUT for Match ID: ", matchId);
      console.log("Washout value is: ", washoutBool);
      console.log("Washout type is: ", typeof washoutBool);

      submitResult({
        matchId: matchId,
        winningTeam: "WASHOUT",
        totalScore: 0,
        moreOrLess: "INVALID",
        washout: true,
        betAmount: 0,
      });
      return;
    } else {
      console.log("NO WASHOUT for Match ID: ", matchId);
      console.log("Washout value is: ", washoutBool);
      console.log("Washout type is: ", typeof washoutBool);
      // Input validation
      if (!winningTeam || !totalScore || secondDimValidBool === false) {
        alert(
          "Missing required fields: winning team, total score, or second dimension valid"
        );
        return;
      }

      // Set more_or_less
      let moreOrLess = "";
      if (secondDimValidBool === true) {
        const second_dim_threshold = secondDimensionCutoff;
        if (parseInt(totalScore) > second_dim_threshold) {
          moreOrLess = "MORE";
        } else {
          moreOrLess = "LESS";
        }
      } else {
        moreOrLess = "INVALID";
      }

      console.log(`DEBUG ResultsCard: Calculated moreOrLess=${moreOrLess}`);

      // Update the result
      submitResult({
        matchId: matchId,
        winningTeam: winningTeam,
        totalScore: totalScore,
        moreOrLess: moreOrLess,
        washout: false,
        betAmount: match.bet_amount,
      });
    }
  };

  const goToBetsPageForMatch = () => {
    // console.log("Going to bets page for match id: ", matchId);
    navigate(`/preds/${matchId}`);
  };

  const resetResult = async () => {
    try {
      await resetMatchResult(matchId);
      // Refresh the matches context to reflect changes
      refreshMatches();
      alert("Result has been reset successfully");
    } catch (error) {
      console.error("Error resetting result:", error);
      alert("Error resetting result: " + error.message);
    }
  };

  const renderForm = () => {
    // console.log("Rendering form for match id: ", matchId);
    // To reduce code duplication, we will render the static elements of the form in a loop
    const staticElements = [
      { label: "Match", value: matchId + ": " + teams },
      { label: "Date", value: dateTime },
      { label: "Second Dimension", value: secondDimensionCutoff },
    ];

    return (
      <div>
        <div className="rounded-xl border border-gray-200 bg-[#fafdf7] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 flex-1 w-full mb-3 sm:mb-0">
            {/* Static elements */}
            {staticElements.map((element, index) => (
              <div key={index} className="text-center col-span-1">
                <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                  {element.label}
                </div>
                <div className="font-medium text-xs sm:text-sm">
                  {element.value}
                </div>
              </div>
            ))}

            {/* Dynamic elements */}

            {/* Washout? */}
            <div className="text-center col-span-1">
              <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                Washout?
              </div>
              <select
                className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
                value={String(washoutBool)}
                onChange={(e) => {
                  if (e.target.value === "true") {
                    alert(
                      "Be careful, if washout is True then there is no result for this game. If you are 100% sure, close this warning and click save result. Otherwise, close this warning and select False for washout."
                    );
                  }
                  setWashoutBool(e.target.value === "true");
                }}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>

            {/* Input to select winning team */}
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

            {/* Input to enter total score */}
            <div className="text-center col-span-1">
              <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                Total Score
              </div>
              <input
                type="number"
                className="border border-gray-300 rounded px-2 h-10 w-[120px] sm:w-[140px]"
                value={totalScore}
                onChange={(e) => setTotalScore(e.target.value)}
                min="0"
                step="1"
              />
            </div>

            {/* Input to select if second dimension is valid */}
            <div className="text-center col-span-1">
              <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                Second dimension valid?
              </div>
              <select
                className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
                value={String(secondDimValidBool)}
                onChange={(e) =>
                  setSecondDimValidBool(e.target.value === "true")
                }
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>

            {/* Button to save the result */}
            <button
              className="col-span-1 px-1 h-10 leading-none bg-[#4b6c43] text-white rounded-md hover:bg-[#3d5836] transition-colors text-xs sm:text-sm whitespace-nowrap"
              onClick={() =>
                handleSaveResult(
                  matchId,
                  winningTeam,
                  totalScore,
                  secondDimValidBool,
                  washoutBool
                )
              }
            >
              Save result
            </button>
          </div>
        </div>
      </div>
    );
  };

  // If the match is a washout, we will update the washout bool in the match object to be true
  // For this, the database model needs to be updated to include a washout column
  // If washout is true, we want to double the next game's bet mount

  function renderResult() {
    // console.log("Rendering result for match id: ", matchId);
    let data = [];
    if (match.washout) {
      data = [
        { label: "Match", value: matchId + ": " + teams },
        { label: "WASHOUT", value: "Yes" },
        { label: "Next Game Bet Amount", value: nextGameBetAmount },
      ];
    } else {
      data = [
        { label: "Match", value: matchId + ": " + teams },
        { label: "Second Dim Cutoff", value: secondDimensionCutoff },
        { label: "Winner", value: getWinningTeamName(match) },
        { label: "Total Score", value: match.outcome_total_score },
        {
          label: "Second Dim Outcome",
          value:
            match.outcome_more_or_less === "INVALID"
              ? "Not applicable"
              : match.outcome_more_or_less,
        },
      ];
    }
    return (
      <div>
        <div className="rounded-xl border border-gray-200 bg-[#fafdf7] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center">
          <div className="grid grid-cols-2 sm:grid-cols-10 gap-2 sm:gap-4 flex-1 w-full mb-3 sm:mb-0">
            {data.map((element, index) => (
              <div
                key={index}
                className={`text-center ${
                  element.label === "Winner" || element.label === "Total Score"
                    ? "col-span-1"
                    : "col-span-2"
                }`}
              >
                <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
                  {element.label}
                </div>
                <div className="font-medium text-xs sm:text-sm">
                  {element.value}
                </div>
              </div>
            ))}
            <div className="col-span-1">
              <button
                className="w-full px-1 h-10 leading-none bg-[#1554ba] text-white rounded-md hover:bg-[#303f58] transition-colors text-xs sm:text-sm whitespace-nowrap"
                onClick={() => goToBetsPageForMatch(matchId)}
              >
                View Winners
              </button>
            </div>
            <div className="col-span-1">
              <button
                className="w-full px-1 h-10 leading-none bg-[#d9534f] text-white rounded-md hover:bg-[#c9302c] transition-colors text-xs sm:text-sm whitespace-nowrap"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to reset this result? This action cannot be undone."
                    )
                  ) {
                    resetResult();
                  }
                }}
              >
                Reset Result
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCardContent() {
    // console.log("Rendering card content for match id: ", matchId);
    if (result === null) {
      // console.log("Result is null, so we are rendering the form");
      return renderForm();
    } else {
      // console.log("Result is not null, so we are rendering the result");
      return renderResult();
    }
  }

  return <div>{renderCardContent()}</div>;
}

export default ResultsCard;
