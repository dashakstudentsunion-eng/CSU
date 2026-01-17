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
    <div className="relative w-full aspect-[4/3] max-w-4xl mx-auto flex items-center justify-center py-20 px-4 overflow-visible">
      <div className="relative w-full h-full flex items-center justify-center perspective-2000">
        {images.slice(0, 3).map((url, idx) => {
          const isHovered = hoveredIdx === idx
          const isOtherHovered = hoveredIdx !== null && !isHovered
          
          let translateX = "0%"
          let rotateY = "0deg"
          let rotateZ = "0deg"
          let zIndex = 10
          let scale = 0.85

          if (idx === 0) { // Left
            translateX = "-48%"
            rotateY = "35deg"
            rotateZ = "-5deg" // Increased tilt
            zIndex = 5
          } else if (idx === 1) { // Center
            translateX = "0%"
            rotateY = "0deg"
            rotateZ = "0deg"
            zIndex = 20
            scale = 1
          } else if (idx === 2) { // Right
            translateX = "48%"
            rotateY = "-35deg"
            rotateZ = "5deg" // Increased tilt
            zIndex = 5
          }

          return (
            <div
              key={idx}
              className="absolute w-[55%] aspect-[4/3] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[16px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.45),0_18px_36px_-18px_rgba(0,0,0,0.5)] border-[1px] border-white/20 cursor-pointer preserve-3d"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                transform: `translateX(${translateX}) rotateY(${rotateY}) rotateZ(${rotateZ}) scale(${isHovered ? scale * 1.15 : scale}) translateZ(${isHovered ? '150px' : '0px'})`,
                zIndex: isHovered ? 50 : zIndex,
                opacity: isOtherHovered ? 0.65 : 1,
                filter: isOtherHovered ? 'brightness(0.7) blur(2px)' : 'none',
              }}
            >
              <img 
                src={url} 
                alt={`Hero ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out" 
                style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
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

import { Instagram, MessageCircle, Mail } from "lucide-react"

function ConnectSection() {
  const [step, setStep] = useState(1) // 1: Image View, 2: Form Slide In, 3: Submitted
  const [content, setContent] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    batch: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch("/api/union-content").then(res => res.json()).then(data => setContent(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/union-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStep(3)
        toast.success("Your message has been submitted successfully.")
      }
    } catch (error) {
      toast.error("Failed to submit message.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!content) return null

  return (
    <section className="py-24 px-4 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto min-h-[500px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative">
          {/* Left Content Area */}
          <div className="relative h-[400px] flex flex-col justify-center">
            {/* Step 1: Initial Text */}
            <div 
              className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                step === 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
              }`}
            >
              <h2 className="text-5xl font-bold text-[#59050D] mb-4">{content.heading}</h2>
              <p className="text-xl text-muted-foreground mb-8 italic">"{content.subtext}"</p>
              <div className="flex gap-6 mb-8">
                <a href={content.instagram} target="_blank" rel="noopener noreferrer" className="text-[#59050D] hover:scale-110 transition-transform"><Instagram size={28} /></a>
                <a href={content.whatsapp} className="text-[#59050D] hover:scale-110 transition-transform"><MessageCircle size={28} /></a>
                <a href={`mailto:${content.email}`} className="text-[#59050D] hover:scale-110 transition-transform"><Mail size={28} /></a>
              </div>
              <Button 
                onClick={() => setStep(2)}
                className="w-fit bg-[#59050D] hover:bg-[#59050D]/90 text-white px-10 py-6 rounded-lg font-semibold"
              >
                Connect With Union
              </Button>
            </div>

            {/* Step 2 & 3: Form / Success */}
            <div 
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                step >= 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
              }`}
            >
              {step === 2 ? (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                  <Input required placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12" />
                  <Input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-12" />
                  <Input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12" />
                  <Input required placeholder="Batch" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} className="h-12" />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-[#59050D] py-6 font-semibold">
                    {isSubmitting ? "Submitting..." : "Connect With Union"}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col justify-center h-full">
                  <h3 className="text-3xl font-bold text-[#59050D] mb-4">Thank You!</h3>
                  <p className="text-xl text-muted-foreground">Your message has been submitted successfully.</p>
                  <Button variant="ghost" onClick={() => {setStep(1); setFormData({name:"",phone:"",email:"",batch:""})}} className="mt-8 w-fit text-[#59050D]">Send another message</Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Image Area */}
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src={content.imageUrl} 
              alt="Connect with Union" 
              className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                step >= 2 ? "scale-110 brightness-75" : "scale-100 brightness-100"
              }`}
            />
          </div>
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
      <ConnectSection />
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
