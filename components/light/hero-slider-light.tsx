"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
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
  },
]

export function HeroSliderLight() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
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

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Light overlay with white wash */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl w-full px-6">
          <div className="max-w-2xl">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  i === current
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute pointer-events-none"
                }`}
              >
                {i === current && (
                  <>
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-6 bg-white/60 backdrop-blur-sm">
                      {slide.tag}
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground mb-2 font-mono text-balance">
                      {slide.title}
                    </h1>
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-primary mb-6 font-mono text-balance">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8 text-pretty">
                      {slide.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <a
                        href={slide.ctaHref}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:gap-3 shadow-lg shadow-primary/20"
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary/50 transition-colors bg-white/60 backdrop-blur-sm"
                      >
                        Get a Quote
                      </a>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-6 z-20 flex items-center gap-3">
        <button
          onClick={prev}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-border bg-white/70 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-border bg-white/70 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-6 z-20 flex items-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group flex items-center gap-2"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className="relative h-0.5 w-12 bg-foreground/10 rounded-full overflow-hidden">
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
