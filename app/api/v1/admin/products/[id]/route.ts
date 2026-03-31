import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { z } from "zod"

function sendError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

function sendSuccess(data: any, status: number = 200) {
  return NextResponse.json(data, { status })
}

const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  categoryId: z.string().optional(),
  stock: z.number().min(0).optional(),
  image: z.string().optional(),
  specs: z.record(z.any()).optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.isValid) {
      return sendError(auth.error || "Unauthorized", 401)
    }

    const { id } = await params
    const body = await request.json()
    const data = productUpdateSchema.parse(body)

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        specs: data.specs ? JSON.stringify(data.specs) : undefined,
      },
      include: { category: true },
    })

    return sendSuccess({ product })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError("Validation error", 400)
    }
    console.error("Update product error:", error)
    return sendError("Failed to update product", 500)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.isValid) {
      return sendError(auth.error || "Unauthorized", 401)
    }

    const { id } = await params

    await prisma.product.delete({
      where: { id },
    })

    return sendSuccess({ message: "Product deleted" })
  } catch (error) {
    console.error("Delete product error:", error)
    return sendError("Failed to delete product", 500)
  }
}
