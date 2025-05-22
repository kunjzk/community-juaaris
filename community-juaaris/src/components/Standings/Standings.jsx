import { useState, useEffect } from "react";
import { getJuaarisAndWinnings } from "../../api/juaaris";

export default function StandingsPage() {
  const [activeTab, setActiveTab] = useState("main"); // "main" or "trivia"
  const [standings, setStandings] = useState([]);
  const [mainGamePartyFund, setMainGamePartyFund] = useState(0);
  const [triviaPartyFund, setTriviaPartyFund] = useState(0);

  useEffect(() => {
    // Fetch standings data
    getJuaarisAndWinnings().then((data) => {
      const formattedStandings = data.map((player) => ({
        id: player.id,
        display_name: player.display_name,
        total_winnings: Number(player.winnings) || 0,
        match_winnings: Number(player.match_winnings) || 0,
        trivia_winnings: Number(player.trivia_winnings) || 0,
      }));

      // Sort standings by match_winnings for main game tab
      const mainGameStandings = [...formattedStandings]
        .sort((a, b) => b.match_winnings - a.match_winnings)
        .map((player, index) => ({ ...player, position: index + 1 }));

      // Sort standings by trivia_winnings for trivia tab
      const triviaStandings = [...formattedStandings]
        .sort((a, b) => b.trivia_winnings - a.trivia_winnings)
        .map((player, index) => ({ ...player, position: index + 1 }));

      setStandings({
        main: mainGameStandings,
        trivia: triviaStandings,
      });

      // Calculate main game party fund
      const mainGameNegativeWinnings = formattedStandings
        .filter((player) => player.match_winnings < 0)
        .reduce((sum, player) => sum + player.match_winnings, 0);

      // Calculate trivia party fund
      const triviaNegativeWinnings = formattedStandings
        .filter((player) => player.trivia_winnings < 0)
        .reduce((sum, player) => sum + player.trivia_winnings, 0);

      setMainGamePartyFund(Math.abs(mainGameNegativeWinnings));
      setTriviaPartyFund(Math.abs(triviaNegativeWinnings));
    });
  }, []);

  // Tab switching handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Get current standings based on active tab
  const currentStandings = standings[activeTab] || [];

  return (
    <>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-4 px-6 text-lg font-medium ${
            activeTab === "main"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("main")}
        >
          Main Game
        </button>
        <button
          className={`py-4 px-6 text-lg font-medium ${
            activeTab === "trivia"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("trivia")}
        >
          Trivia
        </button>
      </div>

      {/* Main Game Standings */}
      {activeTab === "main" && (
        <>
          <h2 className="text-4xl font-serif mb-2">Main Game Standings</h2>
          <div className="text-lg text-gray-600 mb-8">
            Party Fund: ${mainGamePartyFund.toFixed(2)}
          </div>

          {/* Table Header - Styled like cards */}
          <div className="bg-gray-100 rounded-t-lg border border-gray-200 grid grid-cols-12 font-medium text-gray-700">
            <div className="px-3 py-3 border-r border-gray-200 text-center col-span-2">
              Position
            </div>
            <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
              Juaari
            </div>
            <div className="px-6 py-3 text-center col-span-4">Winnings</div>
          </div>

          {/* Table Rows - Styled like cards */}
          <div className="rounded-b-lg overflow-hidden border-x border-b border-gray-200 bg-white">
            {currentStandings.map((player, index) => (
              <div
                key={player.id}
                className={`grid grid-cols-12 border-t border-gray-200 ${
                  index === 0
                    ? "bg-purple-100"
                    : index === currentStandings.length - 1
                    ? "bg-orange-100"
                    : ""
                }`}
              >
                <div className="px-3 py-3 border-r border-gray-200 text-center col-span-2">
                  {player.position}
                </div>
                <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
                  {player.display_name}
                </div>
                <div className="px-6 py-3 text-center col-span-4">
                  {player.match_winnings}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Trivia Standings */}
      {activeTab === "trivia" && (
        <>
          <h2 className="text-4xl font-serif mb-2">Trivia Standings</h2>
          <div className="text-lg text-gray-600 mb-8">
            Party Fund: ${triviaPartyFund.toFixed(2)}
          </div>

          {/* Table Header - Styled like cards */}
          <div className="bg-gray-100 rounded-t-lg border border-gray-200 grid grid-cols-12 font-medium text-gray-700">
            <div className="px-3 py-3 border-r border-gray-200 text-center col-span-2">
              Position
            </div>
            <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
              Juaari
            </div>
            <div className="px-6 py-3 text-center col-span-4">Winnings</div>
          </div>

          {/* Table Rows - Styled like cards */}
          <div className="rounded-b-lg overflow-hidden border-x border-b border-gray-200 bg-white">
            {currentStandings.map((player, index) => (
              <div
                key={player.id}
                className={`grid grid-cols-12 border-t border-gray-200 ${
                  index === 0
                    ? "bg-purple-100"
                    : index === currentStandings.length - 1
                    ? "bg-orange-100"
                    : ""
                }`}
              >
                <div className="px-3 py-3 border-r border-gray-200 text-center col-span-2">
                  {player.position}
                </div>
                <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
                  {player.display_name}
                </div>
                <div className="px-6 py-3 text-center col-span-4">
                  {activeTab === "main"
                    ? player.match_winnings
                    : player.trivia_winnings}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
