import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    title: "Leadership Excellence",
    duration: "12 weeks",
    description: "Develop core leadership competencies through intensive workshops and real-world projects.",
    features: [
      "Executive coaching sessions",
      "Strategic thinking workshops",
      "Team leadership exercises",
      "Communication mastery",
    ],
  },
  {
    title: "Innovation Sprint",
    duration: "8 weeks",
    description: "Transform innovative ideas into actionable solutions with expert guidance.",
    features: ["Design thinking methodology", "Rapid prototyping", "Market validation", "Pitch development"],
  },
  {
    title: "Startup Accelerator",
    duration: "16 weeks",
    description: "Full-stack support for early-stage startups ready to scale.",
    features: [
      "Seed funding opportunities",
      "Mentor network access",
      "Legal and financial guidance",
      "Demo day presentation",
    ],
  },
]

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground">Our Programs</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Comprehensive programs designed to accelerate your growth and maximize your potential.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="border border-border rounded-2xl p-8 md:p-12 bg-card hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-primary">{program.duration}</span>
                    <h2 className="mt-2 text-2xl font-semibold text-card-foreground">{program.title}</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{program.description}</p>
                    <ul className="mt-6 space-y-3">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="rounded-full px-8 md:self-start">
                    <Link href="/caliph-connect">Apply Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
