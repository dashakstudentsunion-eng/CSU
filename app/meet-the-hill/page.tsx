import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const team = [
  {
    name: "Sarah Chen",
    role: "Executive Director",
    image: "/professional-woman-executive-portrait-headshot.jpg",
  },
  {
    name: "Marcus Williams",
    role: "Program Lead",
    image: "/professional-man-business-portrait-headshot.jpg",
  },
  {
    name: "Aisha Patel",
    role: "Innovation Director",
    image: "/professional-woman-tech-leader-portrait-headshot.jpg",
  },
  {
    name: "James Okonkwo",
    role: "Startup Mentor",
    image: "/professional-man-entrepreneur-portrait-headshot.jpg",
  },
]

export default function MeetTheHillPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground">Meet the Hill</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Our dedicated team of professionals is committed to nurturing the next generation of leaders.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-secondary-foreground mb-8">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground leading-relaxed">
                The Hill is a transformative platform where brands and individuals come to define who they are, sharpen
                their vision, and carve out what's next. We help leaders find their voice through strategic guidance and
                comprehensive mentorship.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Because when life and work move in sync, the best ideas don't just happen—they flow. That's why we
                created our unique approach: a new way to pause, reset, and spark the thinking that fuels not just
                careers, but whole ways of being.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
