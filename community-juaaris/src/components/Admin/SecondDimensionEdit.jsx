import { React, useState, useEffect } from "react";
import { getSecondDimension, postSecondDimension } from "../../api/gameplay";

function SecondDimensionEdit() {
  const [secondDimensionHistory, setSecondDimensionHistory] = useState([]);
  const [refreshSecondDimension, setRefreshSecondDimension] = useState(false);
  const [secDimValue, setSecDimValue] = useState(0);
  const [secDimDate, setSecDimDate] = useState(new Date());

  useEffect(() => {
    const fetchSecondDim = async () => {
      const secDimAndDate = await getSecondDimension();
      console.log(secDimAndDate);
      setSecondDimensionHistory(secDimAndDate);
    };
    fetchSecondDim();
  }, []);

  useEffect(() => {
    const fetchSecondDim = async () => {
      const secDimAndDate = await getSecondDimension();
      console.log(secDimAndDate);
      setSecondDimensionHistory(secDimAndDate);
    };
    fetchSecondDim();
  }, [refreshSecondDimension]);

  const handleNewSecondDimension = async (secDimValue, secDimDate) => {
    console.log(secDimValue, secDimDate);
    const effectiveFrom = new Date(secDimDate);
    effectiveFrom.setUTCHours(0, 0, 0, 0);
    if (secDimValue === 0) {
      alert("Second dimension value cannot be 0");
      return;
    }
    if (secDimDate === "") {
      alert("Second dimension date cannot be empty");
      return;
    }
    if (effectiveFrom < new Date().setUTCHours(0, 0, 0, 0)) {
      alert("Second dimension date cannot be in the past");
      return;
    }
    const mostRecentSecondDim =
      secondDimensionHistory[secondDimensionHistory.length - 1];
    console.log("Most recent second dim ", mostRecentSecondDim);
    console.log("Effective from ", effectiveFrom);
    if (
      effectiveFrom.getTime() ===
      new Date(mostRecentSecondDim.effective_from).getTime()
    ) {
      console.log(
        "Current date is the same as the most recent second dim date"
      );
      if (
        parseInt(secDimValue) ===
        parseInt(mostRecentSecondDim.second_dimension_cutoff)
      ) {
        alert("This second dimension value has already been set for the date");
        return;
      }
    }
    console.log("posting ", secDimValue, effectiveFrom);
    const response = await postSecondDimension(secDimValue, effectiveFrom);
    console.log(response);
    setRefreshSecondDimension(!refreshSecondDimension);
  };

  return (
    <>
      <div>
        <h3 className="text-3xl font-serif mb-8">Second Dimension History</h3>

        {/* Table Header - Styled like cards */}
        <div className="bg-gray-100 rounded-t-lg border border-gray-200 grid grid-cols-12 font-medium text-gray-700">
          <div className="px-3 py-3 border-r border-gray-200 text-center col-span-6">
            Date
          </div>
          <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
            Value
          </div>
        </div>

        {/* Table Rows - Styled like cards */}
        <div className="rounded-b-lg overflow-hidden border-x border-b border-gray-200 bg-white">
          {secondDimensionHistory.map((entry) => (
            <div
              key={entry.effective_from}
              className={`grid grid-cols-12 border-t border-gray-200`}
            >
              <div className="px-6 py-3 border-r border-gray-200 text-center col-span-6">
                {new Date(entry.effective_from).toLocaleDateString("en-GB")}
              </div>
              <div className="px-6 py-3 text-center col-span-6">
                {entry.second_dimension_cutoff}
              </div>
            </div>
          ))}
        </div>

        <br></br>

        <div>
          <h3 className="text-3xl font-serif mb-8">
            Set a new second dimension
          </h3>

          <div className="flex-grow">
            <div className="mb-4 flex items-center justify-between">
              <label className="text-base sm:text-xl">
                Second dimension effective date
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
                value={new Date(secDimDate).toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  date.setUTCHours(0, 0, 0, 0);
                  setSecDimDate(date);
                }}
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="text-base sm:text-xl">
                Second dimension value
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 w-[120px] sm:w-[140px]"
                value={secDimValue}
                onChange={(e) => setSecDimValue(e.target.value)}
                min="0"
                step="1"
              />
            </div>
          </div>
          <button
            className="w-full bg-[#27ae60] hover:bg-[#2ecc71] text-white py-2 rounded-md font-medium"
            onClick={() => handleNewSecondDimension(secDimValue, secDimDate)}
          >
            Save new second dimension
          </button>
        </div>
      </div>
    </>
  );
}

export default SecondDimensionEdit;
