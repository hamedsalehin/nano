import { NextRequest, NextResponse } from "next/server"

// Mock user database (replace with Prisma when database is configured)
const mockUsers = [
  {
    id: "admin-1",
    email: "root",
    password: "root",
    role: "ADMIN",
    name: "Administrator",
  },
  {
    id: "user-1",
    email: "user@example.com",
    password: "password123",
    role: "CUSTOMER",
    name: "John Doe",
  },
]

// Simple JWT-like token generation (for demo only - replace with real JWT in production)
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
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Find user in mock database
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = generateDemoToken(user.id, user.email, user.role)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    )
  }
}
