import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const stats = [
  { value: "500+", label: "Leaders Trained" },
  { value: "120+", label: "Startups Launched" },
  { value: "50+", label: "Industry Partners" },
  { value: "15", label: "Countries Reached" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground">About The Hill</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Building tomorrow's leaders and innovators through transformative programs and community.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/7] mb-16">
            <img src="/modern-innovation-hub-interior-with-people-collabo.jpg" alt="The Hill headquarters" className="w-full h-full object-cover" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded on the belief that great leadership and innovation can change the world, The Hill emerged as a
                response to the growing need for comprehensive support systems for emerging leaders and entrepreneurs.
                Our name represents the journey of climbing toward excellence—challenging yet rewarding.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where every aspiring leader has access to the resources, mentorship, and community
                needed to realize their full potential. Through our programs, we're creating a global network of
                change-makers who will drive positive impact in their communities and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-secondary-foreground text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
