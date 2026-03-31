"use client"

import { ArrowRight } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-foreground mb-6 text-balance">
          Ready to Transform Your Space with{" "}
          <span className="text-primary">LED Technology?</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          From concept to installation, our team of engineers and designers will bring your vision
          to life. Get started with a free consultation today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#configurator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all hover:gap-3 text-lg"
          >
            Configure & Price
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-md hover:bg-secondary/50 transition-colors text-lg"
          >
            Talk to an Expert
          </a>
        </div>
      </div>
    </section>
  )
}
