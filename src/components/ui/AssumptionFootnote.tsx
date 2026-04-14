import { modelAssumptions } from "../../data/assumptions";

export function AssumptionFootnote() {
  return (
    <div className="space-y-2 text-sm leading-6 text-slate-400">
      <p>
        Illustrative model only. Actual economics depend on workload, policy,
        density, media pricing, and deployment design.
      </p>
      <p>
        This demo uses annualized $/TB raw CAPEX inputs over a{" "}
        {modelAssumptions.horizonYears}-year TCO lens, then applies a blended
        lifecycle multiplier of {modelAssumptions.tcoMultiplier.toFixed(2)}x
        across mainstream TLC flash, HDD, and tape.
      </p>
    </div>
  );
}
