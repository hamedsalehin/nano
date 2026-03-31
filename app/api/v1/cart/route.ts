import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { z } from "zod"

function sendError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

function sendSuccess(data: any, status: number = 200) {
  return NextResponse.json(data, { status })
}

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
})

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return sendError(auth.error || "Unauthorized", 401)
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: auth.user!.userId },
      include: { product: true },
    })

    return sendSuccess({ items: cartItems })
  } catch (error) {
    console.error("Get cart error:", error)
    return sendError("Failed to fetch cart", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return sendError(auth.error || "Unauthorized", 401)
    }

    const body = await request.json()
    const { productId, quantity } = cartItemSchema.parse(body)

    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: auth.user!.userId,
          productId,
        },
      },
      create: {
        userId: auth.user!.userId,
        productId,
        quantity,
      },
      update: {
        quantity,
      },
      include: { product: true },
    })

    return sendSuccess({ item: cartItem }, 201)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError("Validation error", 400)
    }
    console.error("Add to cart error:", error)
    return sendError("Failed to add to cart", 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return sendError(auth.error || "Unauthorized", 401)
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return sendError("Product ID required", 400)
    }

    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: auth.user!.userId,
          productId,
        },
      },
    })

    return sendSuccess({ message: "Item removed from cart" })
  } catch (error) {
    console.error("Remove from cart error:", error)
    return sendError("Failed to remove from cart", 500)
  }
}
