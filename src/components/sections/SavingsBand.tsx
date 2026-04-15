import { motion } from "framer-motion";
import { Sparkles, TrendingDown, Zap } from "lucide-react";
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
  ];

  return (
    <section className="px-6 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-8xl">
        <div className="panel relative overflow-hidden px-5 py-4 sm:px-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flash/70 to-transparent" />
          <div className="relative z-10 grid gap-4 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
            <div>
              <p className="eyebrow">Why mix matters</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                Same data. Different economics.
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.08, duration: 0.55 }}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Icon className={`h-4 w-4 ${metric.className}`} />
                      {metric.label}
                    </div>
                    <div className={`mt-2 text-2xl font-semibold tracking-[-0.04em] ${metric.className}`}>
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
