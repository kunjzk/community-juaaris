import React, { useState } from "react";

// Explicit states for the bet card
const BET_STATES = {
  NO_BET: "NO_BET",
  EDITING: "EDITING",
  BET_PLACED: "BET_PLACED",
};

function TriviaBetCard({
  juaari,
  options,
  selectedOptions,
  onOptionSelect,
  isCutoffExceeded,
}) {
  // Determine initial state
  const getInitialState = () => {
    if (selectedOptions[juaari.id] === undefined) {
      return BET_STATES.NO_BET;
    }
    return BET_STATES.BET_PLACED;
  };

  const [betState, setBetState] = useState(getInitialState());
  const [tempSelection, setTempSelection] = useState(null);

  const handleOptionSelect = (option) => {
    if (betState === BET_STATES.EDITING) {
      setTempSelection(option);
    }
  };

  const handleSubmit = () => {
    if (betState === BET_STATES.NO_BET) {
      // Start editing mode
      setBetState(BET_STATES.EDITING);
      setTempSelection(null);
    } else if (betState === BET_STATES.EDITING) {
      // Submit the bet
      onOptionSelect(juaari.id, tempSelection);
      setBetState(BET_STATES.BET_PLACED);
    } else if (betState === BET_STATES.BET_PLACED) {
      // Start editing mode
      setBetState(BET_STATES.EDITING);
      setTempSelection(selectedOptions[juaari.id]);
    }
  };

  const getButtonText = () => {
    if (isCutoffExceeded) {
      return "Cutoff exceeded, no predictions allowed";
    }

    switch (betState) {
      case BET_STATES.NO_BET:
        return "Make a prediction";
      case BET_STATES.EDITING:
        return "Submit prediction";
      case BET_STATES.BET_PLACED:
        return "Edit prediction";
      default:
        return "";
    }
  };

  const getStatusMessage = () => {
    switch (betState) {
      case BET_STATES.NO_BET:
        return <span className="text-red-500">No prediction made</span>;
      case BET_STATES.BET_PLACED:
        const selectedOption = selectedOptions[juaari.id];
        if (!selectedOption) {
          return <span className="text-red-500">No prediction made</span>;
        }
        return (
          <span className="text-blue-500">
            Selected option {selectedOption}
          </span>
        );
      default:
        return null;
    }
  };

  const getButtonStyle = () => {
    if (isCutoffExceeded) {
      return "bg-gray-100 text-gray-400 cursor-not-allowed";
    }

    switch (betState) {
      case BET_STATES.NO_BET:
        return "bg-red-500 text-white hover:bg-red-600";
      case BET_STATES.EDITING:
        return tempSelection
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-100 text-gray-400 cursor-not-allowed";
      case BET_STATES.BET_PLACED:
        return "bg-blue-500 text-white hover:bg-blue-600";
      default:
        return "";
    }
  };

  const renderOptions = () => {
    if (betState !== BET_STATES.EDITING) return null;

    return (
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.key} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={`option-${juaari.id}`}
              value={opt.key}
              checked={tempSelection === opt.key}
              onChange={() => handleOptionSelect(opt.key)}
              className="cursor-pointer"
            />
            <span className="ml-1 text-sm">{opt.key}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-[#fafdf7] border border-gray-200 rounded-lg p-4">
      <div className="font-medium text-base sm:text-lg mb-2 sm:mb-0 sm:mr-6">
        {juaari.display_name}
      </div>
      <div className="flex flex-wrap items-center gap-4 flex-grow">
        {betState === BET_STATES.EDITING ? (
          renderOptions()
        ) : (
          <div className="font-medium text-base sm:text-lg flex-grow text-center">
            {getStatusMessage()}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={
            isCutoffExceeded ||
            (betState === BET_STATES.EDITING && !tempSelection)
          }
          className={`ml-auto px-4 py-2 rounded-md text-sm font-medium ${getButtonStyle()}`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}

export default TriviaBetCard;
