import { React, useState, useEffect } from "react";
import { useMatchesContext } from "../../../contexts/matches";
import {
  getAllMatches,
  checkMatchIdExists,
  createMatch,
  getAllTeams,
  getAllVenues,
} from "../../../api/matches";

function AddMatches() {
  const { refreshMatches } = useMatchesContext();
  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  // Form state
  const [matchId, setMatchId] = useState("");
  const [firstTeamId, setFirstTeamId] = useState("");
  const [secondTeamId, setSecondTeamId] = useState("");
  const [venueId, setVenueId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [betAmount, setBetAmount] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teams, venues, and recent matches
        const [teamsData, venuesData, recentMatchesData] = await Promise.all([
          getAllTeams(),
          getAllVenues(),
          getAllMatches(),
        ]);

        setTeams(teamsData);
        setVenues(venuesData);
        // Only show the most recent 10 matches
        setRecentMatches(recentMatchesData.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load required data. Please try again.");
      }
    };

    fetchData();
  }, [refreshData]);

  const handleCreateMatch = async () => {
    // Validation
    if (!matchId || matchId <= 0) {
      alert("Please enter a valid match number");
      return;
    }

    if (!firstTeamId) {
      alert("Please select the first team");
      return;
    }

    if (!secondTeamId) {
      alert("Please select the second team");
      return;
    }

    if (firstTeamId === secondTeamId) {
      alert("The first and second teams cannot be the same");
      return;
    }

    if (!venueId) {
      alert("Please select a venue");
      return;
    }

    if (!dateTime) {
      alert("Please select a date and time");
      return;
    }

    if (!betAmount || betAmount < 0) {
      alert("Please enter a valid bet amount");
      return;
    }

    try {
      // Check if match ID already exists
      const matchExists = await checkMatchIdExists(matchId);

      if (matchExists) {
        alert(
          "A match with this number already exists. Please use a new match number or delete the using the edit matches page."
        );
        return;
      }

      // Create the match
      await createMatch(
        matchId,
        firstTeamId,
        secondTeamId,
        venueId,
        dateTime,
        betAmount
      );

      alert("Match created successfully!");

      // Reset form
      setMatchId("");
      setFirstTeamId("");
      setSecondTeamId("");
      setVenueId("");
      setDateTime("");
      setBetAmount(10);

      // Refresh data
      setRefreshData(!refreshData);
      refreshMatches();
    } catch (error) {
      console.error("Error creating match:", error);
      alert("Failed to create match. Please try again.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    // Database has UTC time, but we display in user's local timezone
    const date = new Date(dateString);

    // Format the day and month
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });

    // Format local time in 12-hour format with AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    const localTimeStr =
      minutes === 0
        ? `${hours12} ${ampm}`
        : `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;

    // Format GMT time in 12-hour format
    const gmtDate = new Date(date.toISOString());
    const gmtHours = gmtDate.getUTCHours();
    const gmtMinutes = gmtDate.getUTCMinutes();
    const gmtAmpm = gmtHours >= 12 ? "PM" : "AM";
    const gmtHours12 = gmtHours % 12 || 12;
    const gmtTimeStr =
      gmtMinutes === 0
        ? `${gmtHours12} ${gmtAmpm}`
        : `${gmtHours12}:${gmtMinutes.toString().padStart(2, "0")} ${gmtAmpm}`;

    // Combine all parts
    // return `${day} ${month}, ${localTimeStr} (Local) [${gmtTimeStr} GMT]`;
    return `${day} ${month}, ${localTimeStr} (Local)`;
  };

  return (
    <>
      <div>
        <h3 className="text-3xl font-serif mb-8">Add New Match</h3>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {/* Match ID Input */}
            <div className="mb-4">
              <label className="block text-base sm:text-xl mb-2">
                Match Number
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={matchId}
                onChange={(e) => setMatchId(Number(e.target.value))}
                min="1"
                placeholder="Enter match number"
              />
            </div>

            {/* Teams Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base sm:text-xl mb-2">
                  First Team
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={firstTeamId}
                  onChange={(e) => setFirstTeamId(Number(e.target.value))}
                >
                  <option value="">Select first team</option>
                  {teams.map((team) => (
                    <option key={`first-${team.id}`} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-base sm:text-xl mb-2">
                  Second Team
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={secondTeamId}
                  onChange={(e) => setSecondTeamId(Number(e.target.value))}
                >
                  <option value="">Select second team</option>
                  {teams.map((team) => (
                    <option key={`second-${team.id}`} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Venue Selection */}
            <div className="mb-4">
              <label className="block text-base sm:text-xl mb-2">Venue</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={venueId}
                onChange={(e) => setVenueId(Number(e.target.value))}
              >
                <option value="">Select a venue</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time Input */}
            <div className="mb-4">
              <label className="block text-base sm:text-xl mb-2">
                Date and Time (SGT)
              </label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter time in Singapore Time (SGT/UTC+8).
              </p>
            </div>

            {/* Bet Amount Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base sm:text-xl mb-2">
                  Points
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  min="1"
                  step="1"
                />
              </div>
              <button
                className="w-full bg-[#27ae60] hover:bg-[#2ecc71] text-white py-2 rounded-md font-medium mt-6"
                onClick={handleCreateMatch}
              >
                Add Match
              </button>
            </div>
          </div>
        </div>

        {/* Recent Matches Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-serif mb-8">Recent Matches</h3>

          <div className="space-y-4">
            {recentMatches.map((match) => (
              <div
                key={match.id}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">ID</div>
                    <div className="font-medium text-sm">{match.id}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Teams</div>
                    <div className="font-medium text-sm">
                      {match.first_team_name} vs {match.second_team_name}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Venue</div>
                    <div className="font-medium text-sm">
                      {match.venue_name}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Date/Time</div>
                    <div className="font-medium text-sm">
                      {formatDate(match.datetime)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Points</div>
                    <div className="font-medium text-sm">
                      {match.bet_amount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMatches;
