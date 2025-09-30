import { memo, useEffect, useRef } from "react";

const certifications = [
  {
    title: "IBM Back-End Development Professional Certificate",
    file: "ibm.png",
    url: "https://www.credly.com/badges/5903c176-9b30-40ac-9765-460ab16d130b",
  },
  {
    title: "Microsoft Back-End Developer Professional Certificate",
    file: "microsoft.png",
    url: "https://coursera.org/share/8e788ba70e98662eb7b0fdf883a89a74",
  },
  {
    title: "Machine Learning in Python",
    file: "DATASCIENCE.jpg",
    url: "https://learn.365datascience.com/certificates/CC-87ED693E85/",
  },
  {
    title: "Scrum Fundamentals Certified (SFC™)",
    file: "scrum.jpg",
    url: "https://www.scrumstudy.com/certification/verify?type=SFC&number=1056658",
  },
];

const CertItem = memo(function CertItem({ cert, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
      requestAnimationFrame(() => {
        el.style.transition = `opacity 0.6s ${index * 0.1}s ease-out, transform 0.6s ${index * 0.1}s ease-out`;
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      });
    }
  }, [index]);

  return (
    <a
      ref={ref}
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cert.title}
      className="group relative overflow-hidden rounded-2xl px-6 py-4
                 bg-white dark:bg-[#0d1230]
                 border border-gray-200 dark:border-transparent/10
                 shadow-sm hover:shadow-md transition-transform duration-150
                 hover:-translate-y-1 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-violet-400/60
                 flex items-center gap-4 w-full sm:max-w-xl mx-auto"
      style={{ contentVisibility: "auto", contain: "layout paint style" }}
    >
      <img
        src={`/assets/${cert.file}`}
        alt={cert.title}
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
        className="w-12 h-12 object-contain rounded-lg ring-1 ring-gray-200 dark:ring-white/10 bg-white dark:bg-white/10"
      />
      <span className="text-gray-900 dark:text-white font-medium text-sm md:text-base">
        {cert.title}
      </span>
    </a>
  );
});

function Certifications() {
  return (
    <section id="certifications" className="pt-0 pb-20 px-6 md:px-20 bg-transparent">
      <div className="flex flex-col gap-4 items-center">
        {certifications.map((cert, index) => (
          <CertItem key={cert.title} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
}

export default memo(Certifications);
