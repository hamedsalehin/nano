'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function SuccessCases() {
  const cases = [
    { id: 1, title: "Restaurant Display", region: "Asia" },
    { id: 2, title: "Flexible LED Display in Italy", region: "Europe" },
    { id: 3, title: "Shopping Mall Screen", region: "USA" },
    { id: 4, title: "Concert Stage LED", region: "Asia" },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % cases.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length)
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-12">SUCCESS CASES</h2>

        <div className="flex justify-center gap-4 mb-12">
          {cases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-10 h-10 rounded-full transition-all ${
                idx === activeIndex
                  ? 'bg-[#26c6da] text-white'
                  : 'bg-gray-300 text-gray-500 hover:bg-gray-400'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center text-gray-400 mb-8 relative">
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
          {cases[activeIndex].title}
        </div>

        <p className="text-center text-muted-foreground text-sm">{cases[activeIndex].region}</p>
      </div>
    </section>
  )
}
