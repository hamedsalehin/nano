import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, replyMessage, replyTo } = await request.json()

    // In production:
    // 1. Verify admin authorization
    // 2. Find quote in database
    // 3. Update status
    // 4. Send reply email via Resend if replyMessage exists

    console.log(`[DEMO] Updating quote ${params.id}:`, {
      status,
      replyMessage,
      replyTo,
    })

    // Mock response
    return NextResponse.json({
      message: "Quote updated successfully",
      id: params.id,
      status,
    })
  } catch (error) {
    console.error("Quote update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
