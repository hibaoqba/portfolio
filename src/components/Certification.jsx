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
    <section
      id="certifications"
      className="py-20 px-6 md:px-20 bg-white dark:bg-transparent"
    >
     

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-6 py-4 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300 flex items-center gap-6"
          >
            <img
              src={`/assets/${cert.file}`}
              alt={cert.title}
              className="w-14 h-14 object-contain"
            />
            <span className="text-gray-800 dark:text-gray-300 font-semibold text-base">
              {cert.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
