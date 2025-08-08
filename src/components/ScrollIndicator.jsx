import React from "react";

export default function ScrollIndicator({ target = "#projects" }) {
  return (
    <>
      <style>{`
        @keyframes scrollDot {
          0% { opacity: 0; top: 8px; }
          20% { opacity: 1; }
          80% { opacity: 1; top: 26px; }
          100% { opacity: 0; top: 30px; }
        }
      `}</style>
      <a
        href={target}
        aria-label="Scroll down"
        className="group absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-7 h-12 rounded-full border-2 border-gray-300 dark:border-brand-400/70 relative">
          <span className="absolute left-1/2 -translate-x-1/2 w-1.5 h-2.5 rounded-full bg-gray-400 dark:bg-brand-400" style={{ animation: "scrollDot 1.6s ease-in-out infinite" }} />
        </div>
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400 dark:text-brand-400 group-hover:translate-y-0.5 transition-transform">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </>
  );
}
