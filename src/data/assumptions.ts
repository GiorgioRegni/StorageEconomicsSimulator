// Edit this file to tune the economics model used across the app.
// All media pricing and high-level TCO assumptions live here.
export const TB_PER_PB = 1_000;

export const modelAssumptions = {
  // Unit: years.
  // The simulator presents a single multi-year TCO view rather than annual cost.
  horizonYears: 5,

  // Unit: multiplier applied to raw media cost.
  // Example: 1.18 means 18% is added for lifecycle, support, operations, and overhead.
  tcoMultiplier: 1.18,

  // Unit: USD per TB across the modeled time horizon above.
  // The engine scales these inputs to PB internally using TB_PER_PB.
  // These are illustrative placeholder assumptions, not Scality pricing.
  mediaCostPerTB: {
    flash: 1_650,
    hdd: 360,
    tape: 120,
  },
} as const;
