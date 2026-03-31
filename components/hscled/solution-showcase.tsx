'use client'

export function SolutionShowcase() {
  const showcases = [
    { id: 1, title: "Indoor LED Display", category: "Entertainment" },
    { id: 2, title: "Outdoor Advertising", category: "Commercial" },
    { id: 3, title: "Stadium Display", category: "Sports" },
    { id: 4, title: "Event Production", category: "Events" },
    { id: 5, title: "Retail Signage", category: "Retail" },
    { id: 6, title: "Corporate Display", category: "Business" },
  ]

  return (
    <section className="py-16 px-6 bg-[#26c6da]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">SOLUTION</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            At HSC LED, we provide creative LED displays for advertising media and solutions for customers with different applications and display requirements. Our team works closely with our customers to understand their exact needs and deliver quality products to meet their expectations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((item) => (
            <div key={item.id} className="relative group">
              <div className="bg-gray-300 rounded-lg overflow-hidden h-56 flex items-center justify-center text-gray-400 text-sm cursor-pointer transition-transform group-hover:scale-105">
                {item.title}
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white text-xs font-semibold border border-white/30">
                ✓
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs opacity-75">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
