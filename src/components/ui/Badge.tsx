import { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm tracking-[0.16em] text-slate-200">
      {children}
    </div>
  );
}

