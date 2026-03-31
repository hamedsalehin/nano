import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        {children}
      </main>
      <Footer />
    </>
  )
}
