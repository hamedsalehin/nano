'use client'

export function NewsSection() {
  const newsItems = [
    {
      id: 1,
      date: "July 10, 2024",
      title: "HSC Management LED Display for Revolutionizing the Museum Experience",
      excerpt: "Explore how our cutting-edge LED display technology is transforming museums worldwide...",
      image: "Featured Article",
      featured: true,
    },
    {
      id: 2,
      date: "February 11, 2024",
      title: "Circular LED Display in China",
      category: "Project",
    },
    {
      id: 3,
      date: "January 25, 2024",
      title: "Vital LED Displays Solution for Museum Experience in Events",
      category: "Solution",
    },
    {
      id: 4,
      date: "January 19, 2024",
      title: "Stadium Displays Brighten Winter Sports Experience in Korea",
      category: "Project",
    },
  ]

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-12">NEWS</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured News */}
          <div className="lg:col-span-2">
            <div className="bg-gray-300 rounded-lg h-80 flex items-center justify-center text-gray-400 mb-6">
              {newsItems[0].image}
            </div>
            <span className="inline-block px-3 py-1 bg-[#26c6da] text-white text-xs font-semibold rounded-full mb-3">
              Featured
            </span>
            <h3 className="text-2xl font-bold text-foreground mb-3">{newsItems[0].title}</h3>
            <p className="text-muted-foreground mb-4">{newsItems[0].excerpt}</p>
            <button className="px-6 py-2 bg-[#26c6da] text-white font-semibold rounded-lg hover:bg-[#26c6da]/90 transition-colors">
              Read More
            </button>
          </div>

          {/* News List */}
          <div className="space-y-6">
            {newsItems.slice(1).map((item) => (
              <div key={item.id} className="pb-6 border-b border-gray-200">
                <span className="text-xs text-muted-foreground">{item.date}</span>
                <h4 className="text-sm font-semibold text-foreground mt-2 line-clamp-2 hover:text-[#26c6da] cursor-pointer transition-colors">
                  {item.title}
                </h4>
                <span className="text-xs text-[#26c6da] mt-2 inline-block">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
