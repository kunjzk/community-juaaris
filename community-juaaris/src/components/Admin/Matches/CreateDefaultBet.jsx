import React, { useState, useEffect } from "react";
import { getAllJuaaris } from "../../../api/juaaris";
import { useMatchesContext } from "../../../contexts/matches";
import {
  getLargestBetId,
  createDefaultBet,
  decrementDefaultsRemaining,
} from "../../../api/bets";

function CreateDefaultBet() {
  const { matches } = useMatchesContext();
  const [juaaris, setJuaaris] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedJuaari, setSelectedJuaari] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedMatchData, setSelectedMatchData] = useState(null);

  useEffect(() => {
    const fetchJuaaris = async () => {
      try {
        const juaarisData = await getAllJuaaris();
        setJuaaris(juaarisData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      }
    };
    fetchJuaaris();
  }, []);

  // Update selectedMatchData whenever selectedMatch changes
  useEffect(() => {
    console.log("selectedMatch changed:", selectedMatch, typeof selectedMatch);
    console.log("matches:", matches);

    if (selectedMatch) {
      // Convert selectedMatch to number since select values are strings
      const matchId = parseInt(selectedMatch);
      const match = matches.find((m) => m.id === matchId);
      console.log("Found match:", match);
      setSelectedMatchData(match);
    } else {
      setSelectedMatchData(null);
    }
  }, [selectedMatch, matches]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Get the next bet ID
      const [{ max }] = await getLargestBetId();
      const newBetId = max ? max + 1 : 1;

      // Get details for success message
      const selectedJuaariData = juaaris.find(
        (j) => j.id === parseInt(selectedJuaari)
      );
      const selectedTeamName =
        selectedTeam === selectedMatchData.first_team_id.toString()
          ? selectedMatchData.first_team_name
          : selectedMatchData.second_team_name;

      // Create the default bet
      await createDefaultBet(
        newBetId,
        selectedMatch,
        selectedJuaari,
        selectedTeam,
        selectedOption
      );

      // Decrement defaults_remaining for the juaari
      await decrementDefaultsRemaining(selectedJuaari);

      const successMessage = (
        <div>
          <p className="font-semibold mb-2">
            Default bet created successfully!
          </p>
          <div className="text-sm space-y-1">
            <p>
              <strong>Match:</strong> {selectedMatchData.first_team_name} vs{" "}
              {selectedMatchData.second_team_name}
            </p>
            <p>
              <strong>Player:</strong> {selectedJuaariData.display_name}
            </p>
            <p>
              <strong>Predicted Winner:</strong> {selectedTeamName}
            </p>
            <p>
              <strong>More/Less:</strong> {selectedOption}
            </p>
          </div>
          <a
            href={`/preds/${selectedMatch}`}
            className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            View Bets for This Match
          </a>
        </div>
      );

      setSuccess(successMessage);

      // Reset form
      setSelectedMatch("");
      setSelectedJuaari("");
      setSelectedTeam("");
      setSelectedOption("");
    } catch (err) {
      setError("Failed to create default bet. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-serif mb-6">Create Default Bet</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Match
          </label>
          <select
            value={selectedMatch}
            onChange={(e) => setSelectedMatch(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a match</option>
            {matches.map((match) => (
              <option key={match.id} value={match.id}>
                {match.first_team_name} vs {match.second_team_name} (
                {new Date(match.datetime).toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Player
          </label>
          <select
            value={selectedJuaari}
            onChange={(e) => setSelectedJuaari(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a player</option>
            {juaaris.map((juaari) => (
              <option key={juaari.id} value={juaari.id}>
                {juaari.display_name} (Defaults remaining:{" "}
                {juaari.defaults_remaining})
              </option>
            ))}
          </select>
        </div>

        {selectedMatchData && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Winning Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a team</option>
              <option value={selectedMatchData.first_team_id}>
                {selectedMatchData.first_team_name}
              </option>
              <option value={selectedMatchData.second_team_id}>
                {selectedMatchData.second_team_name}
              </option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select More/Less
          </label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select an option</option>
            <option value="MORE">MORE</option>
            <option value="LESS">LESS</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2e7d32] hover:bg-[#1b5e20]"
          }`}
        >
          {loading ? "Creating..." : "Create Default Bet"}
        </button>
      </form>
    </div>
  );
}

export default CreateDefaultBet;
