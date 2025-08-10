import { useEffect, useRef, useState } from 'react';

const techs = [
  { name: 'Java', file: 'java-original.svg' },
  { name: 'Spring', file: 'spring-original.svg' },
  { name: 'C#', file: 'csharp-original.svg' },
  { name: '.NET', file: 'dotnetcore-original.svg' },
  { name: 'Angular', file: 'angularjs-original.svg' },
  { name: 'NodeJS', file: 'nodejs-original.svg' },
  { name: 'ReactJS', file: 'react-original.svg' },
  { name: 'PHP', file: 'php-original.svg' },
  { name: 'Kotlin', file: 'kotlin-original.svg' },
  { name: 'Python', file: 'python-original.svg' },
  { name: 'C++', file: 'cplusplus-original.svg' },
  { name: 'C', file: 'c-original.svg' },
  { name: 'JavaScript', file: 'javascript-original.svg' },
  { name: 'TypeScript', file: 'typescript-original.svg' },
  { name: 'HTML', file: 'html5-original.svg' },
  { name: 'CSS', file: 'css3-original.svg' },
  { name: 'Tailwind', file: 'tailwindcss-original.svg' },
  { name: 'MySQL', file: 'mysql-original.svg' },
  { name: 'PostgreSQL', file: 'postgresql-original.svg' },
  { name: 'Oracle', file: 'oracle-original.svg' },
  { name: 'JUnit', file: 'junit-original.svg' },
  { name: 'PyTest', file: 'pytest-original.svg' },
  { name: 'Postman', file: 'postman-original.svg' },
  { name: 'Jenkins', file: 'jenkins-original.svg' },
  { name: 'Docker', file: 'docker-original.svg' },
  { name: 'Kubernetes', file: 'kubernetes-original.svg' },
  { name: 'AWS', file: 'amazonwebservices-original-wordmark.svg' },
  { name: 'Google Cloud', file: 'googlecloud-original.svg' },
  { name: 'Git', file: 'git-original.svg' },
  { name: 'GitHub', file: 'github-original.svg' },
];

const TechStack = () => {
  // subtle reveal like other sections
  const REVEAL_EDGE_VH = 0.96;
  const STAGGER_MS = 40;

  const itemRefs = useRef([]);
  const [revealed, setRevealed] = useState(() => Array(techs.length).fill(false));

  useEffect(() => {
    setRevealed(prev => {
      const next = Array(techs.length).fill(false);
      for (let i = 0; i < Math.min(prev.length, next.length); i++) next[i] = prev[i];
      return next;
    });
    itemRefs.current = itemRefs.current.slice(0, techs.length);
  }, []);

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
  }, [REVEAL_EDGE_VH]);

  return (
    <section id="stack" className="py-20 px-6 md:px-20 bg-white dark:bg-transparent">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 place-items-center">
        {techs.map((tech, index) => (
          <div
            key={index}
            ref={el => (itemRefs.current[index] = el)}
            className={`group relative w-full h-full max-w-[220px] rounded-2xl transition-all duration-500
                        ${revealed[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        motion-reduce:transition-none`}
            style={{ transitionDelay: revealed[index] ? `${Math.min(index * STAGGER_MS, 260)}ms` : '0ms' }}
          >
            <div
              className="relative overflow-hidden rounded-2xl p-6 h-full flex flex-col items-center
                         bg-white/60 dark:bg-[#0B0B14]/40 backdrop-blur-md border border-transparent shadow-sm
                         hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Sheen on hover (kept). Gradient accent line removed. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 opacity-0
                           bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] blur-md
                           transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-x-[200%]"
              />

              <img
                src={`/assets/${tech.file}`}
                alt={tech.name}
                className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <p className="text-black dark:text-white font-medium text-sm text-center">
                {tech.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
