import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

interface CTAFooterProps {
  onRerunModel: () => void;
  onTalkToScality: () => void;
}

export function CTAFooter({
  onRerunModel,
  onTalkToScality,
}: CTAFooterProps) {
  return (
    <footer className="px-6 pb-10 pt-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-8xl">
        <div className="panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flash/70 to-transparent" />
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(71,169,255,0.16),transparent_72%)] blur-2xl" />
          <p className="eyebrow">Scality</p>
          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Design for the workload, not for the headline spec.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Intelligent data placement changes the cost curve without forcing
                a one-tier architecture onto every byte.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={onRerunModel} icon={RotateCcw}>
                Re-run the model
              </Button>
              <Button
                onClick={onTalkToScality}
                variant="secondary"
                icon={ArrowRight}
              >
                Talk to Scality
              </Button>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">
            Scality • Autonomous Data Infrastructure • Built for intelligent data
            placement
          </div>
        </div>
      </div>
    </footer>
  );
}

