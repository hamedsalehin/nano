"use client"

import { useState } from "react"
import { CheckCircle2, ArrowRight } from "lucide-react"

const benefits = [
  {
    number: "01",
    title: "Industry-Leading Quality",
    description: "15+ years of expertise in LED display manufacturing with cutting-edge technology and rigorous quality control standards.",
    stats: "5,000+ installations worldwide",
  },
  {
    number: "02",
    title: "Custom Solutions",
    description: "Tailored designs for unique applications. Our engineers work with you from concept to installation.",
    stats: "100% project customization",
  },
  {
    number: "03",
    title: "Lifetime Support",
    description: "Comprehensive technical support, regular maintenance, and software updates throughout your display lifecycle.",
    stats: "99.9% uptime guarantee",
  },
]

export function BenefitsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-foreground mb-6 text-balance">
            Why Choose Nano Signs
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're not just selling LED displays. We're building partnerships with industry leaders who trust us to transform their spaces.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`group relative p-8 rounded-xl border transition-all duration-300 text-left min-h-80 flex flex-col ${
                activeIndex === index
                  ? "bg-primary/10 border-primary/50 shadow-lg"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              {/* Number badge */}
              <div className="text-sm font-mono font-bold text-primary/60 mb-4 group-hover:text-primary transition-colors">
                {benefit.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-4 font-mono">
                {benefit.title}
              </h3>

              {/* Description - always visible but animated */}
              <div className={`flex-1 transition-all duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-60"
              }`}>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>

              {/* Stats */}
              <div className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 mt-auto ${
                activeIndex === index 
                  ? "text-primary opacity-100" 
                  : "text-muted-foreground opacity-70"
              }`}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                {benefit.stats}
              </div>

              {/* Icon indicator */}
              <ArrowRight className={`w-5 h-5 text-primary absolute top-8 right-8 transition-transform duration-300 ${
                activeIndex === index ? "rotate-90 opacity-100" : "opacity-30"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
