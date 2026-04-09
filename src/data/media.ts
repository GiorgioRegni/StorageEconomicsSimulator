export type MediaKey = "flash" | "hdd" | "tape";

export const mediaOrder: MediaKey[] = ["flash", "hdd", "tape"];

export const mediaVisuals: Record<
  MediaKey,
  {
    label: string;
    color: string;
    gradient: string;
    shadow: string;
  }
> = {
  flash: {
    label: "Flash",
    color: "#47a9ff",
    gradient:
      "linear-gradient(180deg, rgba(102,194,255,1) 0%, rgba(53,131,255,0.96) 100%)",
    shadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 28px rgba(71,169,255,0.28)",
  },
  hdd: {
    label: "HDD",
    color: "#c6ced9",
    gradient:
      "linear-gradient(180deg, rgba(222,228,236,0.98) 0%, rgba(150,161,177,0.95) 100%)",
    shadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 0 18px rgba(198,206,217,0.18)",
  },
  tape: {
    label: "Tape",
    color: "#efb14d",
    gradient:
      "linear-gradient(180deg, rgba(255,214,110,0.98) 0%, rgba(216,139,23,0.95) 100%)",
    shadow: "inset 0 1px 0 rgba(255,255,255,0.28), 0 0 24px rgba(239,177,77,0.22)",
  },
};

export const mediaDefinitions = [
  {
    key: "flash" as const,
    label: "Flash",
    color: "#47a9ff",
    relativeCost: "Highest cost",
    relativeLatency: "Lowest latency",
    idealRole: "Performance tier for the hottest data",
    typicalValue: "Highest performance",
    summary:
      "Use where latency or throughput has to stay tight. This is the premium tier, not the universal default tier.",
  },
  {
    key: "hdd" as const,
    label: "HDD",
    color: "#c6ced9",
    relativeCost: "Balanced economics",
    relativeLatency: "Moderate latency",
    idealRole: "Broad-access capacity tier",
    typicalValue: "Balanced economics",
    summary:
      "Carry the bulk of general-purpose capacity when broad access matters more than headline flash density.",
  },
  {
    key: "tape" as const,
    label: "Tape",
    color: "#efb14d",
    relativeCost: "Lowest media cost",
    relativeLatency: "Highest latency",
    idealRole: "Long-term retention and disconnected copy",
    typicalValue: "Best long-term media economics",
    summary:
      "Compelling when retention, compliance, or offline copy needs outweigh the need for immediate access.",
  },
];
