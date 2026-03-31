"use client"

import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  ChevronRight, 
  CheckCircle2, 
  MessageSquare, 
  ArrowLeft,
  Info,
  Layers,
  Zap,
  ShieldCheck
} from "lucide-react"

import { getProductBySlug, products } from "@/lib/products-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { ContactSection } from "@/components/contact-section"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          {/* Product Header & Gallery */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.gallery.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border cursor-pointer hover:border-primary transition-colors">
                    <Image
                      src={img}
                      alt={`${product.name} gallery ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Header Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-wider">
                  {product.category}
                </Badge>
                {product.series && (
                  <Badge className="bg-primary/10 text-primary border-none font-mono">
                    {product.series}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tight text-foreground mb-6">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1 border-l-2 border-primary/30 pl-4 py-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">{spec.label}</span>
                    <span className="text-lg font-bold text-foreground font-mono">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-8 text-base font-bold transition-all hover:scale-105" asChild>
                  <a href="#contact">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Request a Quote
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-2 transition-all hover:bg-secondary" asChild>
                  <Link href="/#products">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Catalog
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-20">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-14 p-0 mb-8 overflow-x-auto">
                <TabsTrigger 
                  value="features" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-8 font-bold uppercase tracking-wider text-xs"
                >
                  Features & Benefits
                </TabsTrigger>
                <TabsTrigger 
                  value="specs" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-8 font-bold uppercase tracking-wider text-xs"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="description" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-8 font-bold uppercase tracking-wider text-xs"
                >
                  Detailed Description
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="outline-none focus-visible:ring-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {product.features.map((feature, idx) => (
                    <Card key={idx} className="bg-secondary/20 border-border/50 hover:border-primary/30 transition-all card-glow overflow-hidden group">
                      <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                          {idx === 0 ? <Zap className="w-6 h-6 text-primary" /> : 
                           idx === 1 ? <Layers className="w-6 h-6 text-primary" /> : 
                           <ShieldCheck className="w-6 h-6 text-primary" />}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-4 font-mono">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="outline-none focus-visible:ring-0">
                {product.models ? (
                  <div className="rounded-xl border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
                    <Table>
                      <TableHeader className="bg-secondary/50">
                        <TableRow>
                          <TableHead className="font-bold text-foreground font-mono">Model</TableHead>
                          <TableHead className="font-bold text-foreground font-mono">Pixel Pitch</TableHead>
                          <TableHead className="font-bold text-foreground font-mono">LED Type</TableHead>
                          <TableHead className="font-bold text-foreground font-mono">Brightness</TableHead>
                          {product.models[0].transparency && <TableHead className="font-bold text-foreground font-mono">Transparency</TableHead>}
                          <TableHead className="font-bold text-foreground font-mono">Max Power</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.models.map((model) => (
                          <TableRow key={model.name}>
                            <TableCell className="font-bold text-primary font-mono">{model.name}</TableCell>
                            <TableCell>{model.pitch}</TableCell>
                            <TableCell>{model.ledType}</TableCell>
                            <TableCell>{model.brightness}</TableCell>
                            {model.transparency && <TableCell>{model.transparency}</TableCell>}
                            <TableCell>{model.powerMax}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="p-6 rounded-xl border border-border bg-card/50 flex justify-between items-center px-8">
                        <span className="text-sm font-medium text-muted-foreground">{spec.label}</span>
                        <span className="font-bold text-foreground font-mono">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="description" className="outline-none focus-visible:ring-0">
                <div className="prose prose-slate dark:prose-invert max-w-4xl">
                  <p className="text-xl text-muted-foreground leading-loose">
                    {product.longDescription}
                  </p>
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-2xl font-bold text-foreground font-mono">Key Advantages</h4>
                      <ul className="space-y-3">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                            <span className="text-muted-foreground">{f.title}: {f.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                      <Image
                        src={product.image}
                        alt="Product context"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-20 border-t border-border">
              <h2 className="text-3xl font-bold font-mono text-foreground mb-10">
                Related <span className="text-primary">Products</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((p) => (
                  <Link 
                    key={p.id} 
                    href={`/products/${p.slug}`}
                    className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all card-glow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground font-mono group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {p.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <div id="contact" className="scroll-mt-24">
        <ContactSection />
      </div>

      <Footer />
    </div>
  )
}
