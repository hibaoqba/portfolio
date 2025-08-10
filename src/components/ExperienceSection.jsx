import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

function ExperienceSection() {
  const { t } = useTranslation();
  const steps = t('experience.steps', { returnObjects: true }) || [];

  // keep the list layout, subtle reveal
  const REVEAL_EDGE_VH = 0.96; // when card top crosses this % of viewport height
  const STAGGER_MS = 80;       // stagger between items

  const itemRefs = useRef([]);
  const [revealed, setRevealed] = useState(() => Array(steps.length).fill(false));

  // sync with data length
  useEffect(() => {
    setRevealed(prev => {
      const next = Array(steps.length).fill(false);
      for (let i = 0; i < Math.min(prev.length, next.length); i++) next[i] = prev[i];
      return next;
    });
    itemRefs.current = itemRefs.current.slice(0, steps.length);
  }, [steps.length]);

  // rAF-driven reveal
  useEffect(() => {
    let ticking = false;
    const vh = () => window.innerHeight;

    const update = () => {
      ticking = false;
      const next = itemRefs.current.map(el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh() * REVEAL_EDGE_VH;
      });
      if (next.length !== revealed.length || next.some((v, i) => v !== revealed[i])) {
        setRevealed(next);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length, REVEAL_EDGE_VH]);

  return (
    <section id="experience" className="py-20 px-6 md:px-20 bg-white dark:bg-transparent scroll-mt-28">
      <h2 className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-white">
        {t('experience.title')}
      </h2>

      {/* Single-column LIST layout (like original) */}
      <div className="grid gap-10">
        {steps.map((step, index) => (
          <article
            key={index}
            ref={el => (itemRefs.current[index] = el)}
            className="relative group"
            aria-label={step.title}
          >
            {/* reveal wrapper */}
            <div
              className={`rounded-2xl will-change-transform transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]
                          ${revealed[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                          motion-reduce:transition-none motion-reduce:translate-y-0`}
              style={{ transitionDelay: revealed[index] ? `${Math.min(index * STAGGER_MS, 280)}ms` : '0ms' }}
            >
              {/* Card (lighter, no outer gradient frame) */}
              <div
                className="relative rounded-[1rem]
                           bg-white/60 backdrop-blur-md border border-transparent shadow-sm
                           dark:bg-[#0B0B14]/40 dark:backdrop-blur-md dark:border-fuchsia-400/10
                           transition-shadow duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                           group-hover:shadow-[0_10px_30px_-10px_rgba(217,70,239,0.25)]"
              >
                {/* left accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute left-2 top-3 bottom-3 w-[3px] rounded-full
                             bg-gradient-to-b from-fuchsia-500 via-violet-500/70 to-cyan-400 opacity-80"
                />

                {/* optional logo */}
                {step.logo && (
                  <img
                    src={step.logo}
                    alt={`Logo of ${step.title}`}
                    className="w-12 h-12 object-contain absolute right-4 top-4
                               bg-white/90 dark:bg-white/5 rounded-lg p-2
                               ring-1 ring-fuchsia-300/40 dark:ring-fuchsia-400/20
                               transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                               group-hover:scale-105"
                  />
                )}

                <div className="p-6 pr-20">
                  <div className="mb-2 text-xs text-gray-600 dark:text-gray-300">
                    {step.year}
                    <span className="mx-1 text-gray-400">—</span>
                    {step.location}
                  </div>

                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {step.description}
                  </p>

                  {step.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-3 py-1 rounded-full backdrop-blur-[2px]
                                     bg-white/60 text-violet-700 ring-1 ring-violet-200
                                     hover:bg-white/70 transition-colors
                                     dark:bg-white/10 dark:text-white dark:ring-white/15"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
