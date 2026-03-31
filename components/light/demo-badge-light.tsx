"use client"

import { useState } from "react"

export function DemoBadgeLight() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          relative cursor-pointer select-none overflow-hidden
          bg-white backdrop-blur-xl border border-border
          transition-all duration-500 ease-out
          ${hovered
            ? "w-52 h-20 rounded-2xl shadow-xl"
            : "w-12 h-12 rounded-full shadow-lg"
          }
        `}
      >
        {/* Ring on circle */}
        <div
          className={`
            absolute inset-0 rounded-full border border-primary/40
            transition-opacity duration-500
            ${hovered ? "opacity-0" : "opacity-100 animate-glow-pulse"}
          `}
        />

        {/* Small circle content */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            transition-opacity duration-300
            ${hovered ? "opacity-0" : "opacity-100"}
          `}
        >
          <span className="text-[10px] font-bold tracking-wider text-primary font-mono uppercase">
            D
          </span>
        </div>

        {/* Expanded content */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center gap-1 px-4
            transition-all duration-500 delay-100
            ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <span className="text-xs font-bold tracking-[0.3em] text-primary font-mono uppercase">
            Demo
          </span>
          <div className="w-8 h-px bg-primary/30" />
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            Developed By{" "}
            <span className="text-foreground font-medium">Omid Marzbani</span>
          </span>
        </div>
      </div>
    </div>
  )
}
