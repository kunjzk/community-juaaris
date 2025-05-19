import React, { useState, useEffect } from "react";
import { getJuaarisAndWinnings } from "../../api/juaaris";

function DebugJuaaris() {
  const [juaaris, setJuaaris] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJuaaris = async () => {
      setLoading(true);
      try {
        const data = await getJuaarisAndWinnings();
        setJuaaris(data);
      } catch (error) {
        console.error("Error fetching juaaris data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJuaaris();
  }, []);

  const renderTable = (data, columns, title) => (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">{title}</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {renderTable(
        juaaris,
        [
          { key: "id", label: "ID" },
          { key: "display_name", label: "Name" },
          {
            key: "winnings",
            label: "Total Winnings",
            render: (row) => `$${Number(row.winnings).toFixed(2)}`,
          },
          {
            key: "is_purple_capped",
            label: "Purple Cap",
            render: (row) => (row.is_purple_capped ? "Yes" : "No"),
          },
          {
            key: "is_orange_capped",
            label: "Orange Cap",
            render: (row) => (row.is_orange_capped ? "Yes" : "No"),
          },
          {
            key: "defaults_remaining",
            label: "Defaults Remaining",
          },
        ],
        "Juaaris List"
      )}
    </div>
  );
}

export default DebugJuaaris;
