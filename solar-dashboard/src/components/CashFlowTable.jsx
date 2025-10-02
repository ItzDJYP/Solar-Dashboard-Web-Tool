function CashFlowTable({ cashFlows }) {
  return (
    <div className="overflow-x-auto mt-8 w-full max-w-6xl">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Year</th>
            <th className="border border-gray-300 px-4 py-2">Cash Flow ($)</th>
            <th className="border border-gray-300 px-4 py-2">Cumulative ($)</th>
          </tr>
        </thead>
        <tbody>
          {cashFlows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-300 px-4 py-2">{row.year}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.cashFlow.toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.cumulative.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CashFlowTable;
