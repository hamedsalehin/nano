import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAuth, requireAdmin } from "@/lib/auth"
import { z } from "zod"

const createTicketSchema = z.object({
  subject: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
})

const replySchema = z.object({
  reply: z.string().min(1),
})

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    // Admins see all tickets, customers see only their own
    const tickets = await prisma.ticket.findMany({
      where: auth.user?.role === "ADMIN" ? {} : { userId: auth.user!.userId },
      include: { replies: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error("Get tickets error:", error)
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { subject, description, priority } = createTicketSchema.parse(body)

    const ticket = await prisma.ticket.create({
      data: {
        userId: auth.user!.userId,
        subject,
        description,
        priority,
      },
      include: { replies: { include: { user: true } } },
    })

    return NextResponse.json({ ticket }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error" }, { status: 400 })
    }
    console.error("Create ticket error:", error)
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}
