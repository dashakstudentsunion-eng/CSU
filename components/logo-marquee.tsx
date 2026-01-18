"use client"

import { motion } from "framer-motion"

export function LogoMarquee() {
  return (
    <div className="w-full bg-[#660000] py-4 overflow-hidden relative border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="flex shrink-0">
          <img 
            src="/images/marquee-poster.png" 
            alt="Students Union Banner" 
            className="h-24 md:h-32 w-auto object-contain"
          />
        </div>
        <div className="flex shrink-0">
          <img 
            src="/images/marquee-poster.png" 
            alt="Students Union Banner" 
            className="h-24 md:h-32 w-auto object-contain"
          />
        </div>
      </motion.div>
      
      {/* Gradient masks for seamless fade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#660000] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#660000] to-transparent z-10" />
    </div>
  )
}
