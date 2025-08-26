import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

function TimelineSection() {
  const { t } = useTranslation();
  const steps = t('timeline.steps', { returnObjects: true }) || [];

  const START_EARLY_VH = 0.98;
  const ACTIVE_TARGET_VH = 0.30;
  const REVEAL_EDGE_VH = 0.96;
  const REPLAY_ON_SCROLL = false;
  const ENABLE_ACTIVE_HILITE = false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(() => Array(steps.length).fill(false));

  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);

  const metricsRef = useRef({
    vh: 0,
    containerTop: 0,
    containerHeight: 0,
    itemTops: [],
    itemCenters: [],
  });

  useEffect(() => {
    setRevealed(prev => {
      const next = Array(steps.length).fill(false);
      for (let i = 0; i < Math.min(prev.length, next.length); i++) next[i] = prev[i];
      return next;
    });
    itemRefs.current = itemRefs.current.slice(0, steps.length);
  }, [steps.length]);

  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight;
      const cont = containerRef.current;
      if (!cont) return;

      const contRect = cont.getBoundingClientRect();
      const containerTop = contRect.top + window.scrollY;
      const containerHeight = cont.offsetHeight;

      const itemTops = itemRefs.current.map(el => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY;
      });

      const itemCenters = itemRefs.current.map((el, i) => {
        if (!el) return 0;
        return itemTops[i] + el.offsetHeight / 2;
      });

      metricsRef.current = { vh, containerTop, containerHeight, itemTops, itemCenters };
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    itemRefs.current.forEach(el => el && ro.observe(el));

    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [steps.length]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const { vh, containerTop, containerHeight, itemTops, itemCenters } = metricsRef.current;
      if (!vh || !containerHeight) return;

      const y = window.scrollY;
      const startY = vh * START_EARLY_VH;
      let progress = (y + startY - containerTop) / (containerHeight + startY);
      progress = Math.max(0, Math.min(1, progress));
      if (lineRef.current) {
        lineRef.current.style.height = (progress * 100).toFixed(2) + '%';
      }

      if (ENABLE_ACTIVE_HILITE) {
        const target = y + vh * ACTIVE_TARGET_VH;
        let best = 0, bestDist = Infinity;
        for (let i = 0; i < itemCenters.length; i++) {
          const d = Math.abs(itemCenters[i] - target);
          if (d < bestDist) { bestDist = d; best = i; }
        }
        setActiveIndex(prev => (prev === best ? prev : best));
      }

      const threshold = y + vh * REVEAL_EDGE_VH;
      const next = itemTops.map((top, i) =>
        REPLAY_ON_SCROLL ? top < threshold : (revealed[i] || top < threshold)
      );

      let changed = next.length !== revealed.length;
      if (!changed) {
        for (let i = 0; i < next.length; i++) {
          if (next[i] !== revealed[i]) { changed = true; break; }
        }
      }
      if (changed) setRevealed(next);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [REPLAY_ON_SCROLL, START_EARLY_VH, ACTIVE_TARGET_VH, REVEAL_EDGE_VH, revealed]);

  return (
    <section id="timeline" className="py-20 px-6 md:px-20 bg-transparent">
      <h2 className="text-4xl font-extrabold mb-16 text-center text-gray-900 dark:text-white">
        {t('timeline.title')}
      </h2>

      <div
        ref={containerRef}
        className="relative border-l border-gray-300 dark:border-white/10 ml-4 md:ml-1 w-full px-6"
      >
        <div
          ref={lineRef}
          className="pointer-events-none absolute -left-[1px] top-0 w-[3px] rounded-full
                     bg-gradient-to-b from-purple-500 via-purple-400 to-transparent"
          aria-hidden="true"
        />

        {steps.map((step, index) => (
          <div
            key={index}
            ref={el => (itemRefs.current[index] = el)}
            className="relative mb-12 ml-6 pr-20 scroll-mt-28"
            style={{ contentVisibility: 'auto', contain: 'layout paint style' }}
          >
            <div
              className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full
                          border-4 border-white dark:border-black shadow-lg
                          ${index === 0
                            ? 'bg-purple-600 dark:bg-purple-400 animate-pulse'
                            : 'bg-gray-300 dark:bg-gray-600'}`}
            />

            <div
              className={`rounded-2xl transform-gpu
                          transition-all duration-500 ease-out
                          ${revealed[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                          motion-reduce:transition-none motion-reduce:translate-y-0`}
              style={{ transitionDelay: revealed[index] ? `${Math.min(index * 80, 240)}ms` : '0ms' }}
            >
              <div className="rounded-2xl p-[1px]
                          bg-gradient-to-tr from-purple-500/30 via-indigo-400/20 to-purple-300/20">
                <div
                  className="relative rounded-[1rem]
                             bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm
                             dark:bg-black/30 dark:border-white/10"
                >
                  {step.logo && (
                    <img
                      src={step.logo}
                      alt={`Logo de ${step.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 object-contain absolute right-4 top-1/2 -translate-y-1/2
                                 bg-white dark:bg-white/10 rounded-xl p-2
                                 ring-1 ring-purple-300/30 dark:ring-purple-400/20"
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
