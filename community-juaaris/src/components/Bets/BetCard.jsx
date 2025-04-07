import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function BetCard({ user, onUpdateBet }) {
  // Make sure user exists and has expected properties
  const userName = user?.name || "User";
  const userBet = user?.bet || null;
  const cardColor = user?.cardColor || "white";

  const [isEditing, setIsEditing] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("CSK");
  const [selectedOption, setSelectedOption] = useState("MORE");

  // Initialize form values when user or user.bet changes
  useEffect(() => {
    if (userBet) {
      setSelectedTeam(userBet.team || "CSK");
      setSelectedOption(userBet.option || "MORE");
    }
  }, [userBet]);

  // Handle saving the bet
  const handleSaveBet = () => {
    onUpdateBet({ team: selectedTeam, option: selectedOption });
    setIsEditing(false);
  };

  // Handle starting to edit
  const handleStartEdit = () => {
    // If user already has a bet, pre-fill the form
    if (userBet) {
      setSelectedTeam(userBet.team || "CSK");
      setSelectedOption(userBet.option || "MORE");
    }
    setIsEditing(true);
  };

  // Render the card content based on state
  const renderCardContent = () => {
    // Case 1: User is editing their bet
    if (isEditing) {
      return (
        <>
          <h3 className="text-2xl font-serif mb-2 text-center">
            {userName}'s bet
          </h3>
          <div className="flex-grow">
            <div className="mb-4 flex items-center justify-between">
              <label className="text-xl">Select team:</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-[120px]"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="CSK">CSK</option>
                <option value="RCB">RCB</option>
              </select>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="text-xl">More or less?</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-[120px]"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="MORE">MORE</option>
                <option value="LESS">LESS</option>
              </select>
            </div>
          </div>
          <Button
            className="w-full bg-[#27ae60] hover:bg-[#2ecc71] text-white"
            onClick={handleSaveBet}
          >
            Save your bet
          </Button>
        </>
      );
    }

    // Case 2: User has not placed a bet yet
    if (!userBet) {
      return (
        <>
          <h3 className="text-2xl font-serif mb-2 text-center">
            {userName}'s bet:
          </h3>
          <p className="text-4xl font-serif mb-6 text-red-500 text-center flex-grow flex items-center justify-center">
            Nothing yet!
          </p>
          <Button
            className="w-full bg-[#e74c3c] hover:bg-[#c0392b] text-white"
            onClick={handleStartEdit}
          >
            Place a bet!
          </Button>
        </>
      );
    }

    // Case 3: User has placed a bet
    return (
      <>
        <h3 className="text-2xl font-serif mb-2 text-center">
          {userName}'s bet:
        </h3>
        <p className="text-4xl font-serif mb-6 text-center flex-grow flex items-center justify-center">
          {userBet.team} {userBet.option}
        </p>
        <Button
          className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white"
          onClick={handleStartEdit}
        >
          Edit bet
        </Button>
      </>
    );
  };

  return (
    <Card
      className={`p-6 rounded-lg border border-gray-200 flex flex-col h-[220px]`}
      style={{ backgroundColor: cardColor }}
    >
      {renderCardContent()}
    </Card>
  );
}

export default BetCard;
