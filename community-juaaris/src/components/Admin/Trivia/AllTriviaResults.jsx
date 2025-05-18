import React, { useState, useEffect } from "react";
import { useMatchesContext } from "../../../contexts/matches";
import { getTriviaWithMatchTime } from "../../../api/trivia";
import TriviaResultsCard from "./TriviaResultsCard";

function AllTriviaResults() {
  const { matches } = useMatchesContext();
  const [triviaList, setTriviaList] = useState([]);
  const [refreshTrivia, setRefreshTrivia] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchTrivia = async () => {
      const triviaData = await getTriviaWithMatchTime();
      setTriviaList(triviaData);
      // Initialize selectedOptions with current correct options
      const initialOptions = {};
      triviaData.forEach((trivia) => {
        initialOptions[trivia.id] = trivia.correct_option || "";
      });
      setSelectedOptions(initialOptions);
    };
    fetchTrivia();
  }, [refreshTrivia]);

  const handleOptionChange = (triviaId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [triviaId]: option,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Post Trivia Results</h2>
      <div className="space-y-6">
        {triviaList.map((trivia) => (
          <TriviaResultsCard
            key={trivia.id}
            trivia={trivia}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
            onRefresh={() => setRefreshTrivia(!refreshTrivia)}
          />
        ))}
      </div>
    </div>
  );
}

export default AllTriviaResults;
