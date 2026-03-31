"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Play } from "lucide-react"

// You can edit this array to add or remove your projects!
// Replace the images with your real project files in the /public/images folder.
const galleryItems = [
  {
    id: 1,
    title: "Times Square Billboard Array",
    category: "Outdoor",
    image: "/images/products/outdoor-fixed-led-display.jpg",
    description: "Massive P4 Outdoor Fixed LED installation covering 200sqm.",
  },
  {
    id: 2,
    title: "Miami Ultra Music Festival",
    category: "Events",
    image: "/images/products/outdoor-rental-led-display.jpg",
    description: "Rental LED panels mapped symmetrically for a high-energy DJ set.",
  },
  {
    id: 3,
    title: "New York Corporate Lobby",
    category: "Indoor",
    image: "/images/products/indoor-rental-led-display.jpg",
    description: "Seamless P1.8 Fine Pitch display welcoming corporate visitors.",
  },
  {
    id: 4,
    title: "Retail Window Shopping",
    category: "Transparent",
    image: "/images/products/transparent-led-screen.jpg",
    description: "High-transparency film screen allowing natural light while showing ads.",
  },
  {
    id: 5,
    title: "Custom Sphere Installation",
    category: "Creative",
    image: "/images/products/sphere-led-display.jpg",
    description: "360-degree floating sphere for a modern art museum.",
  },
  {
    id: 6,
    title: "Touring Stage Setup",
    category: "Events",
    image: "/images/products/flexible-led-display.jpg",
    description: "Curved and flexible modules shaping a futuristic stage.",
  },
  {
    id: 7,
    title: "Restaurant Facade",
    category: "Outdoor",
    image: "/images/products/outdoor-led-poster-display.jpg",
    description: "A waterproof digital poster for curb-side restaurant menus.",
  },
  {
    id: 8,
    title: "Pharmacy Digital Cross",
    category: "Creative",
    image: "/images/products/pharmacy-cross-led-display.jpg",
    description: "Programmable double-sided cross to attract pedestrian traffic.",
  },
  {
    id: 9,
    title: "LED Dance Floor Experience",
    category: "Events",
    image: "/images/products/led-dance-floor.jpg",
    description: "Interactive LED dance floor that responds to movement and music in real time.",
  },
  {
    id: 10,
    title: "Hexagon Creative Display",
    category: "Creative",
    image: "/images/products/hexagon-led-screen.jpg",
    description: "Modular hexagon LED panels arranged into a stunning creative art installation.",
  },
  {
    id: 11,
    title: "Shop Window Display",
    category: "Transparent",
    image: "/images/products/shop-window-led-display.jpg",
    description: "High-brightness shop window LED screen driving foot traffic to retail stores.",
  },
  {
    id: 12,
    title: "Outdoor LED Totem",
    category: "Outdoor",
    image: "/images/products/outdoor-led-totem-display.jpg",
    description: "Double-sided weatherproof LED totem for wayfinding and brand communication.",
  },
  {
    id: 13,
    title: "Mobile Truck Billboard",
    category: "Outdoor",
    image: "/images/products/mobile-truck-led-display.jpg",
    description: "Full-motion LED truck display for mobile advertising campaigns across the city.",
  },
  {
    id: 14,
    title: "Cylinder LED Landmark",
    category: "Creative",
    image: "/images/products/can-shape-cylinder-led-display.jpg",
    description: "360° cylindrical LED screen used as a landmark display in shopping malls.",
  },
  {
    id: 15,
    title: "LED Curtain Stage Backdrop",
    category: "Events",
    image: "/images/products/led-curtain-display.JPG",
    description: "Transparent LED curtain screen creating a dramatic backdrop for live performances.",
  },
]

const categories = ["All", "Outdoor", "Indoor", "Events", "Creative", "Transparent"]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredItems = 
    activeTab === "All" 
      ? galleryItems 
      : galleryItems.filter((item) => item.category === activeTab)

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <div className="relative py-24 bg-card border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-50"></div>
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-6">
              Project Portfolio
            </span>
            <h1 className="text-4xl lg:text-6xl font-black font-mono text-foreground mb-6 uppercase tracking-tight">
              Our <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Explore our vast portfolio of previous installations and past projects showcasing
              our industry-leading LED screens out in the real world.
            </p>
          </div>
        </div>

        {/* Gallery Content */}
        <div className="mx-auto max-w-7xl px-6 py-20">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeTab === cat
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                    : "bg-secondary text-muted-foreground border border-border hover:border-primary hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content appearing on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 flex flex-col justify-end">
                    <span className="text-primary text-[10px] uppercase font-black tracking-widest mb-2 drop-shadow-md">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-mono leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 text-pretty">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found for this category yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
