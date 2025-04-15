{
  selectedTeam.name;
}
{
  selectedOption;
}

// Handle starting to edit
const handleStartEdit = async () => {
  // If user already has a bet, pre-fill the form
  if (bet) {
    setSelectedTeam(await displayTeamName(bet.predicted_winning_team));
    setSelectedOption(bet.predicted_more_or_less);
  }
  setIsEditing(true);
};

async function displayTeamName(teamId) {
  console.log("Getting team name for ID:", teamId);
  const teamName = await getTeamNameById(teamId);
  console.log("Team name result:", teamName);
  return teamName.name;
}

// Initialize form values when user or user.bet changes
useEffect(() => {
  const initializeBet = async () => {
    if (bet) {
      console.log("Initializing bet with team ID:", bet.predicted_winning_team);
      const teamName = await displayTeamName(bet.predicted_winning_team);
      console.log("Setting selected team to:", teamName);
      setSelectedTeam(teamName);
      setSelectedOption(bet.predicted_more_or_less);
    }
  };
  initializeBet();
}, [bet]);

useEffect(() => {
  console.log("SELECTED TEAM UPDATED TO:", selectedTeam);
}, [selectedTeam]);
