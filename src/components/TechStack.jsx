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
  const REVEAL_EDGE_VH = 0.96;
  const STAGGER_MS = 40;

  const itemRefs = useRef([]);
  const observerRef = useRef(null);
  const [visible, setVisible] = useState(() => Array(techs.length).fill(false));

  useEffect(() => {
    setVisible(prev => {
      const next = Array(techs.length).fill(false);
      for (let i = 0; i < Math.min(prev.length, next.length); i++) next[i] = prev[i];
      return next;
    });
    itemRefs.current = itemRefs.current.slice(0, techs.length);
  }, []);

  useEffect(() => {
    const setup = () => {
      if (observerRef.current) observerRef.current.disconnect();
      const marginPx = Math.round(window.innerHeight * (1 - REVEAL_EDGE_VH));
      observerRef.current = new IntersectionObserver(
        entries => {
          setVisible(prev => {
            let changed = false;
            const next = prev.slice();
            for (const e of entries) {
              if (e.isIntersecting) {
                const idx = Number(e.target.dataset.index);
                if (!next[idx]) { next[idx] = true; changed = true; }
                observerRef.current.unobserve(e.target);
              }
            }
            return changed ? next : prev;
          });
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
  }, []);

  return (
    <section id="stack" className=" px-6 md:px-20 bg-white dark:bg-transparent">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 place-items-center">
        {techs.map((tech, index) => (
          <div
            key={index}
            ref={el => (itemRefs.current[index] = el)}
            data-index={index}
            className={`group relative w-full h-full max-w-[220px] rounded-2xl transition-[opacity,transform] duration-400 transform-gpu
                        ${visible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        motion-reduce:transition-none`}
            style={{ transitionDelay: visible[index] ? `${Math.min(index * STAGGER_MS, 260)}ms` : '0ms' }}
          >
            <div
              className="relative overflow-hidden rounded-2xl p-6 h-full flex flex-col items-center
                         bg-white/90 supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-md
                         dark:bg-[#0B0B14]/40 dark:supports-[backdrop-filter]:backdrop-blur-md
                         border border-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform duration-300 transform-gpu"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 opacity-0
                           bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] blur-md
                           transition-transform duration-700 ease-out group-hover:opacity-100 group-hover:translate-x-[200%]"
              />
              <img
                src={`/assets/${tech.file}`}
                alt={tech.name}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-105 transform-gpu"
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
