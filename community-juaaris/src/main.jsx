import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
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

const matches = [];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MatchesProvider value={{ matches }}>
      <RouterProvider router={router} />
    </MatchesProvider>
  </StrictMode>
);
