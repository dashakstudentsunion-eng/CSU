import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const startupBenefits = [
  {
    title: "Seed Funding Access",
    description: "Connect with angel investors and venture capitalists ready to support promising ventures.",
  },
  {
    title: "Expert Mentorship",
    description: "Learn from successful entrepreneurs and industry veterans who've scaled businesses.",
  },
  {
    title: "Co-working Space",
    description: "Access premium workspace facilities designed for collaboration and productivity.",
  },
  {
    title: "Legal & Finance Support",
    description: "Navigate the complexities of startup formation with professional guidance.",
  },
]

export default function StartupUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground">Startup Up</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            From idea to impact. Our startup ecosystem provides everything you need to launch and scale.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {startupBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="border border-border rounded-xl p-8 bg-card hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-card-foreground">{benefit.title}</h3>
                <p className="mt-3 text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Ready to Launch?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Apply to our accelerator program and get the support you need to turn your vision into reality.
          </p>
          <Button asChild variant="secondary" className="mt-8 rounded-full px-8">
            <Link href="/caliph-connect">
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
