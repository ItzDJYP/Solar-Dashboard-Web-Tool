import statePrices from "./statePrices";
import { getPriceDollars } from "./priceTool";

// System constants
const COST_PER_WATT = 2.5; // $/W
const ITC = 0.3; // 30%
const GEN_PER_KW = 1400; // kWh/year per kW
const ESCALATION = 0.025; // 2.5% per year
const O_AND_M = 15; // $/kW/year
const LIFETIME = 25; // years

// Helper: IRR function
function calculateIRR(cashFlows, guess = 0.1) {
  const maxIterations = 1000;
  const precision = 1e-6;
  let rate = guess;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivative = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
      if (t > 0) {
        derivative -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
      }
    }
    const newRate = rate - npv / derivative;
    if (Math.abs(newRate - rate) < precision) return newRate * 100; // %
    rate = newRate;
  }
  return NaN; // IRR did not converge
}

// Helper: Payback period
function calculatePayback(cashFlows) {
  let cumulative = 0;
  for (let year = 0; year < cashFlows.length; year++) {
    cumulative += cashFlows[year];
    if (cumulative >= 0) return year;
  }
  return null; // never pays back
}

// Main financial model
export function calculateProject(state, size, customerType = 'residential') {
  // pricePerKWh is in $/kWh and uses the designated customer type
  const pricePerKWh = getPriceDollars(state, customerType) || (13 / 100);

  // Upfront system cost
  const upfrontCost = size * 1000 * COST_PER_WATT;
  const taxCredit = upfrontCost * ITC;
  const netCost = upfrontCost - taxCredit;

  // Annual generation
  const annualGeneration = size * GEN_PER_KW;

  // Build cash flows
  const cashFlows = [];
  cashFlows.push(-netCost); // Year 0

  let electricityPrice = pricePerKWh;
  let cumulative = -netCost;
  const cashFlowTable = [
    { year: 0, cashFlow: -netCost, cumulative },
  ];

  for (let year = 1; year <= LIFETIME; year++) {
    const savings = annualGeneration * electricityPrice;
    const oAndM = size * O_AND_M;
    const cashFlow = savings - oAndM;
    cashFlows.push(cashFlow);
    cumulative += cashFlow;
    cashFlowTable.push({ year, cashFlow, cumulative });
    electricityPrice *= 1 + ESCALATION;
  }

  // IRR & Payback
  const irr = calculateIRR(cashFlows);
  const payback = calculatePayback(cashFlows);

  return {
    upfrontCost: Math.round(upfrontCost),
    annualGeneration: Math.round(annualGeneration),
    irr: irr ? irr : 0,
    payback: payback || "N/A",
    cashFlows: cashFlowTable,
  };
}
