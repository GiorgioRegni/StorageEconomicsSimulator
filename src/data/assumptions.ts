// Edit this file to tune the economics model used across the app.
// All media pricing and high-level TCO assumptions live here.
export const TB_PER_PB = 1_000;
export const PB_PER_EB = 1_000;
export const MIN_CAPACITY_PB = 1;
export const MAX_CAPACITY_PB = 10 * PB_PER_EB;

export const modelAssumptions = {
  // Unit: years.
  // The simulator presents a single multi-year TCO view derived from annualized
  // raw-capacity CAPEX assumptions.
  horizonYears: 5,

  // Unit: multiplier applied to raw media cost.
  // Example: 1.18 means 18% is added for lifecycle, support, operations, and overhead.
  tcoMultiplier: 1.18,

  // Unit: USD per TB raw per year.
  // The economics engine multiplies these annualized CAPEX inputs by horizonYears,
  // then scales to PB internally using TB_PER_PB.
  mediaCostPerTBRawYear: {
    // Mainstream TLC only, modeled at HDD x 12. NL-SSD, QLC, and high-perf TLC
    // are intentionally not modeled in v1.
    flash: 31.7,

    // 7-year refresh economics.
    hdd: 2.64,

    // 30-year LTO-10 refresh economics, with drives and library included.
    tape: 0.63,
  },
} as const;
