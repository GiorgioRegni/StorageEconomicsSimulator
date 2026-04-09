import { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 text-mist">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(71,169,255,0.18),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(239,177,77,0.08),transparent_22%),linear-gradient(180deg,#050811_0%,#07111d_32%,#050811_100%)]" />
        <div className="absolute inset-0 bg-grid-fade bg-[size:80px_80px] opacity-[0.08]" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(71,169,255,0.28)_0%,rgba(71,169,255,0.08)_28%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(71,169,255,0.12)_0%,transparent_72%)] blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

