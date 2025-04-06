import React from "react";

function BetCard({ bet }) {
  // Format date and time for display
  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date string:", dateString);
        return "Invalid date";
      }
      return (
        date.toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) + " SGT"
      );
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Get status color based on bet status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "won":
        return "bg-green-100 text-green-800";
      case "lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text based on bet status
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "won":
        return "Won";
      case "lost":
        return "Lost";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-black">{bet.bettor_name}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              bet.status
            )}`}
          >
            {getStatusText(bet.status)}
          </span>
        </div>

        <div className="text-sm text-black">₹{bet.amount.toFixed(2)}</div>

        <div className="text-sm text-black">
          {bet.predicted_team_name} ({bet.predicted_more_or_less})
        </div>

        <div className="text-sm text-black">
          {formatDateTime(bet.created_at)}
        </div>
      </div>
    </div>
  );
}

export default BetCard;
