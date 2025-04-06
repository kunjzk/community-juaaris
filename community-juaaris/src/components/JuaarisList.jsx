import { useState, useEffect } from "react";
import { getJuaaris, getJuaariWinHistory } from "../api/juaaris";

export default function JuaarisList() {
  const [juaaris, setJuaaris] = useState([]);
  const [selectedJuaari, setSelectedJuaari] = useState(null);
  const [winHistory, setWinHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJuaaris() {
      try {
        const data = await getJuaaris();
        setJuaaris(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJuaaris();
  }, []);

  useEffect(() => {
    async function fetchWinHistory() {
      if (!selectedJuaari) return;

      try {
        const data = await getJuaariWinHistory(selectedJuaari.id);
        setWinHistory(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchWinHistory();
  }, [selectedJuaari]);

  if (loading) return <div>Loading juaaris...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Juaaris</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Players</h3>
          <div className="grid gap-2">
            {juaaris.map((juaari) => (
              <button
                key={juaari.id}
                onClick={() => setSelectedJuaari(juaari)}
                className={`p-3 text-left border rounded-lg transition-colors ${
                  selectedJuaari?.id === juaari.id
                    ? "bg-blue-50 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="font-medium">{juaari.display_name}</div>
                <div className="text-sm text-gray-600">
                  Winnings: {juaari.winnings.toFixed(2)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedJuaari && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Win History - {selectedJuaari.display_name}
            </h3>
            <div className="space-y-2">
              {winHistory.map((record) => (
                <div
                  key={`${record.juaari_id}-${record.date}`}
                  className="p-3 border rounded-lg"
                >
                  <div className="font-medium">
                    {record.first_team_name} vs {record.second_team_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    Date: {new Date(record.match_datetime).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    <span
                      className={
                        record.delta_winnings_this_game >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {record.delta_winnings_this_game >= 0 ? "+" : ""}
                      {record.delta_winnings_this_game.toFixed(2)}
                    </span>{" "}
                    (Total: {record.accumulated_winnings.toFixed(2)})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
