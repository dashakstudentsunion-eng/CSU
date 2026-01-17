"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ImageIcon,
  Trash2,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Users", icon: Users, active: false },
  { name: "Events", icon: Calendar, active: false },
  { name: "Content", icon: FileText, active: false },
  { name: "Carousel Images", icon: ImageIcon, active: false },
  { name: "Homepage Hero Images", icon: ImageIcon, active: false },
  { name: "Settings", icon: Settings, active: false },
]

// ... (stats, recentActivity remains same)

export default function AdminDashboardPage() {
  // ... (previous states)
  const [heroImages, setHeroImages] = useState<Array<{ id: number; url: string; position: number }>>([])

  useEffect(() => {
    // ... (auth check)
    if (isAuthed) {
      const fetchHeroImages = async () => {
        try {
          const res = await fetch("/api/hero-images")
          if (res.ok) {
            const data = await res.json()
            setHeroImages(data)
          }
        } catch (e) {
          console.error("Error fetching hero images:", e)
        }
      }
      fetchHeroImages()
    }
  }, [isAuthed])

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const base64 = event.target?.result as string
        try {
          const res = await fetch("/api/hero-images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: base64, position }),
          })
          if (res.ok) {
            const updated = await res.json()
            setHeroImages((prev) => {
              const filtered = prev.filter(img => img.position !== position)
              return [...filtered, updated].sort((a, b) => a.position - b.position)
            })
          }
        } catch (e) {
          console.error("Error saving hero image:", e)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Render hero section in main content
  const renderHeroContent = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#59050D]">Homepage Hero Images</h1>
        <p className="mt-1 text-muted-foreground">Manage exactly 3 images for the interactive hero stack</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((pos) => {
          const img = heroImages.find(i => i.position === pos)
          return (
            <div key={pos} className="bg-card border border-border rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-sm font-medium mb-4">Position {pos + 1}</h3>
              <div className="w-full aspect-square bg-secondary/50 rounded-lg overflow-hidden mb-4 border border-border">
                {img ? (
                  <img src={img.url} alt={`Hero ${pos}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground italic text-xs">
                    No image
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleHeroUpload(e, pos)}
                className="text-xs w-full"
              />
            </div>
          )
        })}
      </div>
    </>
  )

  // ... Update main content switch to include activeTab === "homepage-hero-images"


const stats = [
  { label: "Total Users", value: "1,234", change: "+12%" },
  { label: "Active Programs", value: "8", change: "+2" },
  { label: "Applications", value: "56", change: "+23" },
  { label: "Events This Month", value: "12", change: "+4" },
]

const recentActivity = [
  { action: "New application received", user: "Sarah Johnson", time: "2 hours ago" },
  { action: "Program enrollment completed", user: "Mike Chen", time: "4 hours ago" },
  { action: "Event registration", user: "Emma Wilson", time: "6 hours ago" },
  { action: "Content published", user: "Admin", time: "1 day ago" },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [carouselImages, setCarouselImages] = useState<Array<{ id: number; url: string }>>([
    {
      id: 1,
      url: "/images/caliph-20vollyball-20league.webp",
    },
    {
      id: 2,
      url: "/images/purple-20and-20white-20modern-20geometric-20football-20match-20schedule-20instagram-20post.webp",
    },
  ])
  const [showAddImageForm, setShowAddImageForm] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/admin/verify")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const base64 = event.target?.result as string
        try {
          const res = await fetch("/api/carousel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: base64 }),
          })
          if (res.ok) {
            const newImage = await res.json()
            setCarouselImages((prev) => [...prev, newImage])
            setShowAddImageForm(false)
          }
        } catch (e) {
          console.error("Error saving image:", e)
        }
        e.target.value = ""
      }
      reader.readAsDataURL(file)
    }
  }

  const deleteCarouselImage = async (id: number) => {
    try {
      const res = await fetch(`/api/carousel?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setCarouselImages((prev) => prev.filter((img) => img.id !== id))
      }
    } catch (e) {
      console.error("Error deleting image:", e)
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/carousel")
        if (res.ok) {
          const data = await res.json()
          setCarouselImages(data)
        }
      } catch (e) {
        console.error("Error fetching carousel images:", e)
      }
    }
    if (isAuthed) {
      const interval = setInterval(fetchImages, 1000)
      return () => clearInterval(interval)
    }
  }, [isAuthed])

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth")
    router.push("/")
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/" className="font-semibold text-lg text-foreground">
              The Hill
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:block">/ Admin Panel</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-64 bg-card border-r border-border p-4 transition-transform lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name.toLowerCase().replace(" ", "-"))
                setIsSidebarOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                activeTab === item.name.toLowerCase().replace(" ", "-") || item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">
          {activeTab === "dashboard" ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                <p className="mt-1 text-muted-foreground">Welcome to The Hill admin panel</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card border border-border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold text-card-foreground">{stat.value}</span>
                      <span className="text-sm text-primary">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Sections */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-semibold text-card-foreground mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between py-3 border-b border-border last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="text-sm text-card-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-semibold text-card-foreground mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    {["Create New Program", "Add Event", "Review Applications", "Publish Content"].map((action) => (
                      <button
                        key={action}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
                      >
                        <span className="text-sm text-card-foreground">{action}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reserved Section */}
              <div className="mt-8 bg-secondary/50 border border-dashed border-border rounded-xl p-12 text-center">
                <p className="text-muted-foreground text-sm">Reserved for future content management features</p>
              </div>
            </>
          ) : activeTab === "homepage-hero-images" ? (
            renderHeroContent()
          ) : activeTab === "carousel-images" ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-foreground">Carousel Images</h1>
                <p className="mt-1 text-muted-foreground">Manage images displayed on the home page carousel</p>
              </div>

              {/* Carousel Images Management */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-card-foreground">Homepage Carousel</h2>
                  <Button size="sm" onClick={() => setShowAddImageForm(!showAddImageForm)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Image
                  </Button>
                </div>

                {/* Add Image Form */}
                {showAddImageForm && (
                  <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Upload Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="mt-2 block w-full text-sm text-card-foreground
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary file:text-primary-foreground
                            hover:file:bg-primary/90"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => setShowAddImageForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {carouselImages.length > 0 ? (
                    carouselImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative group border border-border rounded-lg overflow-hidden bg-secondary/50"
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt="Carousel"
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-end justify-end p-2 opacity-0 group-hover:opacity-100">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteCarouselImage(image.id)}
                            className="w-full"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground col-span-full text-center py-8">
                      No carousel images added yet. Click "Add Image" to get started.
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <p className="text-muted-foreground">This section is under development</p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
