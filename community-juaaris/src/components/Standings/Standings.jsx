import { useState, useEffect } from "react";
import { getJuaarisAndWinnings } from "../../api/juaaris";

export default function StandingsPage() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    getJuaarisAndWinnings().then((data) => {
      const standings = data.map((player, index) => ({
        position: index + 1,
        display_name: player.display_name,
        winnings: player.winnings,
      }));
      setStandings(standings);
    });
  }, []);

  return (
    <>
      <h2 className="text-4xl font-serif mb-8">Standings</h2>

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
        {standings.map((player, index) => (
          <div
            key={player.position}
            className={`grid grid-cols-12 border-t border-gray-200 ${
              index === 0
                ? "bg-purple-100"
                : index === standings.length - 1
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
              {player.winnings}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
