import { useState } from "react";
import Inputs from "./components/Inputs";
import SummaryCards from "./components/SummaryCards";
import CashFlowTable from "./components/CashFlowTable";
import CashFlowChart from "./components/CashFlowChart"; // notice plural in filename
import { calculateProject } from "./utils/finance";

function App() {
  const [results, setResults] = useState(null);

  const handleSubmit = ({ state, size }) => {
    const res = calculateProject(state, size);
    setResults(res);
  };

  return (
    <div
      className="app-bg"
      style={{
        ['--app-bg']: "url('/assets/background-demo.jpeg')",
        ['--app-bg-color']: '#eef2ff',
        ['--app-overlay-opacity']: 0.28,
      }}
    >
      <div className="app-card bg-white max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Solar Dashboard
        </h1>

        {/* Input form */}
        <Inputs onSubmit={handleSubmit} />

        {/* Results */}
        {results && (
          <div className="mt-8 flex flex-col items-center space-y-8">
            <SummaryCards results={results} />
            <CashFlowTable cashFlows={results.cashFlows} />
            <CashFlowChart cashFlows={results.cashFlows} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
