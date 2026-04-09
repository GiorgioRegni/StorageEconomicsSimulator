import { motion } from "framer-motion";
import { BrainCircuit, Cloud, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useCasePresets } from "../../data/presets";
import { UseCaseKey } from "../../lib/economics";
import { SectionHeading } from "../layout/SectionHeading";

interface UseCaseCardsSectionProps {
  activeUseCase: UseCaseKey;
  onSelectUseCase: (useCase: UseCaseKey) => void;
}

const iconMap = {
  backup: ShieldCheck,
  aiDataLake: BrainCircuit,
  cloud: Cloud,
  custom: SlidersHorizontal,
};

export function UseCaseCardsSection({
  activeUseCase,
  onSelectUseCase,
}: UseCaseCardsSectionProps) {
  return (
    <section className="px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
      <div className="mx-auto max-w-8xl">
        <SectionHeading
          eyebrow="Use-case fit"
          title="Different workloads deserve different media profiles."
          description="These presets are directional starting points. They frame why backup, AI data lakes, cloud services, and customer-specific architectures should not inherit the same flash footprint by default."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {useCasePresets.map((preset, index) => {
            const Icon = iconMap[preset.key];
            const isActive = preset.key === activeUseCase;

            return (
              <motion.button
                type="button"
                key={preset.key}
                onClick={() => onSelectUseCase(preset.key)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className={`panel text-left transition duration-300 ${
                  isActive
                    ? "border-flash/50 bg-[linear-gradient(180deg,rgba(71,169,255,0.12),rgba(255,255,255,0.05))] shadow-flash"
                    : "hover:border-white/20 hover:bg-white/[0.06]"
                } p-6`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="rounded-2xl border border-white/10 p-3"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(71,169,255,0.22), rgba(255,255,255,0.04))"
                        : "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                    }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                    {preset.mix.flash}/{preset.mix.hdd}/{preset.mix.tape}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {preset.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {preset.rationale}
                </p>
                <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Best fit for
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    {preset.bestFit.map((item) => (
                      <p key={item}>• {item}</p>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

