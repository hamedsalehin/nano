"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const showcases = [
  {
    image: "/images/showcase-1.jpg",
    title: "Corporate Conference Center",
    location: "New York, USA",
    type: "Indoor LED Video Wall",
  },
  {
    image: "/images/showcase-2.jpg",
    title: "Luxury Retail Flagship",
    location: "London, UK",
    type: "Shop Window LED Display",
  },
  {
    image: "/images/showcase-3.jpg",
    title: "International Stadium",
    location: "Dubai, UAE",
    type: "Perimeter LED Display",
  },
  {
    image: "/images/showcase-4.jpg",
    title: "Airport Digital Signage",
    location: "Tokyo, Japan",
    type: "LED Poster Display",
  },
]

export function ShowcaseSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="showcase" className="relative py-24 bg-grid">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-4">
            Showcase
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-foreground mb-4 text-balance">
            Our Global <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Trusted by businesses across 80+ countries. Explore our recent installations and
            project highlights.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {showcases.map((item, i) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-xl border border-border cursor-pointer ${
                i === 0 || i === 3 ? "md:row-span-1 h-72" : "md:row-span-1 h-72"
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover transition-all duration-700 ${
                  hovered === i ? "scale-110" : "scale-100"
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-500 ${
                  hovered === i ? "opacity-90" : "opacity-70"
                }`}
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                  {item.type}
                </span>
                <h3 className="text-xl font-bold text-foreground font-mono mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.location}</p>
              </div>
              <div
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300 ${
                  hovered === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
