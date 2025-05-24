import { React, useState, useEffect } from "react";
import { useMatchesContext } from "../../../contexts/matches";
import {
  getAllTeams,
  getAllVenues,
  getUpcomingMatches,
  updateMatch,
  deleteMatch,
} from "../../../api/matches";

function EditMatches() {
  const { refreshMatches } = useMatchesContext();
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  // Edit form state
  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);
  const [firstTeamId, setFirstTeamId] = useState("");
  const [secondTeamId, setSecondTeamId] = useState("");
  const [venueId, setVenueId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [betAmount, setBetAmount] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [matchesData, teamsData, venuesData] = await Promise.all([
          getUpcomingMatches(), // Only get upcoming matches
          getAllTeams(),
          getAllVenues(),
        ]);

        setMatches(matchesData);
        setTeams(teamsData);
        setVenues(venuesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshData]);

  // Handle selecting a match to edit
  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    setFirstTeamId(match.first_team_id);
    setSecondTeamId(match.second_team_id);
    setVenueId(match.venue_id);

    // Convert the UTC datetime from the database to SGT for the form
    // Add 8 hours to convert from UTC to SGT
    const utcDate = new Date(match.datetime);
    const sgtDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

    // Format for datetime-local input
    sgtDate.setMinutes(sgtDate.getMinutes() - sgtDate.getTimezoneOffset());
    setDateTime(sgtDate.toISOString().slice(0, 16));

    setBetAmount(match.bet_amount);
    setIsEditing(true);
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setSelectedMatch(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  // Handle updating the match
  const handleUpdateMatch = async () => {
    // Validation
    if (firstTeamId === secondTeamId) {
      alert("The first and second teams cannot be the same");
      return;
    }

    if (!dateTime) {
      alert("Please select a date and time");
      return;
    }

    // Check if date is in the future
    const selectedDate = new Date(dateTime);
    const now = new Date();
    if (selectedDate <= now) {
      alert("The date and time must be in the future");
      return;
    }

    if (!betAmount || betAmount <= 0) {
      alert("Please enter a valid bet amount");
      return;
    }

    try {
      await updateMatch(
        selectedMatch.id,
        firstTeamId,
        secondTeamId,
        venueId,
        dateTime,
        betAmount
      );

      alert("Match updated successfully!");

      // Reset and refresh
      setSelectedMatch(null);
      setIsEditing(false);
      setRefreshData(!refreshData);
      refreshMatches();
    } catch (error) {
      console.error("Error updating match:", error);
      alert("Failed to update match. Please try again.");
    }
  };

  // Handle deleting the match
  const handleDeleteMatch = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    try {
      await deleteMatch(selectedMatch.id);

      alert("Match deleted successfully!");

      // Reset and refresh
      setSelectedMatch(null);
      setIsEditing(false);
      setIsDeleting(false);
      setRefreshData(!refreshData);
      refreshMatches();
    } catch (error) {
      console.error("Error deleting match:", error);
      alert(error.message || "Failed to delete match. Please try again.");
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
        <h3 className="text-3xl font-serif mb-8">Edit Upcoming Matches</h3>

        {isEditing ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-xl font-semibold">
                Editing Match #{selectedMatch.id}
              </h4>
              <button
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>

            <div className="space-y-4">
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
                  Enter time in Singapore Time (SGT/UTC+8). Must be a future
                  date.
                </p>
              </div>

              {/* Bet Amount Input */}
              <div className="mb-4">
                <label className="block text-base sm:text-xl mb-2">
                  Bet Amount
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

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <button
                  className="bg-[#27ae60] hover:bg-[#2ecc71] text-white py-2 rounded-md font-medium"
                  onClick={handleUpdateMatch}
                >
                  Update Match
                </button>
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className={`${
                    isDeleting
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-100 hover:bg-red-200 text-red-800"
                  } py-2 rounded-md font-medium`}
                  onClick={handleDeleteMatch}
                >
                  {isDeleting ? "Confirm Delete" : "Delete Match"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-700 mb-6">
              Select an upcoming match below to edit its details or delete it.
              <br />
              <span className="text-amber-600 font-medium">
                Note: You can only edit matches that have not started yet.
              </span>
            </p>
          </div>
        )}

        {/* Matches List */}
        <div className="mt-8">
          <h3 className="text-2xl font-serif mb-6">Upcoming Matches</h3>

          {loading ? (
            <div className="text-center py-8">Loading matches...</div>
          ) : matches.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              No upcoming matches found
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 flex-1 w-full mb-4 sm:mb-0">
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
                      <div className="text-xs text-gray-500 mb-1">
                        Date/Time
                      </div>
                      <div className="font-medium text-sm">
                        {formatDate(match.datetime)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        Bet Amount
                      </div>
                      <div className="font-medium text-sm">
                        {match.bet_amount}
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto sm:ml-4">
                    <button
                      className="w-full sm:w-auto bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                      onClick={() => handleSelectMatch(match)}
                    >
                      Edit Match
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditMatches;
