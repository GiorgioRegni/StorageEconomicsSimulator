import { MediaMix, UseCaseKey } from "../lib/economics";

export interface UseCasePreset {
  key: UseCaseKey;
  label: string;
  mix: MediaMix;
  includeTape: boolean;
  defaultCapacityPB: number;
  rationale: string;
  bestFit: string[];
}

export const useCasePresets: UseCasePreset[] = [
  {
    key: "backup",
    label: "Backup",
    mix: { flash: 10, hdd: 50, tape: 40 },
    includeTape: true,
    defaultCapacityPB: 10,
    rationale:
      "Backup does not need the same premium media profile as active production data. A small flash landing tier, broad HDD capacity, and optional tape for long-term copies shifts the economics materially.",
    bestFit: [
      "Long-term retention",
      "Compliance-oriented copy strategy",
      "Offline or air-gapped recovery posture",
    ],
  },
  {
    key: "aiDataLake",
    label: "AI Data Lake",
    mix: { flash: 35, hdd: 65, tape: 0 },
    includeTape: false,
    defaultCapacityPB: 12,
    rationale:
      "AI data lakes often need a faster active tier than backup, but they still benefit from moving colder or less frequently used data off flash. HDD usually carries the economic center of gravity.",
    bestFit: [
      "Active model training datasets",
      "Broad-access analytics repositories",
      "Large but mostly online data estates",
    ],
  },
  {
    key: "cloud",
    label: "Cloud",
    mix: { flash: 20, hdd: 70, tape: 10 },
    includeTape: true,
    defaultCapacityPB: 15,
    rationale:
      "Cloud-scale storage benefits from balancing hot-path responsiveness with capacity efficiency. Tape enters when retention-heavy services or compliance policies allow colder placement.",
    bestFit: [
      "General-purpose object services",
      "Retention-heavy tenant fleets",
      "Workloads with both hot and colder data bands",
    ],
  },
  {
    key: "custom",
    label: "Custom Architecture",
    mix: { flash: 20, hdd: 60, tape: 20 },
    includeTape: true,
    defaultCapacityPB: 10,
    rationale:
      "Use customer-specific modeling when policy, data temperature, or service objectives do not map cleanly to the baseline presets.",
    bestFit: [
      "Workshops and discovery calls",
      "Policy-driven placement design",
      "Customer-specific economics scenarios",
    ],
  },
];

