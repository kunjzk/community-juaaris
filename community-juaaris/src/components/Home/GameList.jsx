import React from "react";
import GameCard from "./GameCard.jsx";
function GameList() {
  return (
    <main>
      <div className="flex flex-col sm:flex-row sm:items-baseline mb-4">
        <h2 className="text-2xl sm:text-4xl font-medium mb-2 sm:mb-0 sm:mr-6">
          Upcoming Games
        </h2>
        <span className="text-sm sm:text-base text-gray-700">
          Sunday 30/3 - Sunday 6/4
        </span>
      </div>

      <div className="h-px bg-gray-200 mb-6 sm:mb-8"></div>

      {/* Game Cards */}
      <div className="space-y-4">
        {/* Game 1 */}
        <GameCard
          teams="CSK vs RCB"
          venue="Chennai"
          dateTime="30/3, 6pm IST"
          betCutoffTime="30/3, 2pm IST"
          cutoffExceeded={true}
        />

        {/* Game 2 */}
        <GameCard
          teams="LSG vs KKR"
          venue="Chennai"
          dateTime="1/4, 6pm IST"
          betCutoffTime="30/3, 2pm IST"
          cutoffExceeded={true}
        />

        {/* Game 3 */}
        <GameCard
          teams="CSK vs RCB"
          venue="Chennai"
          dateTime="2/4, 6pm IST"
          betCutoffTime="30/3, 2pm IST"
          cutoffExceeded={true}
        />

        {/* Game 4 */}
        <GameCard
          teams="CSK vs RCB"
          venue="Chennai"
          dateTime="3/4, 6pm IST"
          betCutoffTime="30/3, 2pm IST"
          cutoffExceeded={false}
        />

        {/* Game 5 */}
        <GameCard
          teams="CSK vs RCB"
          venue="Chennai"
          dateTime="4/4, 6pm IST"
          betCutoffTime="30/3, 2pm IST"
          cutoffExceeded={false}
        />

        {/* Game 6 */}
        <GameCard
          teams="CSK vs RCB"
          venue="Chennai"
          dateTime="5/4, 6pm IST"
          betCutoffTime="30/3, 2pm IST"
          cutoffExceeded={false}
        />
      </div>
    </main>
  );
}

export default GameList;
