import React, { useState } from "react";
import SecondDimensionEdit from "./SecondDimensionEdit";
import ResultsList from "./Matches/ResultsList";
import CreateTrivia from "./Trivia/CreateTrivia";
import AllTriviaResults from "./Trivia/AllTriviaResults";
import AddMatches from "./Matches/AddMatches";
import EditMatches from "./Matches/EditMatches";
import EditTrivia from "./Trivia/EditTrivia";
import CreateDefaultBet from "./Matches/CreateDefaultBet";

function Admin() {
  const [activeMainTab, setActiveMainTab] = useState("matches");
  const [activeSubTab, setActiveSubTab] = useState("post-results");

  const renderSubTabs = () => {
    if (activeMainTab === "matches") {
      return (
        <div className="flex flex-wrap gap-4 mb-6 mt-2">
          <button
            onClick={() => setActiveSubTab("add-matches")}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
              activeSubTab === "add-matches"
                ? "bg-[#e8f5e9] text-[#2e7d32]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            Add Matches
          </button>
          <button
            onClick={() => setActiveSubTab("edit-matches")}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
              activeSubTab === "edit-matches"
                ? "bg-[#e8f5e9] text-[#2e7d32]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            Edit Matches
          </button>
          <button
            onClick={() => setActiveSubTab("post-results")}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
              activeSubTab === "post-results"
                ? "bg-[#e8f5e9] text-[#2e7d32]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            Post Match Results
          </button>
          <button
            onClick={() => setActiveSubTab("create-default-bet")}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
              activeSubTab === "create-default-bet"
                ? "bg-[#e8f5e9] text-[#2e7d32]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            Create Default Bet
          </button>
        </div>
      );
    } else if (activeMainTab === "trivia") {
      return (
        <div className="flex flex-wrap gap-4 mb-6 mt-2">
          <button
            onClick={() => setActiveSubTab("create-trivia")}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
              activeSubTab === "create-trivia"
                ? "bg-[#e8f5e9] text-[#2e7d32]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            Create New Trivia
          </button>
          <button
            onClick={() => setActiveSubTab("edit-trivia")}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
              activeSubTab === "edit-trivia"
                ? "bg-[#e8f5e9] text-[#2e7d32]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            Edit Trivia
          </button>
          <button
            onClick={() => setActiveSubTab("post-trivia-results")}
            className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
              activeSubTab === "post-trivia-results"
                ? "bg-[#e8f5e9] text-[#2e7d32]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            Post Trivia Results
          </button>
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    // Matches tab content
    if (activeMainTab === "matches") {
      if (activeSubTab === "post-results") {
        return <ResultsList />;
      } else if (activeSubTab === "add-matches") {
        return <AddMatches />;
      } else if (activeSubTab === "edit-matches") {
        return <EditMatches />;
      } else if (activeSubTab === "create-default-bet") {
        return <CreateDefaultBet />;
      }
    }
    // Trivia tab content
    else if (activeMainTab === "trivia") {
      if (activeSubTab === "create-trivia") {
        return <CreateTrivia />;
      } else if (activeSubTab === "edit-trivia") {
        return <EditTrivia />;
      } else if (activeSubTab === "post-trivia-results") {
        return <AllTriviaResults />;
      }
    }
    // Second dimension tab content
    else if (activeMainTab === "second-dimension") {
      return <SecondDimensionEdit />;
    }

    return null;
  };

  // Handle tab switching with appropriate default sub-tabs
  const handleMainTabChange = (tab) => {
    setActiveMainTab(tab);

    // Set default sub-tab for each main tab
    if (tab === "matches") {
      setActiveSubTab("post-results");
    } else if (tab === "trivia") {
      setActiveSubTab("create-trivia");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Admin</h1>

      <nav className="flex gap-4 sm:gap-8 mb-4 border-b pb-2">
        <button
          onClick={() => handleMainTabChange("matches")}
          className={`text-sm sm:text-base font-semibold pb-1 ${
            activeMainTab === "matches"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => handleMainTabChange("trivia")}
          className={`text-sm sm:text-base font-semibold pb-1 ${
            activeMainTab === "trivia"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Trivia
        </button>
        <button
          onClick={() => handleMainTabChange("second-dimension")}
          className={`text-sm sm:text-base font-semibold pb-1 ${
            activeMainTab === "second-dimension"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Second Dimension
        </button>
      </nav>

      {renderSubTabs()}
      {renderContent()}
    </div>
  );
}

export default Admin;
