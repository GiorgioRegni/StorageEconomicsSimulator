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
      <section ref={ref} className="px-6 py-5 sm:px-8 lg:px-12 lg:py-7">
        <div className="mx-auto max-w-8xl">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Interactive model</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                Put expensive media where it earns its keep.
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
              5-year illustrative TCO
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.86fr_1.18fr_0.96fr]">
            <BaselineCard
              capacityPB={simulator.capacityPB}
              baselineCost={simulator.metrics.baselineCost}
              formatCurrency={simulator.formatCurrency}
            />
            <MixControlsCard simulator={simulator} />
            <HybridResultCard simulator={simulator} />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="panel p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Comparison</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
                    All-flash baseline vs Scality hybrid
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <SavingsComparisonChart
                  baselineCost={simulator.metrics.baselineCost}
                  hybridCost={simulator.metrics.hybridCost}
                />
              </div>
            </div>

            <div className="panel p-5 sm:p-6">
              <p className="eyebrow">Workload advisory</p>
              <div className="mt-4 space-y-2">
                {simulator.notes.slice(0, 2).map((note) => (
                  <div
                    key={note}
                    className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-tape" />
                    <p className="text-sm leading-6 text-slate-200">{note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <AssumptionFootnote />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);
