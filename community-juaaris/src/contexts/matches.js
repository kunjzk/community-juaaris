import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

// Create the context with default values
const MatchesContext = createContext({
  matches: [],
  saveMatchesToContext: () => {},
  getMatchById: () => null,
  getPreviousMatch: () => null,
  getNextMatch: () => null,
});

// Custom hook to use the context
export function useMatchesContext() {
  return useContext(MatchesContext);
}

// Provider component
export function MatchesProvider({ children }) {
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

  // Helper function to get a match by ID
  const getMatchById = (id) => {
    return matches.find((match) => match.id === id);
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
  };

  return React.createElement(MatchesContext.Provider, { value }, children);
}
