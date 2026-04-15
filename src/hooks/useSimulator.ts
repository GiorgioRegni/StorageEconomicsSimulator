import { useState } from "react";
import { MediaKey } from "../data/media";
import { useCasePresets } from "../data/presets";
import {
  UseCaseKey,
  calculateEconomics,
  clampCapacity,
  getCapacityStepPB,
  getAdvisoryNotes,
  isMixEqual,
  rebalanceMix,
  removeTapeFromMix,
  type MediaMix,
} from "../lib/economics";
import { formatCurrencyCompact } from "../lib/utils";

const backupPreset = useCasePresets.find((preset) => preset.key === "backup")!;

export interface SimulatorState {
  selectedUseCase: UseCaseKey;
  capacityPB: number;
  capacityStepPB: number;
  mix: MediaMix;
  includeTape: boolean;
  metrics: ReturnType<typeof calculateEconomics>;
  notes: string[];
  canReset: boolean;
  formatCurrency: (value: number) => string;
  selectUseCase: (useCase: UseCaseKey) => void;
  updateCapacity: (value: number) => void;
  updateMedium: (medium: MediaKey, value: number) => void;
  toggleTape: (enabled: boolean) => void;
  resetToPreset: () => void;
}

export function useSimulator(): SimulatorState {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseKey>("backup");
  const [capacityPB, setCapacityPB] = useState(backupPreset.defaultCapacityPB);
  const [mix, setMix] = useState<MediaMix>(backupPreset.mix);
  const [includeTape, setIncludeTape] = useState(backupPreset.includeTape);

  const activePreset =
    useCasePresets.find((preset) => preset.key === selectedUseCase) ?? backupPreset;
  const metrics = calculateEconomics(capacityPB, mix);
  const capacityStepPB = getCapacityStepPB(capacityPB);
  const notes = getAdvisoryNotes(selectedUseCase, mix, includeTape);
  const canReset =
    selectedUseCase !== "custom" &&
    (!isMixEqual(mix, activePreset.mix) ||
      capacityPB !== activePreset.defaultCapacityPB ||
      includeTape !== activePreset.includeTape);

  const applyPreset = (useCase: UseCaseKey) => {
    const preset = useCasePresets.find((item) => item.key === useCase);
    if (!preset) {
      return;
    }

    if (useCase === "custom") {
      setSelectedUseCase("custom");
      return;
    }

    setSelectedUseCase(useCase);
    setCapacityPB(preset.defaultCapacityPB);
    setMix(preset.mix);
    setIncludeTape(preset.includeTape);
  };

  const updateMedium = (medium: MediaKey, value: number) => {
    setMix((currentMix) => rebalanceMix(currentMix, medium, value, includeTape));
  };

  const toggleTape = (enabled: boolean) => {
    setIncludeTape(enabled);
    if (!enabled) {
      setMix((currentMix) => removeTapeFromMix(currentMix));
    }
  };

  const resetToPreset = () => {
    applyPreset(selectedUseCase);
  };

  return {
    selectedUseCase,
    capacityPB,
    capacityStepPB,
    mix,
    includeTape,
    metrics,
    notes,
    canReset,
    formatCurrency: formatCurrencyCompact,
    selectUseCase: applyPreset,
    updateCapacity: (value) => setCapacityPB(clampCapacity(value)),
    updateMedium,
    toggleTape,
    resetToPreset,
  };
}
