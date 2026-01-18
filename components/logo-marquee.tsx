"use client"

import { motion } from "framer-motion"

const logos = [
  { id: 1, type: "dashak" },
  { id: 2, type: "caliph" },
]

export function LogoMarquee() {
  // Seamless infinity scroll
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]

  return (
    <div className="w-full bg-[#660000] py-10 overflow-hidden relative border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap gap-40 items-center"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {marqueeLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex items-center shrink-0">
            {logo.type === "dashak" ? (
              <div className="flex flex-col items-center">
                 <div className="flex items-center">
                    <span className="text-white text-7xl font-light tracking-[0.12em] font-sans">DAS·HAK</span>
                 </div>
                 <span className="text-white/70 text-[11px] uppercase tracking-[0.3em] mt-1 font-sans">Caliph Students' Union 2025-26</span>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                {/* Geometric Islamic Pattern Logo */}
                <div className="relative w-24 h-24 flex flex-col items-center justify-center">
                  <div className="w-full h-1/2 overflow-hidden relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 border-[2.5px] border-white/90 rounded-full flex items-center justify-center">
                       {/* Geometric Mesh Overlay */}
                       <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-40">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="border-[0.5px] border-white/30" />
                          ))}
                       </div>
                       {/* Floral Pattern Core */}
                       <div className="w-10 h-10 border-t-2 border-r-2 border-white/80 rounded-full rotate-45 transform origin-center" />
                    </div>
                  </div>
                  <div className="w-28 h-[2.5px] bg-white/90 mt-1" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-6xl font-bold uppercase tracking-tight leading-none font-sans">Caliph</span>
                  <span className="text-white/90 text-3xl font-light uppercase tracking-[0.18em] leading-tight font-sans">Life School</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
      
      {/* Gradient masks for seamless fade */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#660000] via-[#660000]/90 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#660000] via-[#660000]/90 to-transparent z-10" />
    </div>
  )
}
