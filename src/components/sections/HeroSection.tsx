import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  onExploreClick: () => void;
  onCompareClick: () => void;
}

export function HeroSection({
  onExploreClick,
  onCompareClick,
}: HeroSectionProps) {
  return (
    <header className="px-6 pb-10 pt-6 sm:px-8 lg:px-12 lg:pt-8">
      <div className="mx-auto max-w-8xl">
        <div className="panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(71,169,255,0.22),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_46%)]" />
          <div className="absolute inset-x-0 top-[5.5rem] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="relative z-10 flex flex-col gap-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 grid-cols-3 grid-rows-3 gap-1 rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-panel">
                  <span className="rounded-full bg-flash/90" />
                  <span className="rounded-full bg-hdd/85" />
                  <span className="rounded-full bg-tape/90" />
                  <span className="rounded-full bg-hdd/70" />
                  <span className="rounded-full bg-white/90" />
                  <span className="rounded-full bg-flash/75" />
                  <span className="rounded-full bg-tape/75" />
                  <span className="rounded-full bg-flash/65" />
                  <span className="rounded-full bg-hdd/65" />
                </div>
                <span className="text-3xl font-semibold tracking-[-0.06em] text-white">
                  Scality
                </span>
              </div>
              <Badge>Autonomous Data Infrastructure</Badge>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
            >
              <div className="max-w-4xl">
                <p className="eyebrow">Built for intelligent data placement</p>
                <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                  Storage Economics Simulator
                </h1>
                <p className="mt-6 max-w-3xl text-2xl tracking-[-0.03em] text-slate-100 sm:text-3xl">
                  Flash shortage is real. Your architecture should adapt.
                </p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Model how flash, HDD, and tape change the economics of
                  large-scale storage across backup, AI data lakes, and
                  cloud-scale workloads.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={onExploreClick} icon={ArrowDownRight}>
                    Explore the simulator
                  </Button>
                  <Button
                    onClick={onCompareClick}
                    variant="secondary"
                    icon={ArrowRight}
                  >
                    See Scality hybrid vs all-flash
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(71,169,255,0.24),transparent_42%)] blur-2xl" />
                <div className="panel relative p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flash/70 to-transparent" />
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Same data. Different economics.
                  </p>
                  <div className="mt-6 space-y-4">
                    {[
                      "All-flash is the baseline, not the answer.",
                      "Scality hybrid reduces flash dependency dramatically.",
                      "Tape becomes an economic lever when policy allows it.",
                    ].map((line) => (
                      <div
                        key={line}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-slate-200"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

