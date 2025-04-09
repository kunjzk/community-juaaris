import { createContext, useContext, useState } from "react";

// Create the context with default values
export const MatchesContext = createContext({
  matches: [],
  saveMatchesToContext: (matches) => {},
  getMatchIndex: (matchId) => -1,
  getMatchById: (matchId) => null,
  getNextMatch: (matchId) => null,
  getPreviousMatch: (matchId) => null,
});

// Custom hook to use the matches context
export const useMatchesContext = () => {
  return useContext(MatchesContext);
};

export const MatchesProvider = MatchesContext.Provider;
