import { memo } from "react";

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

const CertItem = memo(function CertItem({ cert }) {
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cert.title}
      className="group relative overflow-hidden rounded-2xl px-6 py-4
                 bg-white dark:bg-[#0d1230]
                 border border-black/5 dark:border-white/10
                 shadow-sm hover:shadow-md transition-transform duration-150
                 hover:-translate-y-0.5 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-violet-400/60
                 flex items-center gap-4"
      style={{ contentVisibility: "auto", contain: "layout paint style" }}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[3px]
                   bg-gradient-to-b from-violet-500 via-violet-500/70 to-fuchsia-500"
      />
      <img
        src={`/assets/${cert.file}`}
        alt={cert.title}
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
        className="w-12 h-12 object-contain rounded-lg"
      />
      <span className="text-slate-900 dark:text-white font-medium">
        {cert.title}
      </span>
    </a>
  );
});

function Certifications() {
  return (
    <section id="certifications" className="py-20 px-6 md:px-20 bg-transparent">
      <div className="flex flex-col gap-4">
        {certifications.map((cert) => (
          <CertItem key={cert.title} cert={cert} />
        ))}
      </div>
    </section>
  );
}

export default memo(Certifications);
