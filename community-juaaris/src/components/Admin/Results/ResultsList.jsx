import React, { useState, useEffect } from "react";
import ResultsCard from "./ResultsCard";
import { useMatchesContext } from "../../../contexts/matches";
import {
  updateSuccessfulColumnInBetsTable,
  getWinnerIDs,
  allBetsUnsuccessful,
  updateNetWinnings,
  updateSuccessfulColumnInBetsTableForInvalid,
  checkNullSuccessfulBets,
  checkBetsStatus,
  setNonWinnersToFalse,
  setNonWinnersToFalseForInvalid,
} from "../../../api/bets";
import {
  saveResult,
  updateWashoutAndBetAmount,
  doubleBetAmount,
} from "../../../api/matches";
import {
  getJuaarisAndWinnings,
  updateTotalWinnings,
  updateOrangeCap,
  updatePurpleCap,
} from "../../../api/juaaris";

const saveMatchResultAndCalculateAllWinnings = async (
  matchId,
  winningTeam,
  totalScore,
  more_or_less,
  washout,
  bet_amount,
  match_datetime
) => {
  console.log(
    `DEBUG: saveMatchResultAndCalculateAllWinnings for match ${matchId}`
  );
  console.log(
    `DEBUG: Parameters - winningTeam: ${winningTeam}, totalScore: ${totalScore}, more_or_less: ${more_or_less}, washout: ${washout}`
  );

  // 1. Save the result of the match
  try {
    console.log("RESULT POST: Saving result to database");
    console.log("RESULT POST: Winning team:", winningTeam);
    console.log("RESULT POST: Total score:", totalScore);
    console.log("RESULT POST: More or less:", more_or_less);
    console.log("RESULT POST: Washout:", washout);
    if (washout === true) {
      console.log("RESULT POST: Washout, so saving result as INVALID");
      await saveResult(matchId, null, 0, "INVALID", true);
    } else {
      await saveResult(matchId, winningTeam, totalScore, more_or_less, false);
    }
  } catch (error) {
    console.error("RESULT POST: Error saving match result:", error);
    alert("RESULT POST: Error saving match result, please tell Kunal");
    return;
  }

  if (washout) {
    console.log("RESULT POST: Washout, so no need to calculate winnings");
    // Set washout to true in matches table
    try {
      await updateWashoutAndBetAmount(matchId, true, 0);
    } catch (error) {
      console.error(
        "RESULT POST: Error updating washout and bet amount:",
        error
      );
      alert(
        "RESULT POST: Error updating washout and bet amount, please tell Kunal"
      );
      return;
    }
    // Set bet amount to 0 in matches table (note we're already getting a 0 value from the card)
    try {
      console.log("RESULT POST: Setting all bets to unsuccessful");
      await allBetsUnsuccessful(matchId);
    } catch (error) {
      console.error(
        "RESULT POST: Error updating successful column in bets table:",
        error
      );
      alert(
        "RESULT POST: Error updating successful column in bets table, please tell Kunal"
      );
      return;
    }
    // Set bet amount to double for next match in matches table
    try {
      await doubleBetAmount(Number(matchId) + 1);
    } catch (error) {
      console.error("RESULT POST: Error updating bet amount:", error);
      alert("RESULT POST: Error updating bet amount, please tell Kunal");
      return;
    }
  } else if (more_or_less === "INVALID") {
    console.log(
      "RESULT POST: More/Less is INVALID, only checking winning team"
    );
    // Update successful column based only on winning team
    try {
      console.log(
        `DEBUG: Calling updateSuccessfulColumnInBetsTableForInvalid with matchId=${matchId}, winningTeam=${winningTeam}`
      );

      // Check for NULL successful values
      console.log("DEBUG: Checking for NULL successful values before update");
      const nullBets = await checkNullSuccessfulBets(matchId);
      console.log("DEBUG: Bets with NULL successful:", nullBets);

      // Check all bets status
      console.log("DEBUG: All bets status before update:");
      const allBets = await checkBetsStatus(matchId);
      console.log(allBets);

      // First update - using predicted_winning_team = $2
      await updateSuccessfulColumnInBetsTableForInvalid(matchId, winningTeam);

      // Second update - explicitly set non-winners to FALSE to ensure it happens
      console.log(
        "DEBUG: Running second update to explicitly set non-winners to FALSE for INVALID case"
      );
      await setNonWinnersToFalseForInvalid(matchId, winningTeam);

      // Check final bets status
      console.log(
        "DEBUG: Final bets status after both updates for INVALID case:"
      );
      const finalBets = await checkBetsStatus(matchId);
      console.log(finalBets);
    } catch (error) {
      console.error(
        "RESULT POST: Error updating successful column for invalid more/less:",
        error
      );
      alert(
        "RESULT POST: Error updating successful column for invalid more/less, please tell Kunal"
      );
      return;
    }
  } else {
    // 2. Update the "successful" column in the bets table
    try {
      console.log("RESULT POST: Updating successful column in bets table");
      console.log(
        `DEBUG: Calling updateSuccessfulColumnInBetsTable with matchId=${matchId}, winningTeam=${winningTeam}, more_or_less=${more_or_less}`
      );

      // Check for NULL successful values
      // console.log("DEBUG: Checking for NULL successful values before update");
      // const nullBets = await checkNullSuccessfulBets(matchId);
      // console.log("DEBUG: Bets with NULL successful:", nullBets);

      // Check all bets status
      console.log("DEBUG: All bets status before update:");
      const allBets = await checkBetsStatus(matchId);
      console.log(allBets);

      // First update - using CASE expression
      await updateSuccessfulColumnInBetsTable(
        matchId,
        winningTeam,
        more_or_less
      );

      // // Second update - explicitly set non-winners to FALSE to ensure it happens
      // console.log(
      //   "DEBUG: Running second update to explicitly set non-winners to FALSE"
      // );
      // await setNonWinnersToFalse(matchId, winningTeam, more_or_less);

      // Check final bets status
      console.log("DEBUG: Final bets status after both updates:");
      const finalBets = await checkBetsStatus(matchId);
      console.log(finalBets);
    } catch (error) {
      console.error(
        "RESULT POST: Error updating successful column in bets table:",
        error
      );
      alert(
        "RESULT POST: Error updating successful column in bets table, please tell Kunal"
      );
      return;
    }
  }

  // 3. Keep track of user ID of winners
  let winnerIds = [];
  try {
    console.log("RESULT POST: Getting user ID of winners");
    winnerIds = await getWinnerIDs(matchId);
    // Extract just the user IDs from the array of objects
    winnerIds = winnerIds.map((winner) => winner.juaari_id);
    console.log("RESULT POST: User IDs of winners:", winnerIds);
  } catch (error) {
    console.error("Error getting winner IDs:", error);
    alert("Error getting winner IDs, please tell Kunal");
    return;
  }

  let netWinningsPerWinner = 0;
  if (winnerIds.length !== 0) {
    // 4. Calculate the net change for each player
    const totalWinningsPot = bet_amount * (14 - winnerIds.length);
    netWinningsPerWinner = totalWinningsPot / winnerIds.length;
    // Round to 2 decimal places and return a number
    netWinningsPerWinner = parseFloat(netWinningsPerWinner.toFixed(2));
  }
  console.log("RESULT POST: Net winnings per winner:", netWinningsPerWinner);
  console.log(
    "RESULT POST: Type of netWinningsPerWinner:",
    typeof netWinningsPerWinner
  );

  // 5. Update net winnings for each juaari
  try {
    // TODO: Drop the accumulated_winnings column from the juaaris win history table
    console.log("RESULT POST: Updating net winnings for each juaari");
    await updateNetWinnings(
      matchId,
      winnerIds,
      netWinningsPerWinner,
      bet_amount
    );
  } catch (error) {
    console.error("RESULT POST: Error updating net winnings:", error);
    alert("RESULT POST: Error updating net winnings, please tell Kunal");
    return;
  }

  // 6. Update total winnings for juaaris
  try {
    console.log("RESULT POST: Updating total winnings for all juaaris");
    await updateTotalWinnings(winnerIds, netWinningsPerWinner, bet_amount);
  } catch (error) {
    console.error("RESULT POST: Error updating total winnings:", error);
    alert("RESULT POST: Error updating total winnings, please tell Kunal");
    return;
  }

  try {
    // TODO: drop the orange and purple cap columns from the juaaris table
    console.log("RESULT POST: Updating orange and purple caps");
    const allWinnings = await getJuaarisAndWinnings();
    console.log("RESULT POST: All winnings:", allWinnings);
    const purpleCapId = allWinnings[0].id;
    const orangeCapId = allWinnings[allWinnings.length - 1].id;
    console.log("RESULT POST: Orange cap ID:", orangeCapId);
    console.log("Purple cap ID:", purpleCapId);
    await updateOrangeCap(match_datetime, orangeCapId);
    await updatePurpleCap(match_datetime, purpleCapId);
  } catch (error) {
    console.error("Error updating purple and orange caps:", error);
    alert("Error updating caps, please tell Kunal");
    return;
  }
};

