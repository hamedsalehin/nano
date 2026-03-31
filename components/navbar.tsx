"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, ShoppingCart, ChevronDown, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { ThemeToggle } from "./theme-toggle"

/* ─── data ─────────────────────────────────────────────── */
const productNav = [
  {
    category: "Creative",
    items: [
      { label: "Cylinder LED", href: "/products/cylinder-led-display" },
      { label: "Digital LED Poster", href: "/products/digital-led-poster" },
      { label: "Flexible LED", href: "/products/flexible-led-display" },
      { label: "Sphere LED", href: "/products/sphere-led-display" },
      { label: "Cube LED", href: "/products/cube-led-display" },
      { label: "Hexagon LED", href: "/products/hexagon-led-screen" },
      { label: "Round Circle LED", href: "/products/round-circle-led-display" },
      { label: "Triangle LED", href: "/products/triangle-led-display" },
      { label: "LED Pillar", href: "/products/led-pillar-display" },
    ],
  },
  {
    category: "Advertising",
    items: [
      { label: "Shop Window LED", href: "/products/shop-window-led" },
      { label: "Transparent LED", href: "/products/transparent-led-screen" },
      { label: "LED Curtain", href: "/products/led-curtain-display" },
      { label: "Outdoor Fixed LED", href: "/products/outdoor-fixed-led-display" },
      { label: "Indoor LED", href: "/products/indoor-led-display" },
      { label: "Pharmacy Cross LED", href: "/products/pharmacy-cross-led-display" },
      { label: "Outdoor LED Totem", href: "/products/outdoor-led-totem-display" },
      { label: "Outdoor LED Poster", href: "/products/outdoor-led-poster-display" },
      { label: "Light Pole LED", href: "/products/light-pole-led-display" },
    ],
  },
  {
    category: "Rental",
    items: [
      { label: "Outdoor Rental", href: "/products/outdoor-rental-led-display" },
      { label: "Indoor Rental", href: "/products/indoor-rental-led" },
      { label: "LED Dance Floor", href: "/products/led-dance-floor" },
      { label: "Stadium LED", href: "/products/stadium-perimeter-led" },
      { label: "DJ Booth LED", href: "/products/dj-booth-led-screen" },
      { label: "Digital Shelf LED", href: "/products/digital-shelf-led-display" },
    ],
  },
  {
    category: "Vehicle",
    items: [
      { label: "Taxi Top LED", href: "/products/taxi-top-led-display" },
      { label: "Truck LED", href: "/products/mobile-truck-led-display" },
      { label: "Bus LED", href: "/products/mobile-bus-led" },
      { label: "Delivery Box LED", href: "/products/food-delivery-box-led" },
    ],
  },
]

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products", isMega: true },
  { label: "Solutions", href: "/#solutions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Configurator", href: "/#configurator" },
  { label: "Contact", href: "/#contact" },
]

