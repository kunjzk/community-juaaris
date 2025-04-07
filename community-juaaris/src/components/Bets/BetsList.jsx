import React, { useState } from "react";
import BettingCard from "./BettingCard";
import { Button } from "@/components/ui/button";

function BetsList() {
  // Mock database of users and their bets
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Madan",
      bet: { team: "CSK", option: "MORE" },
      cardColor: "#fdfdc4",
    },
    {
      id: 2,
      name: "Pratibha",
      bet: { team: "RCB", option: "LESS" },
      cardColor: "#ffd6d6",
    },
    {
      id: 3,
      name: "Anshu",
      bet: { team: "CSK", option: "LESS" },
      cardColor: "#fdfdc4",
    },
    { id: 4, name: "Kunal", bet: null, cardColor: "white" },
    { id: 5, name: "Prachi", bet: null, cardColor: "white" },
    {
      id: 6,
      name: "Rajiv",
      bet: { team: "CSK", option: "LESS" },
      cardColor: "#fdfdc4",
    },
  ]);

  // Function to update a user's bet
  const updateUserBet = (userId, newBet) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            bet: newBet,
            // Update card color based on team
            cardColor: newBet.team === "CSK" ? "#fdfdc4" : "#ffd6d6",
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-medium text-[#3c6e21]">
          Community Juaaris
        </h1>
        <nav className="flex gap-8 items-center">
          <div className="text-lg font-medium">Upcoming Games</div>
          <div className="text-lg font-medium text-[#3c6e21] border-b-2 border-[#3c6e21]">
            Bets
          </div>
          <div className="text-lg font-medium">Standings</div>
        </nav>
      </header>

      <div className="mb-8">
        <h2 className="text-5xl font-serif mb-2">CSK vs RCB</h2>
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <p className="text-lg">Venue: Chennai</p>
            <p className="text-lg">Date: 7th April 2025</p>
            <p className="text-lg font-medium">Second dimension: 335 runs</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-2 text-base"
            >
              &lt; Prev Match
            </Button>
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-2 text-base"
            >
              Next Match &gt;
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {users.map((user) => (
          <BettingCard
            key={user.id}
            user={user}
            onUpdateBet={(newBet) => updateUserBet(user.id, newBet)}
          />
        ))}
      </div>
    </div>
  );
}

export default BetsList;
