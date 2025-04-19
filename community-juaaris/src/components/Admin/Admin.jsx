import React, { useState } from "react";
import SecondDimensionEdit from "./SecondDimensionEdit";
import ResultsList from "./ResultsList";

function Admin() {
  const [activeTab, setActiveTab] = useState("results");

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Admin</h1>

      <nav className="flex gap-4 sm:gap-8 mb-8">
        <button
          onClick={() => setActiveTab("results")}
          className={`text-sm sm:text-base font-semibold pb-1 ${
            activeTab === "results"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Post Match Results
        </button>
        <button
          onClick={() => setActiveTab("second-dimension")}
          className={`text-sm sm:text-base font-semibold pb-1 ${
            activeTab === "second-dimension"
              ? "text-[#2e7d32] border-b-2 border-[#2e7d32]"
              : "text-black hover:text-[#2e7d32] transition-colors"
          }`}
        >
          Edit Second Dimension
        </button>
      </nav>

      {activeTab === "results" ? <ResultsList /> : <SecondDimensionEdit />}
    </div>
  );
}

export default Admin;