/* ─── component ─────────────────────────────────────────── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  const { items, setCartOpen } = useCart()
  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  /* close drawer when resizing to desktop */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])

  /* lock body scroll while drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileProductsOpen(false)
  }, [])

  /* navbar height used for drawer offset */
  const NAV_H = 52

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/40"
      style={{ height: NAV_H }}
    >
      {/* ── top bar ──────────────────────────────────────── */}
      <nav className="mx-auto max-w-screen-xl h-full flex items-center justify-between px-3 sm:px-5">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0 mr-2">
          <Image
            src="/nano-logo.png"
            alt="Nano Signs"
            width={28} height={28}
            className="h-7 w-auto"
            priority={true}
            fetchPriority="high"
          />
          <span className="text-base font-bold tracking-tight font-mono hidden xs:inline">
            Nano<span className="text-primary">Signs</span>
          </span>
        </a>

        {/* Desktop links (≥1024px) */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.isMega && setMegaOpen(true)}
              onMouseLeave={() => link.isMega && setMegaOpen(false)}
            >
              <a
                href={link.href}
                className="flex items-center gap-0.5 px-3 py-1.5 text-[13px] font-medium
                           text-muted-foreground hover:text-foreground rounded-md
                           hover:bg-secondary/50 transition-colors whitespace-nowrap"
              >
                {link.label}
                {link.isMega && (
                  <ChevronDown
                    className={`w-3 h-3 mt-px transition-transform duration-200
                                ${megaOpen ? "rotate-180" : ""}`}
                  />
                )}
              </a>

              {/* Mega menu */}
              {link.isMega && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2
                              transition-all duration-200 origin-top
                              ${megaOpen
                      ? "opacity-100 scale-y-100 pointer-events-auto"
                      : "opacity-0 scale-y-95 pointer-events-none"}`}
                  style={{ width: "min(780px, 96vw)" }}
                >
                  <div className="bg-card/98 backdrop-blur-2xl border border-border
                                  rounded-xl shadow-2xl p-5 grid grid-cols-4 gap-5">
                    {productNav.map((cat) => (
                      <div key={cat.category}>
                        <p className="text-[9px] font-bold uppercase tracking-widest
                                      text-primary mb-2.5 pb-1.5 border-b border-border/30">
                          {cat.category}
                        </p>
                        <ul className="space-y-1.5">
                          {cat.items.map((item) => (
                            <li key={item.label}>
                              <a
                                href={item.href}
                                onClick={() => setMegaOpen(false)}
                                className="block text-[12px] text-muted-foreground
                                           hover:text-foreground hover:translate-x-0.5
                                           transition-all leading-snug"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-2">
          <ThemeToggle />

          <Link
            href="/login"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-[13px]
                       font-medium text-muted-foreground hover:text-foreground
                       rounded-md hover:bg-secondary/50 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            Login
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-1.5 rounded-md hover:bg-secondary/50 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary
                               text-primary-foreground text-[9px] font-bold rounded-full
                               flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-3 py-1.5
                       bg-primary text-primary-foreground text-[12px] font-semibold
                       rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Get a Quote
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-md hover:bg-secondary/50 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-foreground" />
              : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────── */}

      {/* backdrop */}
      <div
        aria-hidden
        onClick={closeMobile}
        className={`lg:hidden fixed inset-x-0 bottom-0 bg-black/40 backdrop-blur-[2px]
                    transition-opacity duration-300
                    ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ top: NAV_H }}
      />

      {/* panel */}
      <div
        className={`lg:hidden fixed inset-x-0 bg-background border-b border-border
                    overflow-y-auto overscroll-contain
                    transition-all duration-300 ease-out
                    ${mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"}`}
        style={{ top: NAV_H, maxHeight: `calc(100dvh - ${NAV_H}px)` }}
      >
        <div className="p-3 space-y-0.5">

          {/* Nav links */}
          {navLinks.map((link) =>
            link.isMega ? (
              <div key={link.label}>
                {/* accordion trigger */}
                <button
                  onClick={() => setMobileProductsOpen((v) => !v)}
                  aria-expanded={mobileProductsOpen}
                  className="w-full flex items-center justify-between
                             px-3 py-2.5 text-sm font-medium
                             text-muted-foreground hover:text-foreground
                             rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300
                                ${mobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* accordion body */}
                <div
                  className={`overflow-hidden transition-all duration-300
                              ${mobileProductsOpen ? "max-h-[1800px]" : "max-h-0"}`}
                >
                  <div className="mx-3 mt-1 mb-2 pl-3 border-l-2 border-primary/30 space-y-3 py-2">
                    {productNav.map((cat) => (
                      <div key={cat.category}>
                        <p className="text-[9px] font-bold uppercase tracking-widest
                                      text-primary mb-1.5">
                          {cat.category}
                        </p>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          {cat.items.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              onClick={closeMobile}
                              className="py-1 text-[11px] text-muted-foreground
                                         hover:text-foreground transition-colors leading-tight"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="flex items-center px-3 py-2.5 text-sm font-medium
                           text-muted-foreground hover:text-foreground
                           rounded-lg hover:bg-secondary/50 transition-colors"
              >
                {link.label}
              </a>
            )
          )}

          {/* bottom CTA */}
          <div className="pt-2 mt-1 border-t border-border/40 flex flex-col gap-1.5">
            <Link
              href="/login"
              onClick={closeMobile}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium
                         text-muted-foreground hover:text-foreground
                         rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <User className="w-4 h-4" />
              Login / Panel
            </Link>
            <a
              href="#contact"
              onClick={closeMobile}
              className="flex items-center justify-center px-4 py-2.5
                         bg-primary text-primary-foreground text-sm font-semibold
                         rounded-lg hover:bg-primary/90 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
