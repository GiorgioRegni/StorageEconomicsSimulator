# Storage Economics Simulator

A self-contained React demo app for Scality that makes one point obvious:

You do not need flash everywhere. The right mix of flash, HDD, and optional tape can materially improve storage economics when the workload allows it.

The experience is designed as a polished marketing/demo application rather than a generic dashboard. It models all-flash as the baseline, compares it with a Scality hybrid architecture, and lets users adjust media ratios across backup, AI data lake, cloud, and custom scenarios.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5151`.

## Project structure

```text
src/
  app/
  components/
    charts/
    layout/
    sections/
    simulator/
    ui/
  data/
  hooks/
  lib/
  styles/
```

## How to tune the economics model

Edit only [`src/data/assumptions.ts`](/home/giorgio/Code/StorageEconomicsSimulator/src/data/assumptions.ts) for the cost model.

That file controls:

- 5-year TCO multiplier
- total capacity range, currently 1 PB to 10 EB
- mainstream TLC flash cost per TB raw per year
- HDD cost per TB raw per year
- tape cost per TB raw per year

Preset starting mixes and use-case narrative live in [`src/data/presets.ts`](/home/giorgio/Code/StorageEconomicsSimulator/src/data/presets.ts).

The calculation and slider rebalance logic live in [`src/lib/economics.ts`](/home/giorgio/Code/StorageEconomicsSimulator/src/lib/economics.ts).

## Where Firebase would plug in later

There is no backend requirement today. The app runs entirely on local state.

When Firebase is needed later, start with [`src/lib/firebase.ts`](/home/giorgio/Code/StorageEconomicsSimulator/src/lib/firebase.ts). That placeholder documents where Firebase initialization should live and keeps the current architecture ready for hooks or services to be layered in without refactoring the UI.

## Notes

- The economics model is illustrative, not real Scality pricing.
- The app intentionally keeps performance contextual rather than simulating a complex storage engine.
- Tape is presented as an optional economic lever for colder, long-term, or compliance-oriented data placement.
