'use client'

import { useState } from 'react'

export function QuoteSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className="py-16 px-6 bg-[#26c6da]">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-white mb-4">REQUEST A QUOTE</h2>
        <p className="text-center text-white/90 mb-12">
          Tell us about your project and our team will get back to you with a custom proposal and timeline to meet your specific needs.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
          />

          <label className="flex items-center gap-2 text-white text-sm">
            <input type="checkbox" className="w-4 h-4 rounded" />
            I agree to the terms and conditions
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-white text-[#26c6da] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
