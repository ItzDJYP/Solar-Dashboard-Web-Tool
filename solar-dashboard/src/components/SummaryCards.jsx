function SummaryCards({ results }) {
  const { upfrontCost, annualGeneration, irr, payback } = results;

  const cardClass =
    "bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
      <div className={cardClass}>
        <h3 className="text-gray-500">Upfront Cost</h3>
        <p className="text-2xl font-bold text-blue-600">${upfrontCost.toLocaleString()}</p>
      </div>
      <div className={cardClass}>
        <h3 className="text-gray-500">Annual Generation</h3>
        <p className="text-2xl font-bold text-green-600">{annualGeneration.toLocaleString()} kWh</p>
      </div>
      <div className={cardClass}>
        <h3 className="text-gray-500">IRR</h3>
        <p className="text-2xl font-bold text-purple-600">{irr.toFixed(2)}%</p>
      </div>
      <div className={cardClass}>
        <h3 className="text-gray-500">Payback Period</h3>
        <p className="text-2xl font-bold text-red-600">{payback} yrs</p>
      </div>
    </div>
  );
}

export default SummaryCards;
