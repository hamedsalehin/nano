import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"


// In-memory store for demo (replace with database)
const quoteRequests: any[] = []

export async function GET(request: NextRequest) {
  try {
    // Check if admin
    const authHeader = request.headers.get("authorization")
    const isAdmin = authHeader?.includes("admin") // Simple demo check

    if (isAdmin) {
      return NextResponse.json({
        quotes: quoteRequests,
        total: quoteRequests.length,
      })
    }

    // Return public quotes (no details)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message, productType, quantity, budget } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const quote = {
      id: Date.now().toString(),
      name,
      email,
      company,
      phone,
      message,
      productType,
      quantity,
      budget,
      status: "PENDING",
      createdAt: new Date(),
      replies: [],
    }

    quoteRequests.push(quote)

    // In production, send email confirmation via Resend
    console.log("[DEMO] Quote request created:", quote)

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      try {
        const { data, error } = await resend.emails.send({
          from: "Nano signs New Quote Request  <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL || "delivered@resend.dev",
          subject: `New Quote Request from ${name}`,
          html: `
            <h2>New Inquiry Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Product Type:</strong> ${productType || 'N/A'}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        })

        if (error) {
          console.error("Resend returned an error:", error);
        } else {
          console.log("Email sent successfully via Resend. Data:", data);
        }
      } catch (emailError) {
        console.error("Exception thrown when sending email:", emailError)
      }
    } else {
      console.warn("RESEND_API_KEY not found. Skipping email sending.")
    }

    return NextResponse.json({
      message: "Quote request submitted successfully",
      quoteId: quote.id,
    })
  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
