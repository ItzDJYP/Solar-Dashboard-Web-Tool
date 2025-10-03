import { useState } from "react";
import statePrices from "../utils/statePrices";

export default function Inputs({ onSubmit }) {
  const [state, setState] = useState("Alabama"); // default first state
  const [size, setSize] = useState("");
  const [customerType, setCustomerType] = useState("residential");
  // area-to-kW converter states
  const [area, setArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("sqft"); // 'sqft' or 'sqm'
  const [powerDensity, setPowerDensity] = useState(205); // W per m^2 of panels

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!size || size <= 0) {
      alert("Please enter a valid system size (kW).");
      return;
    }
    onSubmit({ state, size: parseFloat(size), customerType });
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

      {/* --- Optional converter from roof area to kW DC --- */}
      <div className="border rounded p-4 mb-3">
        <h3 className="text-gray-600 font-semibold mb-2">Estimate size from roof area</h3>
        <p className="text-gray-500 text-sm mb-2">Enter roof area and we'll estimate system size (approx.).</p>

        <div className="mb-2">
          <label className="text-gray-600">Roof area</label>
          <div className="flex mt-1">
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2 border rounded mr-2"
              min="1"
              step="1"
            />
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="sqft">sqft</option>
              <option value="sqm">m²</option>
            </select>
          </div>
        </div>

        <div className="mb-2">
          <label className="text-gray-600">Panel power density</label>
          <select
            value={powerDensity}
            onChange={(e) => setPowerDensity(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value={190}>190 W/m² (older panels)</option>
            <option value={205}>205 W/m² (common modern)</option>
            <option value={230}>230 W/m² (high-efficiency)</option>
            <option value={260}>260 W/m² (premium)</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => {
              const numericArea = parseFloat(area);
              if (!numericArea || numericArea <= 0) {
                alert("Please enter a valid roof area to convert.");
                return;
              }
              const areaM2 = areaUnit === "sqft" ? numericArea / 10.7639 : numericArea;
              const kw = (areaM2 * powerDensity) / 1000;
              const rounded = Math.round(kw * 10) / 10; // rounded to one decimal place
              setSize(String(rounded));
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Convert area → kW
          </button>
          <button
            type="button"
            onClick={() => { setArea(""); setSize(""); }}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Customer type */}
      <label className="block mb-3">
        <span className="text-gray-600">Customer Type</span>
        <select
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="average">Average (Combined)</option>
        </select>
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
