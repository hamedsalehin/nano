import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // For demo purposes, generate a reset code
    const resetCode = Math.random().toString().slice(2, 8)
    const resetExpiry = new Date(Date.now() + 3600000) // 1 hour

    // In production, you would:
    // 1. Look up user by email
    // 2. Generate reset token in database
    // 3. Send email via Resend API

    // For now, log it for demo
    console.log(`[DEMO] Reset code for ${email}: ${resetCode}`)

    // Mock response - in production, integrate with Resend
    // const response = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "noreply@shop.example.com",
    //     to: email,
    //     subject: "Password Reset Code",
    //     html: `<p>Your password reset code is: <strong>${resetCode}</strong></p><p>This code expires in 1 hour.</p>`,
    //   }),
    // })

    return NextResponse.json({
      message: "Reset code sent to email",
      // Remove in production - only for demo
      _demoCode: resetCode,
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
