import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const productLinks = [
  { label: "Mobile Vehicle LED", href: "/products/mobile-truck-led-display" },
  { label: "Creative LED Display", href: "/products/flexible-led-display" },
  { label: "Advertising LED", href: "/products/outdoor-fixed-led-display" },
  { label: "Rental LED Display", href: "/products/outdoor-rental-led-display" },
]

const solutionLinks = [
  "Indoor LED Display",
  "Outdoor LED Display",
  "Stage & Events LED Display",
]

const popularTags = [
  "Digital LED Poster",
  "Taxi Top LED Display",
  "Flexible LED Display",
  "Transparent LED Screen",
  "Cylinder LED Display",
]

export function Footer() {
  return (
    <footer className="bg-card text-muted-foreground border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/nano-logo.png"
                alt="Nano Signs Logo"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span className="text-lg font-bold text-foreground font-mono">
                Nano Signs
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <a href="tel:+13059671005" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                +1 (305) 967-1005
              </a>
              <a href="mailto:info@nano-signs.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                info@nano-signs.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>4567 Powerline Rd, Oakland Park, FL, USA</span>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              {["N", "A", "N", "O"].map((letter, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label={`Social link ${index + 1}`}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider font-mono text-foreground">
              Products
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider font-mono text-foreground">
              Solutions
            </h3>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link}>
                  <a href="#solutions" className="text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider font-mono text-foreground">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <a
                  key={tag}
                  href="#products"
                  className="rounded-md border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary transition-colors bg-secondary/20"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            Copyright {new Date().getFullYear()} Nano Signs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
