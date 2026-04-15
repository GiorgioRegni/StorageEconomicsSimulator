import { Check } from "lucide-react";
import { formatCapacityPB, formatCurrencyPerUnit } from "../../lib/utils";
import { MixStackBar } from "../charts/MixStackBar";
import { AnimatedNumber } from "../ui/AnimatedNumber";

interface BaselineCardProps {
  capacityPB: number;
  baselineCost: number;
  formatCurrency: (value: number) => string;
}

export function BaselineCard({
  capacityPB,
  baselineCost,
  formatCurrency,
}: BaselineCardProps) {
  const baselineCostPerPB = capacityPB === 0 ? 0 : baselineCost / capacityPB;

  return (
    <article className="panel flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Baseline architecture</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            All Flash
          </h3>
        </div>
        <div className="rounded-full border border-flash/30 bg-flash/10 px-3 py-1.5 text-sm text-flash">
          100% flash
        </div>
      </div>

      <div className="mt-5">
        <MixStackBar mix={{ flash: 100, hdd: 0, tape: 0 }} compact />
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="text-sm text-slate-400">
          {formatCapacityPB(capacityPB)} deployed
        </div>
        <div className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
          <AnimatedNumber value={baselineCost} formatter={formatCurrency} />
        </div>
        <div className="mt-1 text-sm uppercase tracking-[0.24em] text-slate-500">
          5-year TCO
        </div>
        <div className="mt-3 text-sm text-slate-400">
          {formatCurrencyPerUnit(baselineCostPerPB)} per PB
        </div>
      </div>

      <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-200">
        {[
          "Highest flash dependency",
          "Highest media cost exposure",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <Check className="h-4 w-4 text-flash" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
