import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

function TimelineSection() {
  const { t } = useTranslation();
  const steps = t('timeline.steps', { returnObjects: true }) || [];

  // tweak these for earlier/smoother feel
  const START_EARLY_VH = 0.98;   // 0..1 of viewport height; higher => starts earlier
  const ACTIVE_TARGET_VH = 0.30; // where we "focus" items (earlier than center)
  const REVEAL_EDGE_VH = 0.96;   // reveal when item top passes this fraction of viewport height
  const REPLAY_ON_SCROLL = true; // false = reveal once

  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(() => Array(steps.length).fill(false));

  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    setRevealed(prev => {
      const next = Array(steps.length).fill(false);
      for (let i = 0; i < Math.min(prev.length, next.length); i++) next[i] = prev[i];
      return next;
    });
    itemRefs.current = itemRefs.current.slice(0, steps.length);
  }, [steps.length]);

  // smooth progress + early activation using rAF
  useEffect(() => {
    if (!containerRef.current) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const contRect = containerRef.current.getBoundingClientRect();

      // side line progress (starts early)
      const startY = vh * START_EARLY_VH;
      let progress = (startY - contRect.top) / (contRect.height + vh * START_EARLY_VH);
      progress = Math.max(0, Math.min(1, progress));
      if (lineRef.current) {
        lineRef.current.style.height = (progress * 100).toFixed(2) + '%';
      }

      // active index = closest to target line
      const targetY = vh * ACTIVE_TARGET_VH;
      let best = 0, bestDist = Infinity;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - targetY);
        if (d < bestDist) { bestDist = d; best = i; }
      }
      setActiveIndex(prev => (prev === best ? prev : best));

      // reveal earlier (optionally replay)
      const nextReveal = [];
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) { nextReveal[i] = false; continue; }
        const r = el.getBoundingClientRect();
        const shouldShow = r.top < vh * REVEAL_EDGE_VH;
        nextReveal[i] = REPLAY_ON_SCROLL ? shouldShow : (revealed[i] || shouldShow);
      }
      // only set if changed
      let changed = nextReveal.length !== revealed.length;
      if (!changed) for (let i = 0; i < nextReveal.length; i++) if (nextReveal[i] !== revealed[i]) { changed = true; break; }
      if (changed) setRevealed(nextReveal);
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    const onResize = onScroll;

    onScroll(); // initial
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length, REPLAY_ON_SCROLL, START_EARLY_VH, ACTIVE_TARGET_VH, REVEAL_EDGE_VH, revealed]);

  return (
    <section id="timeline" className="py-20 px-6 md:px-20 bg-white dark:bg-transparent">
      <h2 className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-white">
        {t('timeline.title')}
      </h2>

      <div
        ref={containerRef}
        className="relative border-l ml-4 md:ml-1 w-full px-6 border-purple-300/60 dark:border-purple-400/30"
      >
        {/* smooth side progress (height set via JS) */}
        <div
          ref={lineRef}
          className="pointer-events-none absolute -left-[1px] top-0 w-[3px] rounded-full
                     bg-gradient-to-b from-purple-500 via-purple-500/70 to-transparent
                     transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                     motion-reduce:transition-none"
          aria-hidden="true"
        />

        {steps.map((step, index) => (
          <div
            key={index}
            ref={el => (itemRefs.current[index] = el)}
            className="relative mb-12 ml-6 pr-20 scroll-mt-28"
          >
            {/* DOT — EXACTLY your original pulse logic (unchanged) */}
            <div
              className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full
                          border-4 border-white/90 dark:border-black/30 shadow-lg transition-all duration-300
                          ${0 === index
                            ? 'bg-purple-600 dark:bg-purple-400 animate-pulse'
                            : 'bg-gray-300 dark:bg-gray-500'}`}
            />

            {/* CARD */}
            <div
              className={`rounded-2xl will-change-transform
                          transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]
                          ${revealed[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                          motion-reduce:transition-none motion-reduce:translate-y-0`}
              style={{ transitionDelay: revealed[index] ? `${Math.min(index * 80, 280)}ms` : '0ms' }}
            >
              <div className="rounded-2xl p-[1px]
                              bg-gradient-to-tr from-purple-500/40 via-indigo-400/30 to-purple-300/40
                              dark:bg-gradient-to-tr dark:from-purple-500/20 dark:via-indigo-400/15 dark:to-purple-300/20">
                <div
                  className={`relative rounded-[1rem]
                              bg-white/95 backdrop-blur-sm border border-transparent shadow-sm
                              dark:bg-black/20 dark:backdrop-blur-sm dark:border-purple-400/10
                              transition-shadow duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                              ${activeIndex === index ? 'shadow-md' : 'shadow-sm'}
                              motion-reduce:transition-none`}
                >
                  {step.logo && (
                    <img
                      src={step.logo}
                      alt={`Logo de ${step.title}`}
                      className={`w-20 h-20 object-contain absolute right-4 top-1/2 -translate-y-1/2
                                 bg-white/90 dark:bg-white/5 rounded-xl p-2
                                 ring-1 ring-purple-300/40 dark:ring-purple-400/20
                                 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                 ${activeIndex === index ? 'scale-105' : 'scale-100'}
                                 motion-reduce:transition-none`}
                    />
                  )}

                  <div className="p-5 pr-24">
                    <time className="block text-sm text-gray-500 dark:text-gray-300">{step.year}</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{step.location}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default TimelineSection;
