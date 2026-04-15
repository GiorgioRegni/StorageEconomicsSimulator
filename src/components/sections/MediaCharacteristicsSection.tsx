import { Archive, HardDrive, Zap } from "lucide-react";
import { mediaDefinitions } from "../../data/media";

const iconMap = {
  flash: Zap,
  hdd: HardDrive,
  tape: Archive,
};

export function MediaCharacteristicsSection() {
  return (
    <section className="px-6 py-5 sm:px-8 lg:px-12 lg:py-7">
      <div className="mx-auto max-w-8xl">
        <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Architecture insight</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Media roles
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {mediaDefinitions.map((medium) => {
            const Icon = iconMap[medium.key];

            return (
              <article
                key={medium.key}
                className="panel flex h-full flex-col p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="inline-flex rounded-xl border border-white/10 p-2.5"
                    style={{
                      background: `linear-gradient(135deg, ${medium.color}22, rgba(255,255,255,0.04))`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: medium.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">
                      {medium.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {medium.idealRole}.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  {[medium.relativeCost, medium.relativeLatency, medium.typicalValue].map(
                    (pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-slate-200"
                      >
                        {pill}
                      </span>
                    ),
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
