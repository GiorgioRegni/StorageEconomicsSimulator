import { BrainCircuit, Cloud, RotateCcw, ShieldCheck, SlidersHorizontal } from "lucide-react";
import {
  MAX_CAPACITY_PB,
  MIN_CAPACITY_PB,
} from "../../data/assumptions";
import { useCasePresets } from "../../data/presets";
import { MediaKey } from "../../data/media";
import { SimulatorState } from "../../hooks/useSimulator";
import { formatCapacityPB } from "../../lib/utils";

interface MixControlsCardProps {
  simulator: SimulatorState;
}

const iconMap = {
  backup: ShieldCheck,
  aiDataLake: BrainCircuit,
  cloud: Cloud,
  custom: SlidersHorizontal,
};

export function MixControlsCard({ simulator }: MixControlsCardProps) {
  return (
    <article className="panel flex h-full flex-col p-6 sm:p-8">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-6">
        <div>
          <p className="eyebrow">Control plane</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
            Media Mix Control
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {useCasePresets.map((preset) => {
            const Icon = iconMap[preset.key];
            const isActive = simulator.selectedUseCase === preset.key;

            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => simulator.selectUseCase(preset.key)}
                className={`focus-ring rounded-2xl border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-flash/50 bg-flash/10 shadow-flash"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {preset.label}
                  </span>
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                  {preset.key === "custom"
                    ? "Customer-specific model"
                    : `${preset.mix.flash}/${preset.mix.hdd}/${preset.mix.tape}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Total capacity</p>
              <div className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                {formatCapacityPB(simulator.capacityPB)}
              </div>
            </div>
            <label className="text-sm text-slate-300">
              <span className="sr-only">Capacity in PB</span>
              <input
                aria-label="Capacity in petabytes"
                type="number"
                min={MIN_CAPACITY_PB}
                max={MAX_CAPACITY_PB}
                value={simulator.capacityPB}
                onChange={(event) =>
                  simulator.updateCapacity(Number(event.target.value))
                }
                className="focus-ring w-24 rounded-xl border border-white/10 bg-ink-900 px-3 py-2 text-right text-white"
              />
            </label>
          </div>
          <input
            aria-label="Total capacity slider"
            type="range"
            min={MIN_CAPACITY_PB}
            max={MAX_CAPACITY_PB}
            step={1}
            value={simulator.capacityPB}
            onChange={(event) =>
              simulator.updateCapacity(Number(event.target.value))
            }
            className="slider mt-5 w-full"
            style={{
              ["--slider-color" as string]: "#47a9ff",
              ["--fill" as string]: `${
                ((simulator.capacityPB - MIN_CAPACITY_PB) /
                  (MAX_CAPACITY_PB - MIN_CAPACITY_PB)) *
                100
              }%`,
            }}
          />
          <div className="mt-2 flex justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
            <span>{formatCapacityPB(MIN_CAPACITY_PB)}</span>
            <span>{formatCapacityPB(MAX_CAPACITY_PB)}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-400">
            Selection snaps to {formatCapacityPB(simulator.capacityStepPB)} steps
            at this scale.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Include tape</p>
              <p className="mt-1 text-sm text-slate-300">
                Use tape where the workload can tolerate colder tiers.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={simulator.includeTape}
              onClick={() => simulator.toggleTape(!simulator.includeTape)}
              className={`focus-ring relative inline-flex h-8 w-14 items-center rounded-full border transition ${
                simulator.includeTape
                  ? "border-tape/40 bg-tape/20"
                  : "border-white/10 bg-white/[0.06]"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 rounded-full bg-white shadow transition ${
                  simulator.includeTape ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <SliderRow
              label="Flash"
              medium="flash"
              color="#47a9ff"
              value={simulator.mix.flash}
              onChange={simulator.updateMedium}
            />
            <SliderRow
              label="HDD"
              medium="hdd"
              color="#c6ced9"
              value={simulator.mix.hdd}
              onChange={simulator.updateMedium}
            />
            <SliderRow
              label="Tape"
              medium="tape"
              color="#efb14d"
              value={simulator.mix.tape}
              onChange={simulator.updateMedium}
              disabled={!simulator.includeTape}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-sm text-white">Adjust your architecture</p>
          <p className="mt-1 text-sm text-slate-400">
            Ratios rebalance automatically to keep the mix at 100%.
          </p>
        </div>
        <button
          type="button"
          onClick={simulator.resetToPreset}
          disabled={!simulator.canReset}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to preset
        </button>
      </div>
    </article>
  );
}

interface SliderRowProps {
  label: string;
  medium: MediaKey;
  color: string;
  value: number;
  onChange: (medium: MediaKey, value: number) => void;
  disabled?: boolean;
}

function SliderRow({
  label,
  medium,
  color,
  value,
  onChange,
  disabled = false,
}: SliderRowProps) {
  return (
    <div className={disabled ? "opacity-50" : ""}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <label className="text-base font-medium text-white" htmlFor={medium}>
          {label}
        </label>
        <span
          className="rounded-full border border-white/10 px-3 py-1 text-sm font-medium text-white"
          style={{ backgroundColor: `${color}1c` }}
        >
          {value}%
        </span>
      </div>
      <input
        id={medium}
        aria-label={`${label} percentage`}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(medium, Number(event.target.value))}
        className="slider w-full"
        style={{
          ["--slider-color" as string]: color,
          ["--fill" as string]: `${value}%`,
        }}
      />
    </div>
  );
}
