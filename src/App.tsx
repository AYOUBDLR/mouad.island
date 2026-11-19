import { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Flame,
  Play,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { WATCH_STEPS } from './data/loveIslandData';
import SyncPortalModal from './components/SyncPortalModal';

const EMBLEM_IMAGE_PATH = 'https://i.postimg.cc/FHH0xfMf/images.jpg';
const VILLA_PREVIEW_PATH = 'https://i.postimg.cc/1558kkJJ/images.jpg';

export default function App() {
  const [activeStepHint, setActiveStepHint] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [previewError, setPreviewError] = useState<boolean>(false);

  const handleOpenWatchModal = () => {
    setActiveStepHint(3);
    setIsModalOpen(true);
  };

  const handleStepClick = (stepNumber: number) => {
    setActiveStepHint(stepNumber);
    handleOpenWatchModal();
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#04060c] text-white">
      {/* Atmospheric blurred dark-blue backdrop */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {!previewError && (
          <img
            src={VILLA_PREVIEW_PATH}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setPreviewError(true)}
            className="h-full w-full scale-110 object-cover opacity-15 blur-3xl saturate-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04060c]/90 via-[#050914]/80 to-[#04060c]" />
        <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px]" />
      </div>

      {/* Main Centered Portal Container */}
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[600px] flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <article className="w-full overflow-hidden rounded-[28px] border border-blue-500/20 bg-[#080b14]/95 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.9)]">
          {/* Top Striped Black & Blue Banner */}
          <div className="portal-stripe-banner flex items-center justify-center gap-2 border-b border-blue-400/20 px-4 py-2.5 text-center">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-sky-300" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.14em] text-white uppercase drop-shadow-sm">
              EXCLUSIVE LOVE ISLAND AUSTRALIA WATCH PORTAL
            </span>
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-sky-300" aria-hidden="true" />
          </div>

          {/* Portal Inner Body */}
          <div className="flex flex-col items-center px-5 pt-8 pb-7 sm:px-8 sm:pt-10 sm:pb-9">
            {/* Circular Glowing Emblem + Verified Blue Checkmark */}
            <div className="relative mb-6">
              <div className="portal-glow-ring rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-[3.5px]">
                <div className="h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full bg-[#0b101d]">
                  {!avatarError ? (
                    <img
                      src={EMBLEM_IMAGE_PATH}
                      alt="Love Island Australia emblem"
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600/30 to-sky-500/30">
                      <Flame className="h-10 w-10 text-sky-400" />
                    </div>
                  )}
                </div>
              </div>

              <span
                title="Verified Watch Portal"
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#080b14] bg-blue-600 text-white shadow-md"
              >
                <Check className="h-4 w-4 stroke-[3]" />
              </span>
            </div>

            {/* Hero Serif Title */}
            <h1 className="text-balance text-center font-serif text-[34px] leading-[1.08] font-extrabold tracking-tight text-white sm:text-[42px]">
              LOVE ISLAND AUSTRALIA
            </h1>

            {/* Clean Unboxed Metadata Line */}
            <p className="mt-3 text-center font-mono text-xs sm:text-[13px] text-slate-300">
              All Seasons (2018–2025)
              <span className="mx-2 text-slate-500" aria-hidden="true">
                ·
              </span>
              Hosted by Sophie Monk
              <span className="mx-2 text-slate-500" aria-hidden="true">
                ·
              </span>
              HD Stream
            </p>

            {/* Dark Sapphire Availability Bar */}
            <div className="mt-5 flex items-center gap-2.5 rounded-full border border-blue-500/35 bg-[#071428] px-4 py-2 text-sky-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase">
                FAST STREAMING MIRROR • WATCH NOW
              </span>
            </div>

            {/* Preview Image Card */}
            <div className="group relative mt-6 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1b]">
              <div className="aspect-[16/9] w-full overflow-hidden">
                {!previewError ? (
                  <img
                    src={VILLA_PREVIEW_PATH}
                    alt="Love Island Australia preview"
                    referrerPolicy="no-referrer"
                    onError={() => setPreviewError(true)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#091224] via-[#0b0f1b] to-[#0d1c33] p-6 text-center">
                    <Flame className="mb-2 h-9 w-9 text-sky-400" />
                    <span className="font-serif text-lg font-bold text-white">
                      Love Island Australia
                    </span>
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div>
                  <p className="font-mono text-[11px] font-semibold tracking-wider text-sky-400 uppercase">
                    Mallorca, Spain
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Love Island Australia — Full Episodes &amp; Villa Specials
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenWatchModal}
                  aria-label="Watch Now"
                  className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Play className="h-4 w-4 fill-current translate-x-[1px]" />
                </button>
              </div>
            </div>

            {/* Primary Gradient CTA Button — Watch Now Only */}
            <button
              type="button"
              onClick={handleOpenWatchModal}
              className="cta-glow mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 px-6 py-4 text-base sm:text-lg font-extrabold tracking-wide text-white transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b14]"
            >
              <Play className="h-5 w-5 shrink-0 fill-current" />
              <span className="whitespace-nowrap">WATCH NOW</span>
            </button>

            <p className="mt-3 text-center font-mono text-[11px] font-semibold tracking-[0.14em] text-sky-400 uppercase">
              START STREAMING LOVE ISLAND AUSTRALIA IMMEDIATELY
            </p>

            {/* EASY 3-STEP WATCH NOW Card */}
            <section
              aria-labelledby="steps-heading"
              className="mt-7 w-full rounded-2xl border border-white/10 bg-[#0b0f1b] p-5 sm:p-6"
            >
              <h2
                id="steps-heading"
                className="text-center font-mono text-xs font-bold tracking-[0.18em] text-sky-400 uppercase"
              >
                EASY 3-STEP WATCH NOW
              </h2>

              <ol className="mt-5 space-y-5">
                {WATCH_STEPS.map((step) => {
                  const isFocused = activeStepHint === step.stepNumber;
                  return (
                    <li key={step.stepNumber}>
                      <button
                        type="button"
                        onClick={() => handleStepClick(step.stepNumber)}
                        className="group flex w-full items-start gap-4 rounded-xl text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold tabular-nums transition-all ${
                            isFocused
                              ? 'border-blue-500 bg-blue-600 text-white shadow-[0_0_16px_rgba(37,99,235,0.55)]'
                              : 'border-blue-500 text-sky-400 group-hover:bg-blue-500/15'
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        <div>
                          <h3 className="font-mono text-xs sm:text-[13px] font-bold tracking-wider text-white group-hover:text-sky-300 transition-colors">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-slate-300">
                            {step.description}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Bottom 2-Column Proof Stat Cards */}
            <div className="mt-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0b0f1b] px-5 py-6 text-center">
                <Users className="h-6 w-6 text-sky-400" aria-hidden="true" />
                <p className="mt-2.5 text-2xl font-extrabold tracking-tight text-white tabular-nums">
                  14,820+
                </p>
                <p className="mt-1 font-mono text-[11px] font-medium tracking-[0.14em] text-slate-400 uppercase">
                  ACTIVE STREAMS TODAY
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0b0f1b] px-5 py-6 text-center">
                <div
                  className="flex items-center gap-1 text-sky-400"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-sky-400 text-sky-400"
                    />
                  ))}
                </div>
                <p className="mt-2.5 text-2xl font-extrabold tracking-tight text-white tabular-nums">
                  4.9/5 Rating
                </p>
                <p className="mt-1 font-mono text-[11px] font-medium tracking-[0.14em] text-slate-400 uppercase">
                  USER SATISFACTION
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Quiet Footer */}
        <footer className="mt-6 text-center font-mono text-[11px] text-slate-500">
          Love Island Australia Watch Portal
        </footer>
      </main>

      {/* Interactive Syncing & Redirect Modal */}
      <SyncPortalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
