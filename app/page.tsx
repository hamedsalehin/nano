import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSlider } from "@/components/hero-slider"
import { StatsBar } from "@/components/stats-bar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { DemoBadge } from "@/components/demo-badge"

import { ProductsSection } from "@/components/products-section"
import { FeaturesSection } from "@/components/features-section"
import { BenefitsSection } from "@/components/benefits-section"
import { FeatureShowcase } from "@/components/feature-showcase"
import { TrustSection } from "@/components/trust-section"
import { SolutionsSection } from "@/components/solutions-section"
import { CtaBanner } from "@/components/cta-banner"
import { ContactSection } from "@/components/contact-section"

const ShowcaseSection = dynamic(() => import("@/components/showcase-section").then(mod => mod.ShowcaseSection))
const ConfiguratorSection = dynamic(() => import("@/components/configurator-section").then(mod => mod.ConfiguratorSection))

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <StatsBar />
        <ProductsSection />
        <FeaturesSection />
        <BenefitsSection />
        <FeatureShowcase />
        <TrustSection />
        <SolutionsSection />
        <ShowcaseSection />
        <CtaBanner />
        <ConfiguratorSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
      <DemoBadge />
    </>
  )
}
