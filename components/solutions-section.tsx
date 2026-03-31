"use client"

import Image from "next/image"
import {
  ArrowRight,
  Music,
  Trophy,
  Layout,
  Presentation,
  ShoppingBag,
  Church,
} from "lucide-react"

const solutions = [
  {
    icon: Music,
    title: "Stage",
    desc: "Create illusive effects for concert and theatre with LED video walls.",
    image: "/images/stage-led.jpg",
  },
  {
    icon: Trophy,
    title: "Sport",
    desc: "High-quality motion images reach the audience in stadiums.",
    image: "/images/sports-led.jpg",
  },
  {
    icon: Layout,
    title: "Exhibition",
    desc: "Best possible exposure to your audiences at trade shows.",
    image: "/images/exhibition-led.jpg",
  },
  {
    icon: Presentation,
    title: "Conference",
    desc: "Creating optimum environments for employees and clients.",
    image: "/images/conference-led.jpg",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    desc: "Customers get more satisfaction and engagement at the scene.",
    image: "/images/transparent-led.jpg", // Reusing image as per user req
  },
  {
    icon: Church,
    title: "Church",
    desc: "Grow in the faith through hymn, scripture and visual media.",
    image: "/images/church-led.jpg",
  },
]

export function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-24 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-4">
            Solutions
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-foreground mb-4 text-balance">
            Built for Every <span className="text-primary">Industry</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Our LED solutions are engineered and customized for diverse applications across industries
            worldwide.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol) => (
            <div
              key={sol.title}
              className="group bg-card rounded-xl border border-border overflow-hidden card-glow transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <sol.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 font-mono">
                  {sol.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 text-pretty line-clamp-2 group-hover:line-clamp-none transition-all">
                  {sol.desc}
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
