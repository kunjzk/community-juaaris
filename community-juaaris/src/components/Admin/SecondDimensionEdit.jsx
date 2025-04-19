import { React, useState, useEffect } from "react";
import { getSecondDimension } from "../../api/gameplay";

function SecondDimensionEdit() {
  const [secondDimensionHistory, setSecondDimensionHistory] = useState({});
  const [refreshSecondDimension, setRefreshSecondDimension] = useState(false);

  useEffect(() => {
    const fetchSecondDim = async () => {
      const secDimAndDate = await getSecondDimension();
      setSecondDimensionHistory(secDimAndDate);
    };
  }, []);

  const handleNewSecondDimension = async (secDimValue, secDimDate) => {
    // new API to post a new value of second dimension
    // toggle refreshSecondDimension
  };

  return (
    <div>
      <p>Second dimension history is: display table here</p>{" "}
      <div>
        <p>Set a new second dimension value</p>
        <p>Set the date it is effective from</p>
        <form>
          <button onClick={handleNewSecondDimension(secDimValue, secDimDate)}>
            Submit
          </button>
        </form>
        <p> Set refresh to be true</p>
      </div>
    </div>
  );
}

export default SecondDimensionEdit;
