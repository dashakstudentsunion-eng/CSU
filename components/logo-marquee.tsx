"use client"

import { motion } from "framer-motion"

const logos = [
  { id: 1, type: "dashak" },
  { id: 2, type: "caliph" },
]

export function LogoMarquee() {
  // Triple the logos to ensure seamless infinity scroll
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className="w-full bg-[#660000] py-8 overflow-hidden relative border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap gap-32 items-center"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {marqueeLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex items-center">
            {logo.type === "dashak" ? (
              <div className="flex flex-col items-center">
                 <div className="flex items-center gap-1">
                    <span className="text-white text-6xl font-normal tracking-[0.1em] font-sans">DAS·HAK</span>
                 </div>
                 <span className="text-white/80 text-[10px] uppercase tracking-[0.25em] mt-1">Caliph Students' Union 2025-26</span>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                {/* Geometric Islamic Pattern Logo */}
                <div className="relative w-20 h-20 flex flex-col items-center justify-center">
                  <div className="w-full h-1/2 overflow-hidden relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 border-[3px] border-white/90 rounded-full clip-path-half flex items-center justify-center">
                       {/* Simplified Pattern Grid */}
                       <div className="grid grid-cols-4 grid-rows-4 w-full h-full opacity-40">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="border-[0.5px] border-white/40" />
                          ))}
                       </div>
                    </div>
                  </div>
                  <div className="w-24 h-[2px] bg-white/90 mt-1" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-5xl font-bold uppercase tracking-tight leading-none">Caliph</span>
                  <span className="text-white/90 text-2xl font-light uppercase tracking-[0.15em] leading-tight">Life School</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
      
      {/* Gradient masks for seamless fade */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#660000] via-[#660000]/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#660000] via-[#660000]/80 to-transparent z-10" />
    </div>
  )
}
