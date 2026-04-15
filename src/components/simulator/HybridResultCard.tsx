import { Check } from "lucide-react";
import { SimulatorState } from "../../hooks/useSimulator";
import { formatCurrencyPerUnit } from "../../lib/utils";
import { MixStackBar } from "../charts/MixStackBar";
import { AnimatedNumber } from "../ui/AnimatedNumber";

interface HybridResultCardProps {
  simulator: SimulatorState;
}

export function HybridResultCard({ simulator }: HybridResultCardProps) {
  const hybridCostPerPB =
    simulator.capacityPB === 0
      ? 0
      : simulator.metrics.hybridCost / simulator.capacityPB;

  return (
    <article className="panel relative flex h-full flex-col overflow-hidden p-5 sm:p-6">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(71,169,255,0.16),transparent_72%)] blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Outcome</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            Scality Hybrid
          </h3>
        </div>
        <div className="rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm text-success">
          {simulator.metrics.savingsPercent.toFixed(0)}% savings
        </div>
      </div>

      <div className="mt-5">
        <MixStackBar mix={simulator.mix} compact />
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="text-sm text-slate-400">Scality hybrid TCO</div>
        <div className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
          <AnimatedNumber
            value={simulator.metrics.hybridCost}
            formatter={simulator.formatCurrency}
          />
        </div>
        <div className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-success">
          <AnimatedNumber
            value={simulator.metrics.savingsPercent}
            formatter={(value) => `${Math.round(value)}%`}
          />
          <span className="ml-2">lower</span>
        </div>
        <div className="mt-3 rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-lg font-semibold tracking-[-0.02em] text-success">
          <AnimatedNumber
            value={simulator.metrics.savings}
            formatter={simulator.formatCurrency}
          />{" "}
          saved versus all-flash
        </div>
        <div className="mt-3 text-sm text-slate-400">
          {formatCurrencyPerUnit(hybridCostPerPB)} per PB
        </div>
      </div>

      <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-200">
        {[
          "Lower flash dependency",
          "Workload-aligned media placement",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <Check className="h-4 w-4 text-success" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
