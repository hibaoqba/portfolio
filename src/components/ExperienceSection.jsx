import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

function ExperienceSection() {
  const { t } = useTranslation();
  const steps = t('experience.steps', { returnObjects: true }) || [];

  const REVEAL_EDGE_VH = 0.96;
  const STAGGER_MS = 80;

  const itemRefs = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, steps.length);
  }, [steps.length]);

  useEffect(() => {
    const setup = () => {
      if (observerRef.current) observerRef.current.disconnect();

      const marginPx = Math.round(window.innerHeight * (1 - REVEAL_EDGE_VH));
      observerRef.current = new IntersectionObserver(
        entries => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target;
            el.style.transitionDelay = el.dataset.delay || '0ms';
            el.style.opacity = '1';
            el.style.transform = 'none';
            observerRef.current.unobserve(el);
          }
        },
        { root: null, rootMargin: `0px 0px -${marginPx}px 0px`, threshold: 0 }
      );

      itemRefs.current.forEach(el => el && observerRef.current.observe(el));
    };

    setup();
    window.addEventListener('resize', setup);
    return () => {
      window.removeEventListener('resize', setup);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [steps.length, REVEAL_EDGE_VH]);

  return (
    <section id="experience" className="py-20 px-6 md:px-20 bg-white dark:bg-transparent scroll-mt-28">
      <h2 className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-white">
        {t('experience.title')}
      </h2>

      <div className="grid gap-10">
        {steps.map((step, index) => (
          <article
            key={index}
            ref={el => (itemRefs.current[index] = el)}
            data-delay={`${Math.min(index * STAGGER_MS, 280)}ms`}
            style={{ opacity: 0, transform: 'translateY(10px)', contentVisibility: 'auto', contain: 'layout paint style' }}
            className="transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none
                       bg-white dark:bg-[#0B0B14]/40 border border-gray-200 dark:border-transparent shadow-sm
                       rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all"
            aria-label={step.title}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {step.year} <span className="mx-1 text-gray-400">—</span> {step.location}
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {step.title}
                </h3>
              </div>
              {step.logo && (
                <img
                  src={step.logo}
                  alt={`Logo of ${step.title}`}
                  loading="lazy"
                  decoding="async"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain rounded bg-white/80 dark:bg-white/10 p-2 ring-1 ring-gray-200 dark:ring-white/10"
                />
              )}
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              {step.description}
            </p>

            {!!step.skills?.length && (
              <div className="flex flex-wrap gap-2">
                {step.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 rounded-full
                               bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white
                               ring-1 ring-gray-300 dark:ring-white/15"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
