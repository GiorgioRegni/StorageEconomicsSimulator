import { Archive, HardDrive, Zap } from "lucide-react";
import { mediaDefinitions } from "../../data/media";
import { SectionHeading } from "../layout/SectionHeading";

const iconMap = {
  flash: Zap,
  hdd: HardDrive,
  tape: Archive,
};

export function MediaCharacteristicsSection() {
  return (
    <section className="px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
      <div className="mx-auto max-w-8xl">
        <SectionHeading
          eyebrow="Architecture Insight"
          title="The question is not whether every byte can sit on flash. The question is which bytes should."
          description="Directional context matters more than false precision. Use media where it earns its keep: flash for heat, HDD for broad access, and tape when long-term economics and disconnected copy requirements justify colder placement."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {mediaDefinitions.map((medium) => {
              const Icon = iconMap[medium.key];

              return (
                <article
                  key={medium.key}
                  className="panel flex h-full flex-col justify-between p-6"
                >
                  <div>
                    <div
                      className="inline-flex rounded-2xl border border-white/10 p-3"
                      style={{
                        background: `linear-gradient(135deg, ${medium.color}22, rgba(255,255,255,0.04))`,
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: medium.color }} />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {medium.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {medium.summary}
                    </p>
                  </div>
                  <dl className="mt-8 space-y-4 text-sm">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <dt className="text-slate-400">Relative cost</dt>
                      <dd className="mt-1 text-white">{medium.relativeCost}</dd>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <dt className="text-slate-400">Relative latency</dt>
                      <dd className="mt-1 text-white">{medium.relativeLatency}</dd>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <dt className="text-slate-400">Ideal role</dt>
                      <dd className="mt-1 text-white">{medium.idealRole}</dd>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <dt className="text-slate-400">Typical value</dt>
                      <dd className="mt-1 text-white">{medium.typicalValue}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>

          <aside className="panel flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="eyebrow">Directional framing</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                Put expensive media where it earns its keep.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                This is architecture choice, not raw capacity theater. Workload
                fit, policy, retention, and recovery design determine which media
                should carry the active portion of the estate and which should
                carry the economics.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Highest performance belongs to the hottest and most latency-sensitive data.",
                "Balanced economics come from broad use of HDD for general-purpose capacity.",
                "Best long-term media economics appear when tape is aligned with retention and disconnected copy needs.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

