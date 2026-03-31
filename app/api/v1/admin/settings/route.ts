import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { z } from "zod"

const settingSchema = z.object({
  key: z.string(),
  value: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.siteSettings.findMany()
    
    const settingsObj: Record<string, any> = {}
    settings.forEach((setting) => {
      try {
        settingsObj[setting.key] = JSON.parse(setting.value)
      } catch {
        settingsObj[setting.key] = setting.value
      }
    })

    return NextResponse.json({ settings: settingsObj })
  } catch (error) {
    console.error("Get settings error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAdmin(request)
    if (!auth.isValid) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { key, value } = settingSchema.parse(body)

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })

    return NextResponse.json({ setting })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error" }, { status: 400 })
    }
    console.error("Update setting error:", error)
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 })
  }
}
