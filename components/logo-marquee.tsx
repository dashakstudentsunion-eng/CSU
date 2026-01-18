"use client"

import { motion } from "framer-motion"

export function LogoMarquee() {
  return (
    <div className="w-full bg-[#660000] overflow-hidden relative">
      <motion.div
        className="flex whitespace-nowrap"
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
            className="h-24 md:h-32 w-auto block"
          />
        </div>
        <div className="flex shrink-0">
          <img 
            src="/images/marquee-poster.png" 
            alt="Students Union Banner" 
            className="h-24 md:h-32 w-auto block"
          />
        </div>
        <div className="flex shrink-0">
          <img 
            src="/images/marquee-poster.png" 
            alt="Students Union Banner" 
            className="h-24 md:h-32 w-auto block"
          />
        </div>
        <div className="flex shrink-0">
          <img 
            src="/images/marquee-poster.png" 
            alt="Students Union Banner" 
            className="h-24 md:h-32 w-auto block"
          />
        </div>
      </motion.div>
    </div>
  )
}
