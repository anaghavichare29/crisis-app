import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function CrisisAlerts({ dark, setDark }) {
  const [selectedCrisis, setSelectedCrisis] = useState(null);
  const navigate = useNavigate();

  const crises = [
    /* same data */
  ];

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-gray-900 text-white p-6"
          : "min-h-screen bg-gradient-to-br from-blue-100 to-white p-6"
      }
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate("/dashboard")}>
          <IoMdArrowRoundBack
            size={25}
            className={dark ? "text-white" : "text-blue-700"}
          />
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Crisis Alerts
      </h1>

      <div className="space-y-5">
        {crises.map((c, index) => (
          <div
            key={index}
            className={`${dark ? "bg-gray-800 text-white" : "bg-white"} p-6 rounded-xl shadow`}
          >
            <span className="bg-red-100 text-red-600 px-3 py-1 text-sm rounded-full">
              ⚠️ Alert
            </span>

            <h2 className="text-2xl font-semibold mt-2">{c.title}</h2>

            <p className={dark ? "text-gray-300 mt-2" : "text-gray-600 mt-2"}>
              {c.description}
            </p>

            <button
              onClick={() => setSelectedCrisis(c)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedCrisis && (
        <div
          className={`fixed inset-0 flex justify-center items-center ${
            dark ? "bg-black bg-opacity-70" : "bg-black bg-opacity-40"
          }`}
        >
          <div
            className={`p-6 rounded-xl w-[90%] md:w-[500px] shadow-lg ${
              dark ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-3">
              {selectedCrisis.title}
            </h2>

            <p className={dark ? "text-gray-300 mb-4" : "text-gray-700 mb-4"}>
              {selectedCrisis.details}
            </p>

            <button
              onClick={() => setSelectedCrisis(null)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrisisAlerts;
