// src/utils/priceTool.js
// Small helper that exposes prices by customer type (residential/commercial/average)
// The repository currently has one value per state (average cents/kWh). To keep
// changes low-risk we derive residential and commercial values from the average
// using simple multipliers. Replace these with real data if/when available.

import basePrices from './statePrices'; // now may contain per-type objects

const DEFAULT_MULTIPLIERS = {
  residential: 1.05, // assume residential ~5% above reported average
  commercial: 0.9,   // assume commercial ~10% below reported average
  average: 1.0,
};

export const PRICE_TYPES = ['residential', 'commercial', 'average'];

/**
 * Get price (in cents/kWh) for a given state and customer type.
 * state: string (e.g., 'California')
 * type: 'residential' | 'commercial' | 'average'
 */
export function getPriceCents(state, type = 'residential') {
  const entry = basePrices[state];
  if (entry == null) return 13; // fallback 13 cents/kWh

  // if the state provides an object with explicit types, prefer them
  if (typeof entry === 'object') {
    const val = entry[type] ?? entry.average ?? null;
    if (val != null) return Math.round(val * 100) / 100;
  }

  // otherwise entry is a numeric average — apply multipliers
  const avg = Number(entry);
  const multiplier = DEFAULT_MULTIPLIERS[type] ?? 1.0;
  return Math.round(avg * multiplier * 100) / 100; // keep two decimals
}

/**
 * Convenience: return price in $/kWh
 */
export function getPriceDollars(state, type = 'residential') {
  return getPriceCents(state, type) / 100;
}

export default { getPriceCents, getPriceDollars, PRICE_TYPES };
