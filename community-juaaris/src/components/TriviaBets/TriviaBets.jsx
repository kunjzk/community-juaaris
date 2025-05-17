import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTriviaWithMatchTime } from "../../api/trivia";
import { getJuaaris } from "../../api/juaaris";

function TriviaBets() {
  const { triviaId } = useParams();
  const [trivia, setTrivia] = useState(null);
  const [juaaris, setJuaaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch all trivia with match time, then filter for the one we want
        const triviaList = await getTriviaWithMatchTime();
        const foundTrivia = triviaList.find(
          (t) => String(t.id) === String(triviaId)
        );
        setTrivia(foundTrivia);
        // Fetch all juaaris
        const juaarisList = await getJuaaris();
        setJuaaris(juaarisList);
      } catch (err) {
        setError("Failed to load trivia or juaaris");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [triviaId]);

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
      {/* Top section: match name, question, options */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="text-lg font-semibold mb-2">{trivia.match_name}</div>
        <div className="mb-4 text-base">{trivia.question}</div>
        <div className="grid grid-cols-2 gap-2">
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

      {/* Juaari cards */}
      <div className="space-y-4">
        {juaaris.map((juaari) => (
          <div
            key={juaari.id}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-[#fafdf7] border border-gray-200 rounded-lg p-4"
          >
            <div className="font-medium text-base sm:text-lg mb-2 sm:mb-0 sm:mr-6">
              {juaari.display_name}
            </div>
            <div className="flex flex-wrap gap-4">
              {options.map((opt) => (
                <label
                  key={opt.key}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`option-${juaari.id}`}
                    value={opt.key}
                    checked={selectedOptions[juaari.id] === opt.key}
                    onChange={() =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [juaari.id]: opt.key,
                      })
                    }
                    disabled
                  />
                  <span className="ml-1 text-sm">{opt.key}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default TriviaBets;
