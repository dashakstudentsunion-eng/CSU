"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const homeCards = [
  { id: 1, title: "Results", status: "Coming later" },
  { id: 2, title: "Event Poster", status: "Coming later" },
  { id: 3, title: "Achievements", status: "Coming later" },
  { id: 4, title: "Overall Performer", status: "Coming later" },
  { id: 5, title: "Academic Performer", status: "Coming later" },
]

function HeroStack() {
  const [images, setImages] = useState<string[]>([])
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await fetch("/api/hero-images")
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            setImages(data.map((img: any) => img.url))
          } else {
            setImages([
              "/images/caliph-20vollyball-20league.webp",
              "/images/purple-20and-20white-20modern-20geometric-20football-20match-20schedule-20instagram-20post.webp",
              "/images/caliph-20vollyball-20league.webp",
            ])
          }
        }
      } catch (e) {
        console.error("Error fetching hero images:", e)
      }
    }
    fetchHeroImages()
    const interval = setInterval(fetchHeroImages, 2000)
    return () => clearInterval(interval)
  }, [])

  if (images.length === 0) return null

  return (
    <div className="relative w-full aspect-[4/3] max-w-5xl mx-auto flex items-center justify-center py-24 px-4 overflow-visible">
      <div className="relative w-full h-full flex items-center justify-center perspective-[3000px]">
        {images.slice(0, 3).map((url, idx) => {
          const isHovered = hoveredIdx === idx
          const isOtherHovered = hoveredIdx !== null && !isHovered
          
          let translateX = "0%"
          let rotateY = "0deg"
          let rotateZ = "0deg"
          let zIndex = 10
          let scale = 0.9

          if (idx === 0) { // Left
            translateX = "-55%"
            rotateY = "45deg"
            rotateZ = "-8deg"
            zIndex = 5
          } else if (idx === 1) { // Center
            translateX = "0%"
            rotateY = "0deg"
            rotateZ = "0deg"
            zIndex = 20
            scale = 1.15
          } else if (idx === 2) { // Right
            translateX = "55%"
            rotateY = "-45deg"
            rotateZ = "8deg"
            zIndex = 5
          }

          return (
            <div
              key={idx}
              className="absolute w-[65%] aspect-[4/3] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[24px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5),0_25px_50px_-25px_rgba(0,0,0,0.55)] border-[2px] border-white/30 cursor-pointer preserve-3d"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                transform: `translateX(${translateX}) rotateY(${rotateY}) rotateZ(${rotateZ}) scale(${isHovered ? scale * 1.2 : scale}) translateZ(${isHovered ? '250px' : '0px'})`,
                zIndex: isHovered ? 50 : zIndex,
                opacity: isOtherHovered ? 0.6 : 1,
                filter: isOtherHovered ? 'brightness(0.6) blur(4px)' : 'none',
              }}
            >
              <img 
                src={url} 
                alt={`Hero ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out" 
                style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
              />
              <div className="absolute inset-0 ring-2 ring-inset ring-white/20" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] flex items-center bg-[#FAFAF8] py-20 px-4">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl lg:text-8xl homepage-headline leading-[0.9] text-left uppercase flex flex-col">
            <span>A Students&apos;</span>
            <span>Union</span>
            <span>Initiative</span>
          </h1>
        </div>
        <div className="relative">
          <HeroStack />
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background font-milker">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-foreground mb-12 uppercase italic">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {homeCards.map((card) => (
              <div
                key={card.id}
                className="group rounded-lg p-8 bg-card hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/50 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold text-primary relative z-10 group-hover:scale-105 transition-transform origin-left uppercase italic">{card.title}</h3>
                <p className="mt-6 text-sm text-text-secondary relative z-10">{card.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
