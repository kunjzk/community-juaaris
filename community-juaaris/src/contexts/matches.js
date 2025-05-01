import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { getMatchesByDateRange } from "../api/matches";
import { getSecondDimensionForDate } from "../api/gameplay";

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
  secondDimensionData: { data: {}, isLoading: true },
  getSecondDimensionCutoff: () => null,
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

  // Add second dimension state
  const [secondDimensionData, setSecondDimensionData] = useState(() => {
    const storedData = localStorage.getItem("second-dimension-data");
    return storedData ? JSON.parse(storedData) : { data: {}, isLoading: true };
  });

  // Initialize state with localStorage data
  const [matches, setMatches] = useState(() => {
    const storedMatches = localStorage.getItem("matches-for-the-week");
    return storedMatches ? JSON.parse(storedMatches) : [];
  });

  // Function to save matches to both state and localStorage
  const saveMatchesToContext = (newMatches) => {
    setMatches(newMatches);
    localStorage.setItem("matches-for-the-week", JSON.stringify(newMatches));
  };

  // Function to refresh matches and second dimension data
  const refreshMatches = async () => {
    try {
      const freshMatches = await getMatchesByDateRange(startDate, endDate);
      saveMatchesToContext(freshMatches);

      // Fetch second dimension data for all matches
      const secondDimensionPromises = freshMatches.map(async (match) => {
        const matchDate = new Date(match.datetime);
        const formattedDate = matchDate.toISOString().split("T")[0];
        const records = await getSecondDimensionForDate(formattedDate);
        return {
          date: formattedDate,
          cutoff:
            records && records.length > 0
              ? records[0].second_dimension_cutoff
              : null,
        };
      });

      const secondDimensionResults = await Promise.all(secondDimensionPromises);
      const secondDimensionMap = secondDimensionResults.reduce((acc, curr) => {
        acc[curr.date] = curr.cutoff;
        return acc;
      }, {});

      setSecondDimensionData({
        data: secondDimensionMap,
        isLoading: false,
      });
      localStorage.setItem(
        "second-dimension-data",
        JSON.stringify({
          data: secondDimensionMap,
          isLoading: false,
        })
      );

      return freshMatches;
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

  // Helper function to get second dimension cutoff for a date
  const getSecondDimensionCutoff = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return secondDimensionData.data[formattedDate] || null;
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
    secondDimensionData,
    getSecondDimensionCutoff,
  };

  return React.createElement(MatchesContext.Provider, { value }, children);
}
