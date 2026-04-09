import { motion } from "framer-motion";
import { Layers3, Sparkles, TrendingDown, Zap } from "lucide-react";
import { SimulatorState } from "../../hooks/useSimulator";
import { AnimatedNumber } from "../ui/AnimatedNumber";

interface SavingsBandProps {
  simulator: SimulatorState;
}

export function SavingsBand({ simulator }: SavingsBandProps) {
  const metrics = [
    {
      label: "Cost reduction",
      icon: TrendingDown,
      className: "text-success",
      value: (
        <AnimatedNumber
          value={simulator.metrics.savingsPercent}
          formatter={(value) => `${Math.round(value)}%`}
        />
      ),
    },
    {
      label: "Dollar savings",
      icon: Sparkles,
      className: "text-flash",
      value: (
        <AnimatedNumber
          value={simulator.metrics.savings}
          formatter={simulator.formatCurrency}
        />
      ),
    },
    {
      label: "Flash dependency reduction",
      icon: Zap,
      className: "text-flash",
      value: (
        <AnimatedNumber
          value={simulator.metrics.flashDependencyReduction}
          formatter={(value) => `${Math.round(value)}%`}
        />
      ),
    },
    {
      label: "Media tiers in play",
      icon: Layers3,
      className: "text-tape",
      value: <span>{simulator.metrics.activeMediaCount} / 3</span>,
    },
  ];

  return (
    <section className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-8xl">
        <div className="panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flash/70 to-transparent" />
          <div className="absolute left-1/2 top-0 h-32 w-[40rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(71,169,255,0.22)_0%,transparent_70%)] blur-3xl" />
          <div className="relative z-10">
            <div className="max-w-2xl">
              <p className="eyebrow">Why mix matters</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Same data. Different economics.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.08, duration: 0.55 }}
                    className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Icon className={`h-4 w-4 ${metric.className}`} />
                      {metric.label}
                    </div>
                    <div className={`mt-5 text-3xl font-semibold tracking-[-0.04em] ${metric.className}`}>
                      {metric.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

