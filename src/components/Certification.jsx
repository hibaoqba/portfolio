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

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 px-6 md:px-20 bg-white dark:bg-transparent">
      <div className="flex flex-col gap-6">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={cert.title}
            className="group relative overflow-hidden rounded-2xl px-6 py-4 transition-all duration-300
                       bg-white/60 backdrop-blur-md border border-transparent shadow-sm
                       hover:shadow-[0_16px_48px_-20px_rgba(217,70,239,0.35)] hover:-translate-y-0.5
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60
                       dark:bg-[#0B0B14]/40 dark:backdrop-blur-md dark:border-fuchsia-400/10
                       flex items-center gap-6"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-fuchsia-500 via-violet-500/70 to-cyan-400"
            />

            <img
              src={`/assets/${cert.file}`}
              alt={cert.title}
              className="w-14 h-14 object-contain bg-white/70 dark:bg-white/10 rounded-lg p-2
                         ring-1 ring-violet-200 dark:ring-white/15"
            />
            <span className="text-black dark:text-white font-semibold text-base">
              {cert.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
