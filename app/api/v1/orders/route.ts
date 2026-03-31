import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { z } from "zod"

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ).min(1),
})

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: auth.user!.userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items } = createOrderSchema.parse(body)

    // Calculate total price
    let totalPrice = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        )
      }

      totalPrice += product.price * item.quantity
      orderItems.push({ productId: item.productId, quantity: item.quantity, price: product.price })
    }

    const order = await prisma.order.create({
      data: {
        userId: auth.user!.userId,
        totalPrice,
        items: {
          create: orderItems,
        },
      },
      include: { items: { include: { product: true } } },
    })

    // Clear cart after order
    await prisma.cartItem.deleteMany({
      where: { userId: auth.user!.userId },
    })

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error" }, { status: 400 })
    }
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
