import Link from "next/link"

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Program", href: "/program" },
    { name: "Meet the Hill", href: "/meet-the-hill" },
  ],
  connect: [
    { name: "Caliph Connect", href: "/caliph-connect" },
    { name: "Startup", href: "/startup-up" },
    { name: "About", href: "/about" },
  ],
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com/school/caliphlifeschool/posts/?feedView=all" },
    { name: "Instagram", href: "https://www.instagram.com/life.at.caliph/" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">The Hill</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Empowering the next generation of leaders and innovators.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium mb-4 text-background/90">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium mb-4 text-background/90">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-medium mb-4 text-background/90">Social</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20">
          <p className="text-sm text-background/60 text-center">
            © {new Date().getFullYear()} The Hill. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
