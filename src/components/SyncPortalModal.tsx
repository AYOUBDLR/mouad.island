import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Play, RefreshCw, X } from 'lucide-react';
import { WATCH_REDIRECT_URL } from '../data/loveIslandData';

interface SyncPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConfettiPiece {
  id: number;
  left: string;
  top: string;
  color: string;
  rotate: number;
  width: number;
  height: number;
  delay: number;
}

const CONFETTI_COLORS = ['#2563eb', '#0ea5e9', '#38bdf8', '#60a5fa', '#e2e8f0'];

export default function SyncPortalModal({
  isOpen,
  onClose,
}: SyncPortalModalProps) {
  const [progress, setProgress] = useState(0);

  const confettiPieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${8 + ((i * 19) % 84)}%`,
      top: `${4 + ((i * 13) % 34)}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotate: (i * 37) % 180,
      width: i % 3 === 0 ? 10 : 7,
      height: i % 2 === 0 ? 5 : 9,
      delay: (i % 6) * 0.12,
    }));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setProgress(0);

    const start = performance.now();
    const duration = 2400;
    let rafId = 0;
    let redirectTimer: number | undefined;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        redirectTimer = window.setTimeout(() => {
          window.location.assign(WATCH_REDIRECT_URL);
        }, 550);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (redirectTimer) window.clearTimeout(redirectTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const step1Done = progress >= 30;
  const step2Done = progress >= 65;
  const step3Done = progress >= 98;

  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset =
    ringCircumference - (progress / 100) * ringCircumference;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portal-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[540px] overflow-hidden rounded-3xl border border-blue-500/20 bg-[#080b14] p-6 sm:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close watch modal"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex flex-col items-center pt-4 pb-2 text-center">
              {/* Confetti particles */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-44 overflow-hidden"
                aria-hidden="true"
              >
                {confettiPieces.map((piece) => (
                  <motion.span
                    key={piece.id}
                    initial={{ opacity: 0, y: -8, rotate: piece.rotate }}
                    animate={{
                      opacity: [0, 0.95, 0.85],
                      y: [0, 14, 24],
                      rotate: piece.rotate + 45,
                    }}
                    transition={{
                      duration: 1.8,
                      delay: piece.delay,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      left: piece.left,
                      top: piece.top,
                      width: piece.width,
                      height: piece.height,
                      backgroundColor: piece.color,
                    }}
                    className="absolute rounded-[2px]"
                  />
                ))}
              </div>

              {/* Circular blue progress ring */}
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <svg
                  className="h-24 w-24 -rotate-90"
                  viewBox="0 0 96 96"
                  aria-hidden="true"
                >
                  <circle
                    cx="48"
                    cy="48"
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(37, 99, 235, 0.2)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={ringRadius}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-[stroke-dashoffset] duration-75"
                  />
                </svg>
                {progress >= 100 ? (
                  <Play className="absolute h-7 w-7 fill-sky-400 text-sky-400 translate-x-[1px]" />
                ) : (
                  <RefreshCw className="absolute h-7 w-7 animate-spin text-sky-400" />
                )}
              </div>

              <h2
                id="portal-modal-title"
                className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.22em] text-white"
              >
                {progress >= 100 ? 'STREAM READY...' : 'SYNCING STREAM...'}
              </h2>
              <p className="mt-2 font-mono text-sm text-slate-300 tabular-nums">
                Allocating high-speed stream mirrors ({progress}%)
              </p>

              {/* 3-Step Verification Checklist Box */}
              <div className="mt-7 w-full rounded-2xl border border-white/10 bg-[#0b0f1b] p-5 text-left">
                <ul className="space-y-4">
                  {[
                    {
                      done: step1Done,
                      label: 'ESTABLISHING SECURE TLS STREAM ALLOCATION...',
                    },
                    {
                      done: step2Done,
                      label: 'CONNECTING LOVE ISLAND AUSTRALIA STREAM NODE...',
                    },
                    {
                      done: step3Done,
                      label: 'GENERATING DIRECT WATCH NOW TUNNEL...',
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3.5">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                          item.done
                            ? 'bg-blue-600 text-white shadow-[0_0_16px_rgba(37,99,235,0.6)]'
                            : 'border border-white/20 bg-white/5 text-slate-500'
                        }`}
                      >
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </span>
                      <span
                        className={`font-mono text-xs sm:text-[13px] font-bold tracking-wider transition-colors ${
                          item.done ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Horizontal Gradient Progress Bar */}
              <div className="mt-7 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Status */}
              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.14em] text-slate-400">
                <RefreshCw
                  className={`h-3.5 w-3.5 text-sky-400 ${
                    progress < 100 ? 'animate-spin' : ''
                  }`}
                />
                <span>REDIRECTING TO WATCH NOW NODE SECURELY...</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
