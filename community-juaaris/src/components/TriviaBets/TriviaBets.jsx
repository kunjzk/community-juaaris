import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTriviaWithMatchTime } from "../../api/trivia";
import { getJuaaris } from "../../api/juaaris";
import { createTriviaBet, getTriviaBetsForTrivia } from "../../api/trivia_bets";
import TriviaBetCard from "./TriviaBetCard";
import TriviaStatusCard from "./TriviaStatusCard";

function TriviaBets() {
  const { triviaId } = useParams();
  const navigate = useNavigate();
  const [trivia, setTrivia] = useState(null);
  const [triviaList, setTriviaList] = useState([]);
  const [juaaris, setJuaaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isCutoffExceeded, setIsCutoffExceeded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch all trivia with match time, then filter for the one we want
        let fetchedTriviaList = await getTriviaWithMatchTime();
        fetchedTriviaList = [...fetchedTriviaList].reverse();
        setTriviaList(fetchedTriviaList);
        let foundTrivia;

        if (triviaId) {
          // If triviaId is provided, find that specific trivia
          foundTrivia = fetchedTriviaList.find(
            (t) => String(t.id) === String(triviaId)
          );
        } else {
          // If no triviaId is provided, use the first trivia (most recent)
          foundTrivia = fetchedTriviaList[0];
        }

        setTrivia(foundTrivia);

        // Fetch all juaaris
        const juaarisList = await getJuaaris();
        setJuaaris(juaarisList);

        // If we have a trivia, fetch existing bets
        if (foundTrivia) {
          const existingBets = await getTriviaBetsForTrivia(foundTrivia.id);
          const initialOptions = {};
          existingBets.forEach((bet) => {
            initialOptions[bet.juaari_id] = bet.selected_option;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (err) {
        setError("Failed to load trivia or juaaris");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [triviaId]);

  useEffect(() => {
    const checkCutoff = () => {
      if (!trivia) return;
      const cutoffTime = new Date(trivia.match_datetime);
      cutoffTime.setHours(cutoffTime.getHours() - 2); // 24 hours before match
      const now = new Date();
      setIsCutoffExceeded(now > cutoffTime);
    };
    checkCutoff();
  }, [trivia]);

  // Get previous and next trivia
  const getNextTrivia = () => {
    if (!trivia || !triviaList.length) return null;
    const currentIndex = triviaList.findIndex(
      (t) => String(t.id) === String(trivia.id)
    );
    if (currentIndex <= 0) return null;
    return triviaList[currentIndex - 1];
  };

  const getPreviousTrivia = () => {
    if (!trivia || !triviaList.length) return null;
    const currentIndex = triviaList.findIndex(
      (t) => String(t.id) === String(trivia.id)
    );
    if (currentIndex === -1 || currentIndex >= triviaList.length - 1)
      return null;
    return triviaList[currentIndex + 1];
  };

  const prevTrivia = getPreviousTrivia();
  const nextTrivia = getNextTrivia();

  const goToPrevTrivia = () => {
    if (prevTrivia) {
      navigate(`/triviapreds/${prevTrivia.id}`);
    }
  };

  const goToNextTrivia = () => {
    if (nextTrivia) {
      navigate(`/triviapreds/${nextTrivia.id}`);
    }
  };

  const handleOptionSelect = async (juaariId, option) => {
    try {
      await createTriviaBet(trivia.id, juaariId, option);
      setSelectedOptions({
        ...selectedOptions,
        [juaariId]: option,
      });
    } catch (error) {
      console.error("Error creating/updating trivia pred:", error);
      alert("Failed to save prediction. Please try again.");
    }
  };

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error)
    return <div className="py-8 text-center text-red-600">{error}</div>;
  if (!trivia) return <div className="py-8 text-center">Trivia not found.</div>;

  const options = [
    { key: "A", value: trivia.option_a },
    { key: "B", value: trivia.option_b },
    { key: "C", value: trivia.option_c },
    { key: "D", value: trivia.option_d },
  ];

  return (
    <main className="max-w-2xl mx-auto p-4">
      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {prevTrivia && (
          <button
            onClick={goToPrevTrivia}
            className="bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-2 text-base border border-gray-300 shadow-sm"
          >
            &lt; Previous
          </button>
        )}
        {nextTrivia && (
          <button
            onClick={goToNextTrivia}
            className="bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-2 text-base border border-gray-300 shadow-sm"
          >
            Next &gt;
          </button>
        )}
      </div>

      {/* Top section: match name, question, options */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="border-b pb-2">
          <div className="text-lg font-semibold mb-2">{trivia.match_name}</div>
          <div className="mb-2 text-base">{trivia.question}</div>
          <div className="text-sm text-gray-600">
            Points: {trivia.bet_amount}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {options.map((opt) => (
            <div
              key={opt.key}
              className="bg-gray-100 rounded px-3 py-2 text-sm"
            >
              <span className="font-bold mr-2">{opt.key}.</span> {opt.value}
            </div>
          ))}
        </div>
      </div>

      {/* Status Card */}
      <TriviaStatusCard trivia={trivia} nextTrivia={nextTrivia} />

      {/* Juaari cards */}
      <div className="space-y-4">
        {juaaris.map((juaari) => (
          <TriviaBetCard
            key={juaari.id}
            juaari={juaari}
            options={options}
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
            isCutoffExceeded={isCutoffExceeded}
          />
        ))}
      </div>
    </main>
  );
}

export default TriviaBets;
