import React, { useState, useEffect, useMemo } from "react";
import GameCard from "./GameCard.jsx";
import { useMatchesContext } from "../../contexts/matches";

function GameList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostRecentSaturday, setMostRecentSaturday] = useState(null);
  const [nextSaturday, setNextSaturday] = useState(null);
  const { matches, setStartDate, setEndDate, refreshMatches } =
    useMatchesContext();

  useEffect(() => {
    // Calculate most recent Saturday and next Saturday
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

    // Calculate most recent Saturday
    const mostRecentSaturday = new Date(today);
    // If today is Saturday (6), go back 0 days. Otherwise, go back (currentDay + 1) days
    const daysToGoBack = currentDay === 6 ? 0 : (currentDay + 1) % 7;
    mostRecentSaturday.setDate(today.getDate() - daysToGoBack);
    mostRecentSaturday.setHours(0, 0, 0, 0);

    // Calculate next Saturday
    const nextSaturday = new Date(mostRecentSaturday);
    nextSaturday.setDate(mostRecentSaturday.getDate() + 7);

    setMostRecentSaturday(mostRecentSaturday);
    setNextSaturday(nextSaturday);

    setStartDate(mostRecentSaturday);
    setEndDate(nextSaturday);
  }, []); // Empty dependency array means this only runs once on mount

  // Fetch matches for the current week
  useEffect(() => {
    let isMounted = true;

    async function fetchMatches() {
      try {
        setLoading(true);
        await refreshMatches();
      } catch (err) {
        console.error("Error fetching matches:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMatches();

    // Cleanup function to prevent state updates after component unmounts
    return () => {
      isMounted = false;
    };
  }, [mostRecentSaturday, nextSaturday]);

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    try {
      // Check if dateTimeString is valid
      if (!dateTimeString) {
        console.error("Invalid date string:", dateTimeString);
        return "Date not available";
      }

      // Parse the date string
      const date = new Date(dateTimeString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date object:", date);
        return "Invalid date";
      }

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
          : `${gmtHours12}:${gmtMinutes
              .toString()
              .padStart(2, "0")} ${gmtAmpm}`;

      // Combine all parts
      return `${day} ${month}, ${localTimeStr} (Local) [${gmtTimeStr} GMT]`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date formatting error";
    }
  };

  // Calculate cutoff time (4 hours before match)
  const calculateCutoffTime = (matchDateTime) => {
    try {
      // Check if matchDateTime is valid
      if (!matchDateTime) {
        console.error("Invalid match date string:", matchDateTime);
        return new Date(); // Return current date as fallback
      }

      // Parse the date string
      const matchDate = new Date(matchDateTime);

      // Check if date is valid
      if (isNaN(matchDate.getTime())) {
        console.error("Invalid match date object:", matchDate);
        return new Date(); // Return current date as fallback
      }

      // Calculate cutoff time
      const cutoffDate = new Date(matchDate);
      cutoffDate.setHours(matchDate.getHours() - 2);

      return cutoffDate;
    } catch (error) {
      console.error("Error calculating cutoff time:", error);
      return new Date(); // Return current date as fallback
    }
  };

  // Check if cutoff time has passed
  const isCutoffExceeded = (cutoffTime) => {
    try {
      // Check if cutoffTime is valid
      if (!cutoffTime || isNaN(cutoffTime.getTime())) {
        console.error("Invalid cutoff time:", cutoffTime);
        return false; // Default to not exceeded
      }

      return new Date() > cutoffTime;
    } catch (error) {
      console.error("Error checking cutoff time:", error);
      return false; // Default to not exceeded
    }
  };

  return (
    <main>
      <div className="flex flex-col sm:flex-row sm:items-baseline mb-4">
        <h2 className="text-2xl sm:text-4xl font-medium mb-2 sm:mb-0 sm:mr-6">
          This week's games
        </h2>
        {mostRecentSaturday && nextSaturday && (
          <span className="text-sm sm:text-base text-gray-700">
            {mostRecentSaturday
              .toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "numeric",
              })
              .replace(",", "")}{" "}
            -{" "}
            {nextSaturday
              .toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "numeric",
              })
              .replace(",", "")}
          </span>
        )}
      </div>

      <div className="h-px bg-gray-200 mb-6 sm:mb-8"></div>

      {/* Loading and error states */}
      {loading && <div className="text-center py-8">Loading matches...</div>}
      {error && (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      )}

      {/* Game Cards */}
      <div className="space-y-4">
        {matches.length > 0
          ? matches.map((match) => {
              const cutoffTime = calculateCutoffTime(match.datetime);
              const cutoffExceeded = isCutoffExceeded(cutoffTime);

              return (
                <GameCard
                  key={match.id}
                  matchId={match.id}
                  teams={`${match.first_team_name} vs ${match.second_team_name}`}
                  venue={match.venue_name}
                  dateTime={formatDateTime(match.datetime)}
                  betCutoffTime={formatDateTime(cutoffTime)}
                  cutoffExceeded={cutoffExceeded}
                  outcomeWashout={match.outcome_washout}
                  outcomeMoreOrLess={match.outcome_more_or_less}
                  outcomeTotalScore={match.outcome_total_score}
                  outcomeWinningTeam={match.outcome_winning_team}
                />
              );
            })
          : !loading && (
              <div className="text-center py-8 text-gray-500">
                No matches scheduled for this week
              </div>
            )}
      </div>
    </main>
  );
}

export default GameList;
