"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const homeCards = [
  { id: 1, title: "Results", status: "Coming later" },
  { id: 2, title: "Event Poster", status: "Coming later" },
  { id: 3, title: "Achievements", status: "Coming later" },
  { id: 4, title: "Overall Performer", status: "Coming later" },
  { id: 5, title: "Academic Performer", status: "Coming later" },
]

// Interactive Stacked Image Component
function HeroStack() {
  const [images, setImages] = useState<string[]>([])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await fetch("/api/hero-images")
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            setImages(data.map((img: any) => img.url))
          } else {
            // Defaults
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
    <div 
      className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((url, idx) => {
        const offset = isHovered ? (idx - 1) * 40 : idx * 10
        const rotate = isHovered ? (idx - 1) * 10 : idx * 2
        const scale = 1 - idx * 0.05
        
        return (
          <div
            key={idx}
            className="absolute inset-0 transition-all duration-500 ease-out rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
            style={{
              transform: `translate(${offset}px, ${offset}px) rotate(${rotate}deg) scale(${scale})`,
              zIndex: 30 - idx,
              opacity: 1 - idx * 0.1,
            }}
          >
            <img src={url} alt={`Hero ${idx}`} className="w-full h-full object-cover" />
          </div>
        )
      })}
    </div>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] flex items-center bg-[#FAFAF8] py-20 px-4">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl lg:text-8xl font-bold text-[#59050D] leading-tight text-center lg:text-left">
            A Students’ Union Initiative
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
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-foreground mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {homeCards.map((card) => (
              <div
                key={card.id}
                className="group rounded-lg p-8 bg-card hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border/50 hover:border-[#59050D]/50 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#59050D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold text-[#59050D] relative z-10 group-hover:scale-105 transition-transform origin-left">{card.title}</h3>
                <p className="mt-6 text-sm text-muted-foreground relative z-10">{card.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
