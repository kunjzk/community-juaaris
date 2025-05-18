import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateTriviaCorrectOption } from "../../../api/trivia";
import {
  updateTriviaBetSuccess,
  updateJuaariWinHistoryForTrivia,
  updateTotalWinningsForTrivia,
} from "../../../api/trivia_bets";
import {
  getJuaarisAndWinnings,
  updateOrangeCap,
  updatePurpleCap,
} from "../../../api/juaaris";

function TriviaResultsCard({ trivia, onRefresh }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmitCorrectOption = async () => {
    if (!selectedOption) {
      alert("Please select a correct option");
      return;
    }

    try {
      // Step 1: Update the correct option in the trivia table
      console.log("TRIVIA POST: Updating correct option in trivia table");
      try {
        await updateTriviaCorrectOption(trivia.id, selectedOption);
      } catch (error) {
        console.error(
          "TRIVIA POST: Failed to update correct option in trivia table:",
          error
        );
        alert(
          "TRIVIA POST: Failed to update correct option in trivia table. Please tell Kunal."
        );
        return;
      }

      // Step 2: Update the success status of all bets for this trivia
      console.log("TRIVIA POST: Updating success status of trivia bets");
      try {
        await updateTriviaBetSuccess(trivia.id, selectedOption);
      } catch (error) {
        console.error(
          "TRIVIA POST: Failed to update success status in trivia bets table:",
          error
        );
        alert(
          "TRIVIA POST: Failed to update success status in trivia bets table. Please tell Kunal."
        );
        return;
      }

      // Step 3: Update Juaari win history
      console.log("TRIVIA POST: Updating Juaari win history");
      try {
        await updateJuaariWinHistoryForTrivia(trivia.id, trivia.bet_amount);
      } catch (error) {
        console.error(
          "TRIVIA POST: Failed to update Juaari win history:",
          error
        );
        alert(
          "TRIVIA POST: Failed to update Juaari win history. Please tell Kunal."
        );
        return;
      }

      // Step 4: Update total winnings for all juaaris
      console.log("TRIVIA POST: Updating total winnings for all juaaris");
      try {
        await updateTotalWinningsForTrivia();
      } catch (error) {
        console.error(
          "TRIVIA POST: Failed to update total winnings for juaaris:",
          error
        );
        alert(
          "TRIVIA POST: Failed to update total winnings for juaaris. Please tell Kunal."
        );
        return;
      }

      // Step 5: Update orange and purple caps
      try {
        const allWinnings = await getJuaarisAndWinnings();
        if (!allWinnings || allWinnings.length === 0) {
          throw new Error("No juaaris found for cap update");
        }
        const purpleCapId = allWinnings[0].id;
        const orangeCapId = allWinnings[allWinnings.length - 1].id;
        const now = new Date().toISOString();
        await updateOrangeCap(now, orangeCapId);
        await updatePurpleCap(now, purpleCapId);
      } catch (error) {
        console.error(
          "TRIVIA POST: Failed to update orange/purple caps:",
          error
        );
        alert(
          "TRIVIA POST: Failed to update orange/purple caps. Please tell Kunal."
        );
        return;
      }

      // Only refresh after all database operations are successful
      onRefresh();
    } catch (error) {
      console.error(
        "TRIVIA POST: Unexpected error in trivia submission process:",
        error
      );
      alert("TRIVIA POST: An unexpected error occurred. Please tell Kunal.");
    }
  };

  const handleViewWinners = () => {
    navigate(`/triviabets/${trivia.id}`);
  };

  // Case 1: No correct option set yet - Show form to submit result
  if (!trivia.correct_option) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{trivia.match_name}</h3>
          <p className="text-gray-700">{trivia.question}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correct Option
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select correct option</option>
              <option value="A">A: {trivia.option_a}</option>
              <option value="B">B: {trivia.option_b}</option>
              <option value="C">C: {trivia.option_c}</option>
              <option value="D">D: {trivia.option_d}</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSubmitCorrectOption}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Correct option has been set - Show result and view winners button
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{trivia.match_name}</h3>
        <p className="text-gray-700">{trivia.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-green-600 font-medium">
            Option {trivia.correct_option} is set as correct
          </div>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleViewWinners}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            View Winners
          </button>
        </div>
      </div>
    </div>
  );
}

export default TriviaResultsCard;
