import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import GameList from "./components/Home/GameList";
import BetsList from "./components/Bets/BetsList";
import { MatchesProvider } from "./contexts/matches";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <GameList />,
      },
      {
        path: "/bets/:matchId",
        element: <BetsList />,
      },
      {
        path: "/bets",
        element: <BetsList />,
      },
    ],
  },
]);

function App() {
  // State to hold the matches data
  const [matches, setMatches] = useState([]);

  // Function to update matches
  const saveMatchesToContext = (newMatches) => {
    setMatches(newMatches);
    console.log(
      `SAVED ${newMatches.length} matches to context. Matches:`,
      newMatches
    );
  };

  // Helper functions that use the current matches state
  const getMatchIndex = (matchId) => {
    return matches.findIndex((match) => match.id === matchId);
  };

  const getMatchById = (matchId) => {
    return matches.find((match) => match.id === matchId);
  };

  const getNextMatch = (matchId) => {
    const index = getMatchIndex(matchId);
    if (index === -1 || index === matches.length - 1) {
      return null;
    }
    return matches[index + 1];
  };

  const getPreviousMatch = (matchId) => {
    const index = getMatchIndex(matchId);
    if (index === -1 || index === 0) {
      return null;
    }
    return matches[index - 1];
  };

  return (
    <MatchesProvider
      value={{
        matches,
        saveMatchesToContext,
        getMatchIndex,
        getMatchById,
        getNextMatch,
        getPreviousMatch,
      }}
    >
      <RouterProvider router={router} />
    </MatchesProvider>
  );
}

export default App;
