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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Solar Dashboard 🌞
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
  );
}

export default App;
