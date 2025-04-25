import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { getMatchesByDateRange } from "../api/matches";

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
    setMatches(newMatches);
    localStorage.setItem("matches-for-the-week", JSON.stringify(newMatches));
  };

  // Function to refresh matches from the server
  const refreshMatches = async () => {
    try {
      const freshMatches = await getMatchesByDateRange(startDate, endDate);
      saveMatchesToContext(freshMatches);
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
  };

  return React.createElement(MatchesContext.Provider, { value }, children);
}
