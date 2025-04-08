import { createContext, useContext } from "react";

const MatchesContext = createContext({
  matches: [],
  saveMatchesToContext: (matches) => {
    matches = matches;
  },
  getMatchIndex: (matchId) => {
    return matches.findIndex((match) => match.id === matchId);
  },
  getMatchById: (matchId) => {
    return matches.find((match) => match.id === matchId);
  },
  getNextMatch: (matchId) => {
    const index = getMatchIndex(matchId);
    if (index === matches.length - 1) {
      return null;
    }
    return matches[index + 1];
  },
  getPreviousMatch: (matchId) => {
    const index = getMatchIndex(matchId);
    if (index === 0) {
      return null;
    }
    return matches[index - 1];
  },
});
export const useMatches = () => {
  return useContext(MatchesContext);
};

export const MatchesProvider = MatchesContext.Provider;
