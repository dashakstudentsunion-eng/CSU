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
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Users", icon: Users },
  { name: "Events", icon: Calendar },
  { name: "Content", icon: FileText },
  { name: "Homepage Hero Images", icon: ImageIcon },
  { name: "Union Messages", icon: FileText },
  { name: "Settings", icon: Settings },
]

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
  const [heroImages, setHeroImages] = useState<Array<{ id: number; url: string; position: number }>>([])
  const [unionMessages, setUnionMessages] = useState<Array<{ id: number; name: string; phone: string; email: string; batch: string; createdAt: string }>>([])

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/admin/verify")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  useEffect(() => {
    if (isAuthed) {
      const fetchData = async () => {
        try {
          const [heroRes, messagesRes] = await Promise.all([
            fetch("/api/hero-images"),
            fetch("/api/union-messages")
          ])
          
          if (heroRes.ok) {
            const data = await heroRes.json()
            setHeroImages(data)
          }
          if (messagesRes.ok) {
            const data = await messagesRes.json()
            setUnionMessages(data)
          }
        } catch (e) {
          console.error("Error fetching admin data:", e)
        }
      }
      fetchData()
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

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth")
    router.push("/")
  }

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

  const renderUnionMessages = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#59050D]">Union Messages</h1>
        <p className="mt-1 text-muted-foreground">Review all submissions from the "Connect With Union" form</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Batch</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {unionMessages.length > 0 ? (
                unionMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{msg.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{msg.phone}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{msg.email}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{msg.batch}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                    No messages received yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
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
                setActiveTab(item.name.toLowerCase().replace(/\s+/g, "-"))
                setIsSidebarOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                activeTab === item.name.toLowerCase().replace(/\s+/g, "-")
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

      <main className="pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">
          {activeTab === "dashboard" ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                <p className="mt-1 text-muted-foreground">Welcome to The Hill admin panel</p>
              </div>
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
              <div className="grid lg:grid-cols-2 gap-6">
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
            </>
          ) : activeTab === "homepage-hero-images" ? (
            renderHeroContent()
          ) : activeTab === "union-messages" ? (
            renderUnionMessages()
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <p className="text-muted-foreground">This section is under development</p>
            </div>
          )}
        </div>
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
