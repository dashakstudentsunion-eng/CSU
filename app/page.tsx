"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const homeCards = [
  { id: 1, title: "Results", status: "Coming later" },
  { id: 2, title: "Poster Event", status: "Coming later" },
  { id: 3, title: "Achievements", status: "Coming later" },
  { id: 4, title: "Overall Performer", status: "Coming later" },
  { id: 5, title: "Academic Performer", status: "Coming later" },
]

// Animated Counter Component
function AnimatedCounter() {
  const [count, setCount] = useState(0)
  const target = 200

  useEffect(() => {
    if (count < target) {
      const timer = setTimeout(() => {
        setCount((prev) => Math.min(prev + Math.ceil(target / 30), target))
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [count, target])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-8xl lg:text-9xl font-bold text-[#59050D] mb-4">{count}</p>
        <p className="text-2xl lg:text-3xl text-muted-foreground font-light">Students United</p>
      </div>
    </div>
  )
}

// Stat Cards for second page
function StatCards() {
  const [count, setCount] = useState(0)
  const target = 200

  useEffect(() => {
    if (count < target) {
      const timer = setTimeout(() => {
        setCount((prev) => Math.min(prev + Math.ceil(target / 50), target))
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [count, target])

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl p-4 bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center aspect-video">
        <p className="text-4xl font-bold text-white leading-none">{count}</p>
        <p className="text-xs font-medium text-white/80 mt-1 uppercase tracking-wider">Programs</p>
      </div>
      <div className="rounded-xl p-4 bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center aspect-video">
        <p className="text-4xl font-bold text-white/30 leading-none">-</p>
      </div>
      <div className="rounded-xl p-4 bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center aspect-video">
        <p className="text-4xl font-bold text-white/30 leading-none">-</p>
      </div>
      <div className="rounded-xl p-4 bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center aspect-video">
        <p className="text-4xl font-bold text-white/30 leading-none">-</p>
      </div>
    </div>
  )
}

// Carousel for second page
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselImages, setCarouselImages] = useState([
    { id: 1, url: "/images/caliph-20vollyball-20league.webp" },
    {
      id: 2,
      url: "/images/purple-20and-20white-20modern-20geometric-20football-20match-20schedule-20instagram-20post.webp",
    },
  ])

  useEffect(() => {
    const savedImages = localStorage.getItem("carouselImages")
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages)
        setCarouselImages(parsedImages)
      } catch (e) {
        console.error("Error parsing carousel images:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (carouselImages.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [carouselImages.length])

  return (
    <section className="w-screen h-screen relative -mx-[calc((100vw-100%)/2)] overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image.url || "/placeholder.svg"} alt="Carousel" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Carousel content overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Heading */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">A Students Union Initiative</h1>
            <p className="mt-6 text-xl text-white/90 text-balance font-light">
              Empowering the next generation of leaders, innovators, and changemakers.
            </p>
          </div>

          {/* Right side: Stat cards */}
          <div className="max-w-sm mx-auto w-full">
            <StatCards />
          </div>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section: Carousel with heading and stat cards */}
      <Carousel />

      {/* Second Page: Featured Categories */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-foreground mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {homeCards.map((card) => (
              <div
                key={card.id}
                className="rounded-lg p-8 bg-card hover:shadow-lg transition-all cursor-pointer border border-border/50 hover:border-[#59050D]/30"
              >
                <h3 className="text-xl font-semibold text-[#59050D]">{card.title}</h3>
                <p className="mt-6 text-sm text-muted-foreground">{card.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Page: Animated Counter */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <AnimatedCounter />
      </section>

      <Footer />
    </div>
  )
}
