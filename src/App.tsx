import { useRef } from "react";
import { AppShell } from "./app/AppShell";
import { CTAFooter } from "./components/sections/CTAFooter";
import { HeroSection } from "./components/sections/HeroSection";
import { MediaCharacteristicsSection } from "./components/sections/MediaCharacteristicsSection";
import { SavingsBand } from "./components/sections/SavingsBand";
import { SimulatorSection } from "./components/sections/SimulatorSection";
import { useSimulator } from "./hooks/useSimulator";

function App() {
  const simulatorRef = useRef<HTMLElement | null>(null);
  const simulator = useSimulator();

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AppShell>
      <HeroSection
        onExploreClick={scrollToSimulator}
        onCompareClick={scrollToSimulator}
      />
      <SimulatorSection ref={simulatorRef} simulator={simulator} />
      <SavingsBand simulator={simulator} />
      <MediaCharacteristicsSection />
      <CTAFooter
        onRerunModel={scrollToSimulator}
        onTalkToScality={scrollToSimulator}
      />
    </AppShell>
  );
}

export default App;
