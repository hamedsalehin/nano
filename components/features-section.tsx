"use client"

import { Shield, Zap, Truck, Headphones, Award, Wrench } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Ultra High Brightness",
    desc: "Up to 10,000 nits for crystal-clear visibility even in direct sunlight.",
  },
  {
    icon: Shield,
    title: "IP65 Waterproof",
    desc: "Military-grade protection against water, dust, and extreme weather conditions.",
  },
  {
    icon: Award,
    title: "3-Year Warranty",
    desc: "Full coverage warranty with free replacement parts and technical support.",
  },
  {
    icon: Truck,
    title: "Global Shipping",
    desc: "Free worldwide logistics with door-to-door delivery and customs clearance.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock technical assistance via phone, email, and live chat.",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    desc: "Modular design with tool-free assembly. Professional installation guides included.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-20 border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group flex items-start gap-4 p-8 bg-card transition-colors hover:bg-secondary/30"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <feat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1 font-mono">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
