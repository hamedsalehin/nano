"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Projects Completed" },
  { value: 80, suffix: "+", label: "Countries Served" },
  { value: 99.5, suffix: "%", label: "Client Satisfaction" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const stepValue = value / steps
          let current = 0
          const interval = setInterval(() => {
            current += stepValue
            if (current >= value) {
              current = value
              clearInterval(interval)
            }
            setDisplay(current)
          }, duration / steps)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-bold font-mono text-foreground">
      {value % 1 !== 0 ? display.toFixed(1) : Math.floor(display)}
      <span className="text-primary">{suffix}</span>
    </span>
  )
}

export function StatsBar() {
  return (
    <section className="relative border-y border-border bg-secondary/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2 px-4">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <span className="text-sm text-muted-foreground tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
