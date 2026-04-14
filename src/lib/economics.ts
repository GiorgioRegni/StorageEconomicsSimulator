import {
  MAX_CAPACITY_PB,
  MIN_CAPACITY_PB,
  modelAssumptions,
  TB_PER_PB,
} from "../data/assumptions";
import { MediaKey } from "../data/media";

export type UseCaseKey = "backup" | "aiDataLake" | "cloud" | "custom";

export interface MediaMix {
  flash: number;
  hdd: number;
  tape: number;
}

export function calculateEconomics(capacityPB: number, mix: MediaMix) {
  const mediaCostPerTB = {
    flash:
      modelAssumptions.mediaCostPerTBRawYear.flash *
      modelAssumptions.horizonYears,
    hdd:
      modelAssumptions.mediaCostPerTBRawYear.hdd *
      modelAssumptions.horizonYears,
    tape:
      modelAssumptions.mediaCostPerTBRawYear.tape *
      modelAssumptions.horizonYears,
  };

  const mediaCostPerPB = {
    flash: mediaCostPerTB.flash * TB_PER_PB,
    hdd: mediaCostPerTB.hdd * TB_PER_PB,
    tape: mediaCostPerTB.tape * TB_PER_PB,
  };

  const baselineCost =
    capacityPB *
    mediaCostPerPB.flash *
    modelAssumptions.tcoMultiplier;

  const hybridCost =
    capacityPB *
    (mix.flash / 100) *
    mediaCostPerPB.flash *
    modelAssumptions.tcoMultiplier +
    capacityPB *
      (mix.hdd / 100) *
      mediaCostPerPB.hdd *
      modelAssumptions.tcoMultiplier +
    capacityPB *
      (mix.tape / 100) *
      mediaCostPerPB.tape *
      modelAssumptions.tcoMultiplier;

  const savings = Math.max(baselineCost - hybridCost, 0);
  const savingsPercent = baselineCost === 0 ? 0 : (savings / baselineCost) * 100;
  const flashDependencyReduction = 100 - mix.flash;
  const activeMediaCount = [mix.flash, mix.hdd, mix.tape].filter(
    (value) => value > 0,
  ).length;

  return {
    baselineCost,
    hybridCost,
    savings,
    savingsPercent,
    flashDependencyReduction,
    activeMediaCount,
  };
}

export function clampCapacity(value: number) {
  if (!Number.isFinite(value)) {
    return 10;
  }

  return Math.min(
    MAX_CAPACITY_PB,
    Math.max(MIN_CAPACITY_PB, Math.round(value)),
  );
}

export function rebalanceMix(
  currentMix: MediaMix,
  changedMedium: MediaKey,
  nextValue: number,
  includeTape: boolean,
): MediaMix {
  const activeMedia: MediaKey[] = includeTape
    ? ["flash", "hdd", "tape"]
    : ["flash", "hdd"];

  if (!activeMedia.includes(changedMedium)) {
    return includeTape ? currentMix : { ...currentMix, tape: 0 };
  }

  const clamped = Math.min(100, Math.max(0, Math.round(nextValue)));
  const remaining = 100 - clamped;
  const otherMedia = activeMedia.filter((medium) => medium !== changedMedium);
  const allocated = allocateByWeight(
    remaining,
    otherMedia.map((medium) => ({
      medium,
      weight: currentMix[medium],
    })),
  );

  return {
    flash: changedMedium === "flash" ? clamped : allocated.flash ?? 0,
    hdd: changedMedium === "hdd" ? clamped : allocated.hdd ?? 0,
    tape: includeTape
      ? changedMedium === "tape"
        ? clamped
        : allocated.tape ?? 0
      : 0,
  };
}

export function removeTapeFromMix(mix: MediaMix): MediaMix {
  const allocated = allocateByWeight(100, [
    { medium: "flash", weight: mix.flash },
    { medium: "hdd", weight: mix.hdd },
  ]);

  return {
    flash: allocated.flash ?? 50,
    hdd: allocated.hdd ?? 50,
    tape: 0,
  };
}

export function getAdvisoryNotes(
  useCase: UseCaseKey,
  mix: MediaMix,
  includeTape: boolean,
) {
  const notes = [
    "Architecture choice matters more than chasing a one-tier design across every workload.",
  ];

  if (useCase === "aiDataLake" && mix.tape >= 15 && includeTape) {
    notes.push("Tape may not fit the active portion of this workflow.");
  }

  if (mix.flash <= 8) {
    notes.push(
      "Lowest-cost architecture may not align with hot-data access patterns.",
    );
  }

  if (useCase === "backup" && mix.tape > 0 && includeTape) {
    notes.push(
      "Tape can improve economics for long-term, compliant, or offline copy strategies.",
    );
  }

  if (useCase === "cloud" && mix.tape >= 20 && includeTape) {
    notes.push(
      "Cloud retention tiers can justify tape, but latency-sensitive paths should stay online.",
    );
  }

  if (!includeTape) {
    notes.push(
      "Tape is disabled, so the model assumes the architecture stays entirely online across flash and HDD.",
    );
  }

  return notes;
}

export function isMixEqual(left: MediaMix, right: MediaMix) {
  return (
    left.flash === right.flash &&
    left.hdd === right.hdd &&
    left.tape === right.tape
  );
}

function allocateByWeight(
  total: number,
  items: Array<{ medium: MediaKey; weight: number }>,
) {
  const result: Partial<Record<MediaKey, number>> = {};

  if (items.length === 0) {
    return result;
  }

  const weightTotal = items.reduce((sum, item) => sum + item.weight, 0);

  if (weightTotal === 0) {
    const base = Math.floor(total / items.length);
    let remainder = total - base * items.length;

    items.forEach((item) => {
      result[item.medium] = base + (remainder > 0 ? 1 : 0);
      remainder = Math.max(remainder - 1, 0);
    });

    return result;
  }

  const raw = items.map((item) => ({
    medium: item.medium,
    value: (total * item.weight) / weightTotal,
  }));

  let remainder =
    total - raw.reduce((sum, item) => sum + Math.floor(item.value), 0);

  raw
    .sort(
      (left, right) =>
        right.value - Math.floor(right.value) - (left.value - Math.floor(left.value)),
    )
    .forEach((item) => {
      const rounded = Math.floor(item.value) + (remainder > 0 ? 1 : 0);
      result[item.medium] = rounded;
      remainder = Math.max(remainder - 1, 0);
    });

  return result;
}
