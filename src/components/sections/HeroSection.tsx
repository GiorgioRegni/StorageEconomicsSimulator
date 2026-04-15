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
    <header className="px-6 pb-4 pt-4 sm:px-8 lg:px-12 lg:pt-5">
      <div className="mx-auto max-w-8xl">
        <div className="panel relative overflow-hidden px-5 py-5 sm:px-7 sm:py-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(71,169,255,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 grid-cols-3 grid-rows-3 gap-1 rounded-xl border border-white/10 bg-white/[0.06] p-1.5 shadow-panel">
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
                <span className="text-2xl font-semibold tracking-[-0.06em] text-white">
                  Scality
                </span>
              </div>
              <Badge>Autonomous Data Infrastructure</Badge>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
            >
              <div className="max-w-4xl">
                <p className="eyebrow">Built for intelligent data placement</p>
                <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                  Storage Economics Simulator
                </h1>
                <p className="mt-4 max-w-3xl text-xl tracking-[-0.03em] text-slate-100 sm:text-2xl">
                  Flash shortage is real. Your architecture should adapt.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={onExploreClick} icon={ArrowDownRight}>
                    Open calculator
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
                <div className="panel relative p-4 sm:p-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flash/70 to-transparent" />
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Decision proof
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    {[
                      "All-flash baseline",
                      "Hybrid placement",
                      "Lower flash dependency",
                    ].map((line) => (
                      <div
                        key={line}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-slate-200"
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
