"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Program", href: "/program" },
  { name: "Meet the Hill", href: "/meet-the-hill" },
  { name: "Caliph Connect", href: "/caliph-connect" },
  { name: "Startup", href: "/startup-up" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [keySequence, setKeySequence] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const [isNavFocused, setIsNavFocused] = useState(false)

  // Hidden admin access - typing "4747" when nav is focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavFocused) {
        const newSequence = (keySequence + e.key).slice(-4)
        setKeySequence(newSequence)

        if (newSequence === "4747") {
          router.push("/admin/verify")
          setKeySequence("")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keySequence, isNavFocused, router])

  return (
    <nav
      ref={navRef}
      tabIndex={0}
      onFocus={() => setIsNavFocused(true)}
      onBlur={() => setIsNavFocused(false)}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors",
                  pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase transition-colors",
                    pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
