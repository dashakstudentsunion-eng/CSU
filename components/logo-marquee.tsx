"use client"

import { motion } from "framer-motion"

const logos = [
  { id: 1, src: "/images/dashak-logo.png", alt: "Dashak" },
  { id: 2, src: "/images/caliph-life-school.png", alt: "Caliph Life School" },
]

export function LogoMarquee() {
  // Triple the logos to ensure seamless infinity scroll
  const marqueeLogos = [...logos, ...logos, ...logos]

  return (
    <div className="w-full bg-[#660000] py-12 overflow-hidden relative">
      <motion.div
        className="flex whitespace-nowrap gap-24 items-center"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {marqueeLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex items-center gap-4 min-w-max">
            {/* Logo placeholder if images don't exist yet */}
            <div className="h-16 flex items-center gap-8">
              {logo.id === 1 ? (
                <div className="flex flex-col items-start">
                   <span className="text-white text-4xl font-bold tracking-tighter">DAS·HAK</span>
                   <span className="text-white/70 text-[10px] uppercase tracking-[0.2em]">Caliph Students' Union 2025-26</span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <div className="w-10 h-10 border-t-4 border-white/80 rounded-full rotate-45" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-3xl font-bold uppercase tracking-wide">Caliph</span>
                    <span className="text-white/90 text-sm uppercase tracking-widest">Life School</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Gradient masks for seamless fade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#660000] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#660000] to-transparent z-10" />
    </div>
  )
}
