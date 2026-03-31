import { NextRequest, NextResponse } from "next/server"

// Mock user database
const mockUsers: any[] = [
  {
    id: "admin-1",
    email: "root",
    password: "root",
    role: "ADMIN",
    name: "Administrator",
  },
]

function generateDemoToken(userId: string, email: string, role: string): string {
  const payload = {
    userId,
    email,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 604800,
  }
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      )
    }

    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      name,
      role: "CUSTOMER",
    }

    mockUsers.push(newUser)

    const token = generateDemoToken(newUser.id, newUser.email, newUser.role)

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
        token,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    )
  }
}
