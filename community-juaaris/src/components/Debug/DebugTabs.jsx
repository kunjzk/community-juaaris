import React from "react";

function DebugTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("trivia")}
            className={`${
              activeTab === "trivia"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Trivia
          </button>
          <button
            onClick={() => setActiveTab("match")}
            className={`${
              activeTab === "match"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Match
          </button>
          <button
            onClick={() => setActiveTab("juaaris")}
            className={`${
              activeTab === "juaaris"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Juaaris
          </button>
        </nav>
      </div>
    </div>
  );
}

export default DebugTabs;
