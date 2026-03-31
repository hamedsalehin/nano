import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./auth"

export async function requireAuth(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return {
        isValid: false,
        error: "Unauthorized",
      }
    }

    return {
      isValid: true,
      user,
    }
  } catch (error) {
    return {
      isValid: false,
      error: "Authentication error",
    }
  }
}

export async function requireAdmin(request: NextRequest) {
  const auth = await requireAuth(request)

  if (!auth.isValid) {
    return auth
  }

  if (auth.user?.role !== "ADMIN") {
    return {
      isValid: false,
      error: "Forbidden: Admin access required",
    }
  }

  return auth
}

export function sendError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status }
  )
}

export function sendSuccess(data: any, status: number = 200) {
  return NextResponse.json(data, { status })
}
