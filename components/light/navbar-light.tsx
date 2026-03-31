"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  { label: "Home", href: "#home" },
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "Outdoor LED Display", href: "#products" },
      { label: "Indoor LED Display", href: "#products" },
      { label: "Creative LED Display", href: "#products" },
      { label: "Rental LED Display", href: "#products" },
      { label: "Neon LED Signs", href: "#products" },
      { label: "Transparent LED Screen", href: "#products" },
      { label: "Mobile LED Display", href: "#products" },
    ],
  },
  { label: "Solutions", href: "#solutions" },
  { label: "Showcase", href: "#showcase" },
  { label: "Configurator", href: "#configurator" },
  { label: "Contact", href: "#contact" },
]

export function NavbarLight() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { items, setCartOpen } = useCart()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border shadow-sm">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <rect x="2" y="2" width="8" height="8" rx="1.5" fill="white" />
              <rect x="14" y="2" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.7" />
              <rect x="2" y="14" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.7" />
              <rect x="14" y="14" width="8" height="8" rx="1.5" fill="white" fillOpacity="0.4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground font-mono">
            SITE <span className="text-primary">DEMO</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {link.label}
                {link.children && <ChevronDown className="w-3 h-3" />}
              </a>
              {link.children && activeDropdown === link.label && (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-white border border-border rounded-xl shadow-xl overflow-hidden">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            Request a Quote
          </a>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="pl-6">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg shadow-md"
            >
              Request a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
