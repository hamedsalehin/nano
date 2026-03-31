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

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  categoryId: z.string(),
  stock: z.number().min(0).default(0),
  image: z.string().optional(),
  specs: z.record(z.any()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.isValid) {
      return sendError(auth.error || "Unauthorized", 401)
    }

    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    })

    return sendSuccess({ products })
  } catch (error) {
    console.error("Get products error:", error)
    return sendError("Failed to fetch products", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.isValid) {
      return sendError(auth.error || "Unauthorized", 401)
    }

    const body = await request.json()
    const data = productSchema.parse(body)

    // Generate slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, "-")

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        stock: data.stock,
        image: data.image,
        specs: data.specs ? JSON.stringify(data.specs) : null,
      },
      include: { category: true },
    })

    return sendSuccess({ product }, 201)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError("Validation error", 400)
    }
    console.error("Create product error:", error)
    return sendError("Failed to create product", 500)
  }
}
