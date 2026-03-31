"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

const featureCompare = [
  { feature: "4K Resolution Support", nano: true, competitors: false },
  { feature: "IP65 Waterproof Rating", nano: true, competitors: true },
  { feature: "10+ Year Lifespan", nano: true, competitors: false },
  { feature: "24/7 Global Support", nano: true, competitors: false },
  { feature: "Modular Installation", nano: true, competitors: true },
  { feature: "Energy Efficient (50% less)", nano: true, competitors: false },
]

export function FeatureShowcase() {
  const [showComparison, setShowComparison] = useState(false)

  return (
    <section className="relative py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-foreground mb-6 text-balance">
            Superior Technology, Superior Value
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            See what sets our LED displays apart from the competition. More features, better reliability, and genuine support.
          </p>

          {/* Toggle */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg"
          >
            {showComparison ? "Hide Comparison" : "Show Comparison"}
          </button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div className="space-y-3 animate-fade-in-down">
            {featureCompare.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-4 p-5 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="font-semibold text-foreground">{item.feature}</div>
                <div className="flex items-center justify-center">
                  {item.nano ? (
                    <div className="flex items-center gap-2 text-primary">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">Yes</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <X className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {item.competitors ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <X className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feature Grid Alternative */}
        {!showComparison && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCompare.slice(0, 6).map((item, i) => (
              <div
                key={i}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.feature}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.feature.includes("4K") && "Crystal clear visuals for any application"}
                      {item.feature.includes("Waterproof") && "All-weather protection and durability"}
                      {item.feature.includes("Year") && "Guaranteed performance for a decade"}
                      {item.feature.includes("Support") && "Expert assistance whenever you need"}
                      {item.feature.includes("Modular") && "Quick and easy assembly process"}
                      {item.feature.includes("Energy") && "Lower operational costs and carbon footprint"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