function ResultsList() {
  const { matches, refreshMatches, getWinningTeamName, getMatchById } =
    useMatchesContext();
  const [refreshMatchesBool, setRefreshMatchesBool] = useState(false);

  useEffect(() => {
    console.log(
      "refreshMatchesBool was changed from the admin page. Value is now: ",
      refreshMatchesBool
    );
    refreshMatches();
  }, [refreshMatchesBool]);

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    try {
      // Check if dateTimeString is valid
      if (!dateTimeString) {
        console.error("Invalid date string:", dateTimeString);
        return "Date not available";
      }

      // Parse the date string
      const date = new Date(dateTimeString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date object:", date);
        return "Invalid date";
      }

      // Format the date and time
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are 0-indexed
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/25, ${hours}:${minutes} SGT`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date formatting error";
    }
  };

  const submitResult = async (newResult) => {
    console.log("Updating result for match:", newResult.matchId);
    console.log("Winning team:", newResult.winningTeam);
    console.log("Total score:", newResult.totalScore);
    console.log("More or less:", newResult.moreOrLess);
    console.log("Washout:", newResult.washout);
    console.log("Bet amount:", newResult.betAmount);
    await saveMatchResultAndCalculateAllWinnings(
      newResult.matchId,
      newResult.winningTeam,
      newResult.totalScore,
      newResult.moreOrLess,
      newResult.washout,
      newResult.betAmount,
      getMatchById(newResult.matchId).datetime
    );
    setRefreshMatchesBool(!refreshMatchesBool);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Results List</h1>
      {/* Game Cards */}
      <div className="space-y-4">
        {matches.length > 0 ? (
          (() => {
            // console.log(
            //   "Rendering match cards, since match length is more than 0."
            // );
            const allMatchCards = matches.map((match) => {
              // console.log("Rendering card content for match id: ", match.id);
              // If there is a result, supply the result to the ResultsCard
              // Otherwise, supply null
              let result = null;
              if (
                match.outcome_winning_team !== null &&
                match.outcome_total_score !== null &&
                match.outcome_more_or_less !== null
              ) {
                const winningTeamName = getWinningTeamName(match);
                result = {
                  winningTeam: winningTeamName,
                  totalScore: match.outcome_total_score,
                  secondDimension: match.outcome_more_or_less,
                  washout: false,
                };
              }
              if (match.outcome_washout) {
                result = {
                  winningTeam: "WASHOUT",
                  totalScore: 0,
                  secondDimension: null,
                  washout: true,
                };
              }
              console.log("Result:", result);
              return (
                <ResultsCard
                  key={match.id}
                  matchId={match.id}
                  teams={`${match.first_team_name} vs ${match.second_team_name}`}
                  dateTime={formatDateTime(match.datetime)}
                  result={result}
                  submitResult={(newResult) => submitResult(newResult)}
                />
              );
            });
            return allMatchCards;
          })()
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matches scheduled for this week
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsList;
