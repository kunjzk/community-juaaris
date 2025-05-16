import React, { useState, useEffect } from "react";
import { useMatchesContext } from "../../contexts/matches";

function PostTrivia() {
  const { matches } = useMatchesContext();
  const [triviaList, setTriviaList] = useState([]);
  const [refreshTrivia, setRefreshTrivia] = useState(false);

  useEffect(() => {
    const fetchTrivia = async () => {
      // TODO: Implement API call to fetch trivia for matches
      // const triviaData = await getTriviaForMatches();
      // setTriviaList(triviaData);
    };
    fetchTrivia();
  }, [refreshTrivia]);

  const handlePostTriviaResult = async (triviaId, correctOption) => {
    // TODO: Implement API call to post trivia result
    // await postTriviaResult(triviaId, correctOption);
    setRefreshTrivia(!refreshTrivia);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Post Trivia Results</h1>
      {/* Trivia Cards */}
      <div className="space-y-4">
        {triviaList.length > 0 ? (
          triviaList.map((trivia) => (
            <div key={trivia.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  {trivia.match_name}
                </h3>
                <p className="text-gray-600 mb-4">{trivia.question}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`optionA-${trivia.id}`}
                      name={`trivia-${trivia.id}`}
                      value="A"
                      className="mr-2"
                      onChange={() => handlePostTriviaResult(trivia.id, "A")}
                    />
                    <label htmlFor={`optionA-${trivia.id}`}>
                      A: {trivia.option_a}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`optionB-${trivia.id}`}
                      name={`trivia-${trivia.id}`}
                      value="B"
                      className="mr-2"
                      onChange={() => handlePostTriviaResult(trivia.id, "B")}
                    />
                    <label htmlFor={`optionB-${trivia.id}`}>
                      B: {trivia.option_b}
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`optionC-${trivia.id}`}
                      name={`trivia-${trivia.id}`}
                      value="C"
                      className="mr-2"
                      onChange={() => handlePostTriviaResult(trivia.id, "C")}
                    />
                    <label htmlFor={`optionC-${trivia.id}`}>
                      C: {trivia.option_c}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`optionD-${trivia.id}`}
                      name={`trivia-${trivia.id}`}
                      value="D"
                      className="mr-2"
                      onChange={() => handlePostTriviaResult(trivia.id, "D")}
                    />
                    <label htmlFor={`optionD-${trivia.id}`}>
                      D: {trivia.option_d}
                    </label>
                  </div>
                </div>
              </div>

              {trivia.correct_option && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <p className="text-green-700">
                    Correct Answer: Option {trivia.correct_option}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No trivia questions available for posting results
          </div>
        )}
      </div>
    </div>
  );
}

export default PostTrivia;
