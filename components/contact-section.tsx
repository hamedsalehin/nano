"use client"

import { useState } from "react"
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productType: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/v1/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to submit quote request")
        return
      }

      setSubmitted(true)
      setFormData({ name: "", company: "", email: "", phone: "", productType: "", message: "" })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-grid">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-4">
            Contact Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-foreground mb-4 text-balance">
            Request a <span className="text-primary">Quote</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Have a project in mind? Our team of experts will provide a tailored solution and
            competitive pricing within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6 lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-mono text-foreground">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  Thank you for your inquiry. Our team will review your request and get back
                  to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full h-11 px-4 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full h-11 px-4 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="w-full h-11 px-4 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full h-11 px-4 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="productType" className="block text-sm font-semibold text-foreground mb-2">
                    Product Interest
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-secondary border border-border rounded-md text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select a product category</option>
                    <option value="Outdoor LED Display">Outdoor LED Display</option>
                    <option value="Indoor LED Display">Indoor LED Display</option>
                    <option value="Creative LED Display">Creative LED Display</option>
                    <option value="Rental LED Display">Rental LED Display</option>
                    <option value="Neon LED Signs">Neon LED Signs</option>
                    <option value="Transparent LED Screen">Transparent LED Screen</option>
                    <option value="Mobile LED Display">Mobile LED Display</option>
                    <option value="Custom Solution">Custom Solution</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project requirements, desired size, location, and any specific features..."
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-card rounded-xl border border-border p-6 card-glow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1 font-mono">
                    Email Us
                  </h4>
                  <p className="text-sm text-muted-foreground">info@nano-signs.com</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 card-glow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1 font-mono">
                    Call Us
                  </h4>
                  <p className="text-sm text-muted-foreground">+1 (305) 967 1005</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 card-glow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1 font-mono">
                    Visit Us
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    4567 Powerline Rd
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Oakland Park, FL, USA
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
              <h4 className="text-sm font-bold text-foreground mb-3 font-mono">
                Why Choose Us?
              </h4>
              <ul className="space-y-2">
                {[
                  "Factory-direct pricing",
                  "24/7 technical support",
                  "3-year warranty on all products",
                  "Free worldwide shipping",
                  "Custom design & engineering",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
