'use client'

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              SHENZHEN HSC<br />ELECTRONICS CO.LTD
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              We are professional manufacturer of LED display and advertising media with over 10 years industry experience. We had developed many new patent products and scientific management to reach the international standard level and our products exported to Europe, North America, Southeast Asia, and established long-term cooperative relationships with partners worldwide.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Thanks for your complete and great support from our clients, we will have more positive and lasting relationships with each other into the future and through the years and continuously.
            </p>
            <button className="px-8 py-3 bg-[#26c6da] hover:bg-[#26c6da]/90 text-white font-semibold rounded-lg transition-colors">
              Know More
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden h-96">
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                Featured Image
              </div>
            </div>
            <div className="absolute bottom-6 right-6 bg-[#26c6da] text-white rounded-lg p-4 shadow-lg">
              <div className="text-3xl font-bold">10</div>
              <div className="text-xs font-semibold">years</div>
              <div className="text-xs opacity-90">experience in</div>
              <div className="text-xs">manufacturing and</div>
              <div className="text-xs">distributing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
