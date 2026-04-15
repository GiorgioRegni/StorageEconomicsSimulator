import { PB_PER_EB } from "../data/assumptions";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrencyCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCurrencyPerUnit(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCapacityPB(value: number) {
  if (value >= PB_PER_EB) {
    const exabytes = value / PB_PER_EB;

    return `${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: exabytes >= 10 ? 0 : 1,
    }).format(exabytes)} EB`;
  }

  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value)} PB`;
}
