import { useState } from "react";
import statePrices from "../utils/statePrices";

export default function Inputs({ onSubmit }) {
  const [state, setState] = useState("Alabama"); // default first state
  const [size, setSize] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!size || size <= 0) {
      alert("Please enter a valid system size (kW).");
      return;
    }
    onSubmit({ state, size: parseFloat(size) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Inputs</h2>

      {/* State dropdown */}
      <label className="block mb-3">
        <span className="text-gray-600">Select State</span>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        >
          {Object.keys(statePrices).map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </label>

      {/* Roof size input */}
      <label className="block mb-3">
        <span className="text-gray-600">Roof Size (kW DC)</span>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          min="1"
          step="0.1"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>
    </form>
  );
}
