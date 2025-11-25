import { type NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
  }
}
