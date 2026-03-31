"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Zap, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    image: "/images/hero-1.jpg",
    tag: "Next-Gen Technology",
    title: "Illuminate Your Vision",
    subtitle: "with LED Innovation",
    description:
      "Industry-leading LED display solutions engineered for maximum impact. Transform any space into a captivating digital experience.",
    cta: "Explore Products",
    ctaHref: "#products",
    icon: Sparkles,
  },
  {
    image: "/images/hero-2.jpg",
    tag: "Premium Indoor Solutions",
    title: "Crystal Clear",
    subtitle: "Fine Pitch Displays",
    description:
      "Ultra-high resolution indoor LED video walls with seamless integration. Perfect for corporate, retail, and broadcast environments.",
    cta: "View Indoor Displays",
    ctaHref: "#products",
    icon: TrendingUp,
  },
  {
    image: "/images/hero-3.jpg",
    tag: "New Collection",
    title: "Custom Neon",
    subtitle: "LED Signage",
    description:
      "Bespoke neon LED signs crafted to elevate your brand. Energy-efficient, vibrant, and built to last for years of stunning performance.",
    cta: "Design Your Sign",
    ctaHref: "#configurator",
    icon: Zap,
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  const goTo = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const next = () => goTo((current + 1) % slides.length)
  const prev = () => goTo((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const slide = slides[current]
  const Icon = slide.icon

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background with multiple layers */}
      <div className="absolute inset-0">
        {/* Base image slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
              // @ts-ignore
              fetchPriority={i === 0 ? "high" : undefined}
            />
          </div>
        ))}

        {/* Dynamic gradient overlay based on mouse position */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-background/60 to-background/90"
          style={{
            backgroundPosition: `${mousePosition.x * 10}% ${mousePosition.y * 10}%`,
          }}
        />

        {/* Animated gradient orbs for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40 transition-all duration-1000"
            style={{
              left: `${mousePosition.x * 100}%`,
              top: `${mousePosition.y * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-30 animate-float" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="mx-auto max-w-7xl w-full px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 ${
                    i === current
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-[-40px] absolute pointer-events-none"
                  }`}
                >
                  {i === current && (
                    <>
                      {/* Tag with icon */}
                      <div className="inline-flex items-center gap-2 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/40 rounded-full backdrop-blur-sm bg-primary/5 animate-fade-in-down">
                          <Icon className="w-3.5 h-3.5" />
                          {s.tag}
                        </div>
                      </div>

                      {/* Title */}
                      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground mb-2 font-mono text-balance drop-shadow-lg animate-fade-in-down [animation-delay:100ms]">
                        {s.title}
                      </h1>

                      {/* Subtitle with gradient effect */}
                      <div className="relative mb-6">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-primary mb-0 font-mono text-balance drop-shadow-lg animate-fade-in-down [animation-delay:200ms]">
                          {s.subtitle}
                        </h2>
                        <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
                      </div>

                      {/* Description */}
                      <p className="text-lg text-foreground/80 leading-relaxed max-w-lg mb-10 text-pretty drop-shadow-lg animate-fade-in-down [animation-delay:300ms]">
                        {s.description}
                      </p>

                      {/* CTA Buttons with enhanced styling */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-down [animation-delay:400ms]">
                        <a
                          href={s.ctaHref}
                          className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:gap-3 hover:shadow-lg shadow-md"
                        >
                          {s.cta}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 px-7 py-3.5 border border-foreground/20 text-foreground font-semibold rounded-lg hover:bg-foreground/10 hover:border-foreground/40 transition-all backdrop-blur-sm"
                        >
                          Get a Quote
                        </a>
                      </div>

                      {/* Stats or features under buttons */}
                      <div className="mt-12 flex flex-wrap gap-8 text-sm animate-fade-in-down [animation-delay:500ms]">
                        {[
                          { label: "Global Reach", value: "80+ Countries" },
                          { label: "Uptime", value: "99.9%" },
                        ].map((stat) => (
                          <div key={stat.label} className="flex flex-col">
                            <span className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</span>
                            <span className="text-lg font-bold text-foreground">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Visual element (only visible on desktop) */}
            <div className="hidden lg:flex items-center justify-center relative h-full">
              <div className="relative w-full aspect-square max-w-md">
                {/* Floating cards with product info */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Central glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl blur-3xl" />
                    
                    {/* Floating stat cards */}
                    <div className="absolute top-0 right-0 p-4 bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-xl animate-float [animation-delay:0s]">
                      <div className="text-sm font-semibold text-primary">Resolution</div>
                      <div className="text-lg font-bold text-foreground">4K Ready</div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-4 bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-xl animate-float [animation-delay:1s]">
                      <div className="text-sm font-semibold text-primary">Brightness</div>
                      <div className="text-lg font-bold text-foreground">8000+ Nits</div>
                    </div>

                    <div className="absolute top-1/2 right-0 p-4 bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-xl animate-float [animation-delay:2s]">
                      <div className="text-sm font-semibold text-primary">Lifespan</div>
                      <div className="text-lg font-bold text-foreground">100k Hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-6 z-20 hidden sm:flex items-center gap-3">
        <button
          onClick={prev}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-border/50 bg-background/30 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-border/50 bg-background/30 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-6 z-20 hidden sm:flex items-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group flex items-center gap-2 hover:opacity-100 transition-opacity"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className="relative h-1 w-12 bg-foreground/20 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-[6000ms] ease-linear ${
                  i === current ? "w-full" : "w-0"
                }`}
              />
            </div>
            <span
              className={`text-xs font-mono transition-colors ${
                i === current ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
