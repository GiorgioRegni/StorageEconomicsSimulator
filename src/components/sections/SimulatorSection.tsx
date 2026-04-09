import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";
import { SimulatorState } from "../../hooks/useSimulator";
import { AssumptionFootnote } from "../ui/AssumptionFootnote";
import { BaselineCard } from "../simulator/BaselineCard";
import { HybridResultCard } from "../simulator/HybridResultCard";
import { MixControlsCard } from "../simulator/MixControlsCard";
import { SavingsComparisonChart } from "../charts/SavingsComparisonChart";

interface SimulatorSectionProps {
  simulator: SimulatorState;
}

export const SimulatorSection = forwardRef<HTMLElement, SimulatorSectionProps>(
  function SimulatorSection({ simulator }, ref) {
    return (
      <section ref={ref} className="px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-8xl">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Interactive model</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Put the right tier under the right bytes.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Start from all-flash. Reallocate the estate across flash, HDD, and
              optional tape. The model stays intentionally simple so the cost
              story stays obvious.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.18fr_0.92fr]">
            <BaselineCard
              capacityPB={simulator.capacityPB}
              baselineCost={simulator.metrics.baselineCost}
              formatCurrency={simulator.formatCurrency}
            />
            <MixControlsCard simulator={simulator} />
            <HybridResultCard simulator={simulator} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="panel p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Comparison</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                    All-flash baseline vs Scality hybrid
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                  5-year illustrative TCO
                </div>
              </div>
              <div className="mt-6">
                <SavingsComparisonChart
                  baselineCost={simulator.metrics.baselineCost}
                  hybridCost={simulator.metrics.hybridCost}
                />
              </div>
            </div>

            <div className="panel p-6 sm:p-8">
              <p className="eyebrow">Workload advisory</p>
              <div className="mt-5 space-y-3">
                {simulator.notes.map((note) => (
                  <div
                    key={note}
                    className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-tape" />
                    <p className="text-sm leading-6 text-slate-200">{note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-6">
                <AssumptionFootnote />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

