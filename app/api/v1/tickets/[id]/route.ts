import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAuth, requireAdmin } from "@/lib/auth"
import { z } from "zod"

const replySchema = z.object({
  reply: z.string().min(1),
})

const updateTicketSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: { replies: { include: { user: true } }, user: true },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Check authorization
    if (auth.user?.role !== "ADMIN" && ticket.userId !== auth.user?.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error("Get ticket error:", error)
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status } = updateTicketSchema.parse(body)

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status },
      include: { replies: { include: { user: true } } },
    })

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error("Update ticket error:", error)
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { reply } = replySchema.parse(body)

    const ticket = await prisma.ticket.findUnique({ where: { id } })
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Check authorization
    if (auth.user?.role !== "ADMIN" && ticket.userId !== auth.user?.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const ticketReply = await prisma.ticketReply.create({
      data: {
        ticketId: id,
        userId: auth.user!.userId,
        reply,
      },
      include: { user: true },
    })

    return NextResponse.json({ reply: ticketReply }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error" }, { status: 400 })
    }
    console.error("Add ticket reply error:", error)
    return NextResponse.json({ error: "Failed to add reply" }, { status: 500 })
  }
}
