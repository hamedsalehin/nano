"use client"

import { Award, Globe, Shield, Users } from "lucide-react"

const trusts = [
  {
    icon: Award,
    label: "ISO Certified",
    description: "ISO 9001:2015 quality management",
  },
  {
    icon: Globe,
    label: "Global Presence",
    description: "Serving 80+ countries worldwide",
  },
  {
    icon: Shield,
    label: "Secure & Safe",
    description: "Military-grade reliability standards",
  },
  {
    icon: Users,
    label: "5000+ Happy Clients",
    description: "Trusted by leading businesses",
  },
]

export function TrustSection() {
  return (
    <section className="relative py-16 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trusts.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
