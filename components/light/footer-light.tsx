import { ArrowUpRight } from "lucide-react"

const productLinks = [
  "Outdoor LED Display",
  "Indoor LED Display",
  "Creative LED Display",
  "Rental LED Display",
  "Neon LED Signs",
  "Transparent LED Screen",
  "Mobile LED Display",
]

const solutionLinks = [
  "Outdoor Advertising",
  "Corporate & Conference",
  "Stage & Events",
  "Retail & Commercial",
  "Sports & Stadiums",
]

const companyLinks = [
  "About Us",
  "Our Team",
  "Careers",
  "News & Blog",
  "Case Studies",
]

export function FooterLight() {
  return (
    <footer className="relative bg-[#0f1419] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#0077cc]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <rect x="2" y="2" width="8" height="8" rx="1.5" fill="white" />
                  <rect x="14" y="2" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.7" />
                  <rect x="2" y="14" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.7" />
                  <rect x="14" y="14" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="text-lg font-bold font-mono text-white">
                SITE <span className="text-[#0077cc]">DEMO</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 text-pretty">
              Industry-leading LED display technology and solutions. Transform any space into a
              captivating digital experience.
            </p>
            <div className="flex gap-3">
              {["facebook", "linkedin", "youtube", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#0077cc] hover:text-white transition-colors"
                  aria-label={social}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold font-mono text-white mb-4 uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#products"
                    className="text-sm text-white/50 hover:text-[#0077cc] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-bold font-mono text-white mb-4 uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#solutions"
                    className="text-sm text-white/50 hover:text-[#0077cc] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold font-mono text-white mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/50 hover:text-[#0077cc] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Site Demo. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-white/40 hover:text-[#0077cc] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
