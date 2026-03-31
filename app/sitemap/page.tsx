import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronRight, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Sitemap | Nano Signs",
  description: "Browse the complete sitemap of Nano Signs website.",
}

const sitemapStructure = [
  {
    category: "Main Pages",
    links: [
      { title: "Home", href: "/" },
      { title: "Shop", href: "/shop/products" },
      { title: "Cart", href: "/shop/cart" },
      { title: "Checkout", href: "/shop/checkout" },
      { title: "Login", href: "/login" },
      { title: "Account", href: "/account" },
    ],
  },
  {
    category: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    category: "Admin",
    links: [
      { title: "Admin Dashboard", href: "/admin/dashboard" },
      { title: "Admin Login", href: "/admin/login" },
      { title: "Products Management", href: "/admin/products" },
      { title: "Quotes Management", href: "/admin/quotes" },
    ],
  },
]

export default function Sitemap() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Sitemap</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono">
              Sitemap
            </h1>
            <p className="text-lg text-muted-foreground">
              Navigate through all pages and sections of Nano Signs
            </p>
          </div>

          {/* Sitemap Content */}
          <div className="space-y-12">
            {sitemapStructure.map((section) => (
              <section key={section.category}>
                <h2 className="text-2xl font-bold text-foreground mb-6 font-mono">
                  {section.category}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group p-4 rounded-lg border border-border hover:border-primary hover:bg-secondary/50 transition-all flex items-center justify-between"
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {link.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 p-8 bg-secondary/30 rounded-lg border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">About This Sitemap</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This sitemap provides a complete overview of all pages available on Nano Signs website. Use this page to quickly navigate to any section of our site.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For more information about our products and services, visit our homepage or contact us directly at info@nano-signs.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
