import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSlider } from "@/components/hero-slider"
const StatsBar = dynamic(() => import("@/components/stats-bar").then(mod => mod.StatsBar))
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer))
const ProductsSection = dynamic(() => import("@/components/products-section").then(mod => mod.ProductsSection))
const FeaturesSection = dynamic(() => import("@/components/features-section").then(mod => mod.FeaturesSection))
const BenefitsSection = dynamic(() => import("@/components/benefits-section").then(mod => mod.BenefitsSection))
const FeatureShowcase = dynamic(() => import("@/components/feature-showcase").then(mod => mod.FeatureShowcase))
const TrustSection = dynamic(() => import("@/components/trust-section").then(mod => mod.TrustSection))
const SolutionsSection = dynamic(() => import("@/components/solutions-section").then(mod => mod.SolutionsSection))
const CtaBanner = dynamic(() => import("@/components/cta-banner").then(mod => mod.CtaBanner))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection))
const CartDrawer = dynamic(() => import("@/components/cart-drawer").then(mod => mod.CartDrawer))
const DemoBadge = dynamic(() => import("@/components/demo-badge").then(mod => mod.DemoBadge))

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
