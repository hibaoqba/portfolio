import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

function TimelineSection() {
  const { t } = useTranslation();
  const steps = t('timeline.steps', { returnObjects: true }) || [];

  const START_EARLY_VH = 0.98;
  const ACTIVE_TARGET_VH = 0.30;
  const REVEAL_EDGE_VH = 0.96;
  const REPLAY_ON_SCROLL = false;

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

      const itemCenters = itemRefs.current.map((el, i) =>
        el ? itemTops[i] + el.offsetHeight / 2 : 0
      );

      metricsRef.current = { vh, containerTop, containerHeight, itemTops, itemCenters };
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    itemRefs.current.forEach(el => el && ro.observe(el));
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [steps.length]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const { vh, containerTop, containerHeight, itemTops } = metricsRef.current;
      if (!vh || !containerHeight) return;

      const y = window.scrollY;
      const startY = vh * START_EARLY_VH;
      let progress = (y + startY - containerTop) / (containerHeight + startY);
      progress = Math.max(0, Math.min(1, progress));
      if (lineRef.current) lineRef.current.style.height = (progress * 100).toFixed(2) + '%';

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
  }, [revealed]);

  return (
    <section id="timeline" className="py-20 px-6 md:px-20 bg-transparent">
      <h2 className="text-4xl font-extrabold mb-16 text-center  bg-clip-text text-transparent">
        {t('timeline.title')}
      </h2>

      <section id="timeline" className="py-20 px-6 md:px-20 bg-transparent">
  <h2 className="text-4xl font-extrabold mb-16 text-center text-white">
    {t('timeline.title')}
  </h2>

  <div ref={containerRef} className="relative ml-0 md:ml-1 w-full">
    <div
      ref={lineRef}
      className="pointer-events-none absolute left-0.5 top-0 w-[4px] rounded-full
                 bg-gradient-to-b from-violetTech via-brand-300 to-transparent"
      aria-hidden="true"
    />

    {steps.map((step, index) => (
      <div
        key={index}
        ref={el => (itemRefs.current[index] = el)}
        className="relative mb-12 pl-2"
      >
        <div className="absolute -left-1 top-2 w-4 h-4 rounded-full bg-white dark:bg-brand-925 ring-4 ring-violetTech/30">
          <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-violetTech" />
        </div>

        <div className="relative mb-12 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-brand-950/70 backdrop-blur-md shadow-md p-6 relative">
            {step.logo && (
              <img
                src={step.logo}
                alt={step.title ? String(step.title) : 'Logo'}
                loading="lazy"
                decoding="async"
                className="w-16 h-16 object-contain absolute top-4 right-4
                           bg-white dark:bg-white/10 rounded-xl p-2
                           ring-1 ring-gray-200 dark:ring-white/10"
              />
            )}
            <time className="block text-sm text-gray-600 dark:text-gray-300">{step.year}</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
            {step.location && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{step.location}</p>
            )}
            {step.description && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{step.description}</p>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


    </section>
  );
}

export default TimelineSection;
