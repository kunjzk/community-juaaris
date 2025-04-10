import React from "react";
import { RouterProvider } from "react-router-dom";
import { MatchesProvider } from "./contexts/matches";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import GameList from "./components/Home/GameList";
import BetsList from "./components/Bets/BetsList";

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
  return (
    <MatchesProvider>
      <RouterProvider router={router} />
    </MatchesProvider>
  );
}

export default App;
