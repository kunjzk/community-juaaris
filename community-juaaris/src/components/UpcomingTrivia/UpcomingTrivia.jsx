import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTriviaWithMatchTime } from "../../api/trivia";

function TriviaCard({
  triviaId,
  matchName,
  question,
  betCutoffTime,
  cutoffExceeded,
}) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/triviabets/${triviaId}`);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-[#fafdf7] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4 flex-1 w-full mb-3 sm:mb-0">
        <div className="text-center col-span-1">
          <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
            Match
          </div>
          <div className="font-medium text-xs sm:text-sm">{matchName}</div>
        </div>
        <div className="text-center col-span-2 sm:col-span-3">
          <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
            Question
          </div>
          <div className="font-medium text-xs sm:text-sm">{question}</div>
        </div>
        <div className="text-center col-span-1 sm:col-span-1">
          <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">
            Bet Cutoff Time
          </div>
          <div className="font-medium text-xs sm:text-sm">{betCutoffTime}</div>
        </div>
      </div>
      <div className="w-full sm:w-auto sm:ml-4">
        {cutoffExceeded ? (
          <button
            onClick={handleButtonClick}
            className="w-full sm:w-auto bg-[#d9534f] text-white px-3 py-1.5 rounded-md hover:bg-[#c9302c] transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Cutoff exceeded, view all bets
          </button>
        ) : (
          <button
            onClick={handleButtonClick}
            className="w-full sm:w-auto bg-[#4b6c43] text-white px-3 py-1.5 rounded-md hover:bg-[#3d5836] transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Place your bet
          </button>
        )}
      </div>
    </div>
  );
}

function UpcomingTrivia() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [triviaList, setTriviaList] = useState([]);

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    try {
      if (!dateTimeString) {
        console.error("Invalid date string:", dateTimeString);
        return "Date not available";
      }

      const date = new Date(dateTimeString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date object:", date);
        return "Invalid date";
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/25, ${hours}:${minutes} SGT`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date formatting error";
    }
  };

  // Calculate cutoff time (2 hours before match)
  const calculateCutoffTime = (matchDateTime) => {
    try {
      if (!matchDateTime) {
        console.error("Invalid match date string:", matchDateTime);
        return new Date();
      }

      const matchDate = new Date(matchDateTime);
      if (isNaN(matchDate.getTime())) {
        console.error("Invalid match date object:", matchDate);
        return new Date();
      }

      const cutoffDate = new Date(matchDate);
      cutoffDate.setHours(matchDate.getHours() + 2000);

      return cutoffDate;
    } catch (error) {
      console.error("Error calculating cutoff time:", error);
      return new Date();
    }
  };

  // Check if cutoff time has passed
  const isCutoffExceeded = (cutoffTime) => {
    try {
      if (!cutoffTime || isNaN(cutoffTime.getTime())) {
        console.error("Invalid cutoff time:", cutoffTime);
        return false;
      }

      return new Date() > cutoffTime;
    } catch (error) {
      console.error("Error checking cutoff time:", error);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchTrivia() {
      try {
        setLoading(true);
        const triviaData = await getTriviaWithMatchTime();
        if (isMounted) {
          setTriviaList(triviaData);
        }
      } catch (err) {
        console.error("Error fetching trivia:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTrivia();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main>
      <div className="flex flex-col sm:flex-row sm:items-baseline mb-4">
        <h2 className="text-2xl sm:text-4xl font-medium mb-2 sm:mb-0 sm:mr-6">
          Upcoming Trivia
        </h2>
      </div>

      <div className="h-px bg-gray-200 mb-6 sm:mb-8"></div>

      {/* Loading and error states */}
      {loading && <div className="text-center py-8">Loading trivia...</div>}
      {error && (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      )}

      {/* Trivia Cards */}
      <div className="space-y-4">
        {triviaList.length > 0
          ? triviaList.map((trivia) => {
              const cutoffTime = calculateCutoffTime(trivia.match_datetime);
              const cutoffExceeded = isCutoffExceeded(cutoffTime);

              return (
                <TriviaCard
                  key={trivia.id}
                  triviaId={trivia.id}
                  matchName={trivia.match_name}
                  question={trivia.question}
                  betCutoffTime={formatDateTime(cutoffTime)}
                  cutoffExceeded={cutoffExceeded}
                />
              );
            })
          : !loading && (
              <div className="text-center py-8 text-gray-500">
                No trivia available
              </div>
            )}
      </div>
    </main>
  );
}

export default UpcomingTrivia;
