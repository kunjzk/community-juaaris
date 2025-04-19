import React from "react";
import SecondDimensionEdit from "./SecondDimensionEdit";

function Admin() {
  return (
    <div>
      <SecondDimensionEdit />
      <p>
        Results list can initially be the same as game list, except it's got a
        form for user to submit results.
      </p>
      <p>Remember to handle the case where the game goes to super over</p>
      <p>
        Then figure out how to update all the tables, as well as the bets page.
        Bumper can wait.
      </p>
      <ResultsList />
    </div>
  );
}

export default Admin;
