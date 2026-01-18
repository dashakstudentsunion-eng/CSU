"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

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
  return null; // Integrated into HomePage
}

import { Instagram, MessageCircle, Mail } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F0F0EE] p-4 md:p-8 font-milker">
      <div className="max-w-7xl mx-auto skeuo-container bg-[#FAFAF8]">
        <Navbar />
        
        <main className="px-6 py-12 lg:px-12">
          {/* Header Section with 3D Look */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <div className="flex-1 space-y-8">
              <div className="inline-block glass-pill text-primary font-bold tracking-wider text-sm uppercase">
                Challenge UI • Web Design
              </div>
              <h1 className="text-7xl lg:text-9xl homepage-headline leading-[0.85] text-left uppercase flex flex-col italic">
                <span>A Students&apos;</span>
                <span className="ml-4">Union</span>
                <span className="ml-8">Initiative</span>
              </h1>
              <div className="flex gap-4">
                <Button className="skeuo-button btn-primary px-8 py-6 text-lg border-[#4D0000]">
                  LOGIN
                </Button>
                <Button variant="outline" className="skeuo-button bg-white text-primary border-primary/20 px-8 py-6 text-lg hover:bg-secondary/20">
                  BUAT AKUN
                </Button>
              </div>
            </div>
            
            <div className="flex-1 w-full relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
              <HeroStack />
            </div>
          </div>

          {/* Featured Cards with Skeuomorphic Design */}
          <section className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary flex items-center gap-3 italic">
                <span className="w-8 h-1 bg-primary rounded-full" />
                FEATURED CATEGORIES
              </h2>
              <div className="glass-pill text-xs font-bold text-text-secondary italic">
                PENJELASAN SINGKAT TENTANG CSU
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {homeCards.map((card) => (
                <div
                  key={card.id}
                  className="skeuo-card group p-8 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[2rem] transition-all group-hover:w-full group-hover:h-full group-hover:rounded-none" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-white transition-colors">
                      <MessageCircle size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4 leading-tight uppercase italic">{card.title}</h3>
                    <p className="text-xs font-medium text-text-secondary/60 uppercase tracking-widest">{card.status}</p>
                    <div className="mt-8 flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
