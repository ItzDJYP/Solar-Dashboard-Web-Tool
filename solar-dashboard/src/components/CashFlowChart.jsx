import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CashFlowChart({ cashFlows }) {
  // debug log to ensure data arrives in expected shape
  console.log("CashFlowChart data:", cashFlows);

  if (!cashFlows || !Array.isArray(cashFlows) || cashFlows.length === 0) {
    return (
      <div className="w-full max-w-6xl h-96 mt-8 bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
        <span className="text-gray-500">No cash flow data to display</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Cash Flow Over Time</h2>
      {/* Give ResponsiveContainer a fixed pixel height so it can calculate sizes reliably */}
      <div style={{ width: "100%", height: 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cashFlows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Line type="monotone" dataKey="cashFlow" stroke="#2563eb" dot={false} />
            <Line type="monotone" dataKey="cumulative" stroke="#16a34a" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CashFlowChart;
