import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { getMatchesByDateRange, getMatchByIdApi } from "../api/matches";
import { getSecondDimensionTillDate } from "../api/gameplay";
// The goal is to include the second dimension cutoff for each match in the context
// so that we can use it in the ResultsCard component

// To do this, we will first fetch all second dimension data that falls between startDate and endDate
// Then, we will map this data to each match in the matches array
// We don't need to store the second dimsion data in the context, unless the user adds a new second dimension value
// In that case, we will trigger a refresh of the second dimension data, as well as the matches.

// So overall the flow goes like this:
// 1. We set the start and end dates
// 2. We fetch the matches for the week
// 3. We fetch the second dimension data for the week
// 4. We map the second dimension data to the matches
// 5. We provide the matches (containing second dimension data) to the context
// 6. We provide a convenience function to refresh the matches and second dimension data from any page.

// Create the context with default values
const MatchesContext = createContext({
  matches: [],
  saveMatchesToContext: () => {},
  getMatchById: () => null,
  getPreviousMatch: () => null,
  getNextMatch: () => null,
  refreshMatches: () => {},
  startDate: null,
  endDate: null,
  setStartDate: () => {},
  setEndDate: () => {},
  getWinningTeamName: () => null,
  getNextGameBetAmount: () => null,
});

// Custom hook to use the context
export function useMatchesContext() {
  return useContext(MatchesContext);
}

// Provider component
export function MatchesProvider({ children }) {
  const [startDate, setStartDateState] = useState(() => {
    const storedStartDate = localStorage.getItem("startDate");
    return storedStartDate ? new Date(storedStartDate) : null;
  });
  const [endDate, setEndDateState] = useState(() => {
    const storedEndDate = localStorage.getItem("endDate");
    return storedEndDate ? new Date(storedEndDate) : null;
  });

  // Initialize state with localStorage data
  const [matches, setMatches] = useState(() => {
    const storedMatches = localStorage.getItem("matches-for-the-week");
    return storedMatches ? JSON.parse(storedMatches) : [];
  });

  // Function to save matches to both state and localStorage
  const saveMatchesToContext = (newMatches) => {
    // Delete the old matches from localStorage
    localStorage.removeItem("matches-for-the-week");
    // Save the new matches to localStorage
    setMatches(newMatches);
    localStorage.setItem("matches-for-the-week", JSON.stringify(newMatches));
  };

  const getSecondDimensionDataForGames = async (endDate) => {
    const secondDimensionData = await getSecondDimensionTillDate(endDate);
    return secondDimensionData;
  };

  // Map the second dimension data to the matches
  // This is accomplished by finding the second dimension data whose date is closest to the match date, but not after the match date
  const mapSecondDimensionDataToMatches = (matches, secondDimensionData) => {
    return matches.map((match) => {
      const matchDate = new Date(match.datetime);
      // Find the second dimension data whose date is closest to the match date, but not after the match date
      let minimumDifference = Infinity;
      let secondDimensionCutoff = null;
      for (const data of secondDimensionData) {
        if (data.effective_from > matchDate) {
          continue;
        }
        const dataDate = new Date(data.effective_from);
        const difference = Math.abs(dataDate.getTime() - matchDate.getTime());
        if (difference < minimumDifference) {
          minimumDifference = difference;
          secondDimensionCutoff = data.second_dimension_cutoff;
        }
      }
      return {
        ...match,
        second_dimension_cutoff: secondDimensionCutoff,
      };
    });
  };

  // Function to refresh matches and second dimension data
  const refreshMatches = async () => {
    try {
      console.log("From context: refreshMatches called, refreshing now.");
      const freshMatches = await getMatchesByDateRange(startDate, endDate);
      const secondDimensionData = await getSecondDimensionDataForGames(endDate);
      console.log("Second dimension data:", secondDimensionData);
      const matchesWithSecondDimensionData = mapSecondDimensionDataToMatches(
        freshMatches,
        secondDimensionData
      );
      saveMatchesToContext(matchesWithSecondDimensionData);
      return matchesWithSecondDimensionData;
    } catch (error) {
      console.error("Error refreshing matches:", error);
      throw error;
    }
  };

  // Wrapper function to set start date and update localStorage
  const setStartDate = (date) => {
    setStartDateState(date);
    localStorage.setItem("startDate", date.toISOString());
  };

  // Wrapper function to set end date and update localStorage
  const setEndDate = (date) => {
    setEndDateState(date);
    localStorage.setItem("endDate", date.toISOString());
  };

  // Helper function to get a match by ID
  const getMatchById = (id) => {
    let m = matches.find((match) => match.id === id);
    return m;
  };

  // Helper function to get the previous match
  const getPreviousMatch = (currentMatchId) => {
    const currentIndex = matches.findIndex(
      (match) => match.id === currentMatchId
    );
    if (currentIndex <= 0) return null;
    return matches[currentIndex - 1];
  };

  // Helper function to get the next match
  const getNextMatch = (currentMatchId) => {
    const currentIndex = matches.findIndex(
      (match) => match.id === currentMatchId
    );
    if (currentIndex === -1 || currentIndex >= matches.length - 1) return null;
    return matches[currentIndex + 1];
  };

  const getWinningTeamName = (match) => {
    const winningTeamId = match.outcome_winning_team;
    const totalScore = match.outcome_total_score;
    const moreOrLess = match.outcome_more_or_less;
    if (
      winningTeamId === null ||
      totalScore === null ||
      moreOrLess === null ||
      match.washout === true
    )
      return null;
    const winningTeamName =
      match.first_team_name === winningTeamId
        ? match.first_team_name
        : match.second_team_name;
    return winningTeamName;
  };

  const getNextGameBetAmount = async (matchId) => {
    const nextMatchId = matchId + 1;
    if (nextMatchId > 74) {
      return 0;
    }
    let nextMatch = getMatchById(nextMatchId);
    if (!nextMatch) {
      nextMatch = await getMatchByIdApi(nextMatchId);
    }
    return nextMatch.bet_amount;
  };

  // Value object that will be provided to consumers
  const value = {
    matches,
    saveMatchesToContext,
    getMatchById,
    getPreviousMatch,
    getNextMatch,
    refreshMatches,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    getWinningTeamName,
    getNextGameBetAmount,
  };

  return React.createElement(MatchesContext.Provider, { value }, children);
}
