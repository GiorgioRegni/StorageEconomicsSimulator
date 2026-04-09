import { motion } from "framer-motion";
import { MediaKey, mediaOrder, mediaVisuals } from "../../data/media";

type Mix = Record<MediaKey, number>;

interface MixStackBarProps {
  mix: Mix;
  compact?: boolean;
}

export function MixStackBar({ mix, compact = false }: MixStackBarProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[220px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-4 ${
        compact ? "h-52" : "h-72"
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-4 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-x-6 bottom-6 top-6 flex flex-col justify-end overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,11,21,0.88),rgba(18,27,45,0.58))]">
        {mediaOrder.map((medium) => {
          const value = mix[medium];
          if (!value) {
            return null;
          }

          const mediumStyle = mediaVisuals[medium];

          return (
            <motion.div
              key={medium}
              animate={{ height: `${value}%`, opacity: 1 }}
              initial={{ height: 0, opacity: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: mediumStyle.gradient,
                boxShadow: mediumStyle.shadow,
              }}
              className="relative min-h-[6%] border-t border-white/10"
            >
              {!compact && value >= 18 ? (
                <span className="absolute left-3 top-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/70">
                  {mediumStyle.label}
                </span>
              ) : null}
            </motion.div>
          );
        })}
      </div>
      <div className="absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

