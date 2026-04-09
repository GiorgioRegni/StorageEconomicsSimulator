import { ButtonHTMLAttributes, ElementType } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: ElementType;
}

export function Button({
  children,
  className,
  variant = "primary",
  icon: Icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-300",
        variant === "primary"
          ? "bg-white text-ink-950 hover:bg-slate-200"
          : "border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </button>
  );
}

