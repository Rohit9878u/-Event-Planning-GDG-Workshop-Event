import { type NextRequest, NextResponse } from "next/server"
import { events } from "@/lib/data"

// GET /api/events/:id - Get single event
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = events.find((e) => e.id === id)

  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 })
  }

  return NextResponse.json(event)
}

// PUT /api/events/:id - Update event
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const eventIndex = events.findIndex((e) => e.id === id)

  if (eventIndex === -1) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 })
  }

  try {
    const body = await request.json()

    // Validation
    if (body.title && body.title.length < 3) {
      return NextResponse.json({ message: "Title must be at least 3 characters" }, { status: 400 })
    }

    if (body.description && body.description.length < 20) {
      return NextResponse.json({ message: "Description must be at least 20 characters" }, { status: 400 })
    }

    if (body.category && !["workshop", "meetup", "hackathon", "conference"].includes(body.category)) {
      return NextResponse.json({ message: "Invalid category" }, { status: 400 })
    }

    events[eventIndex] = {
      ...events[eventIndex],
      ...body,
      id: events[eventIndex].id,
      createdAt: events[eventIndex].createdAt,
    }

    return NextResponse.json(events[eventIndex])
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/events/:id - Delete event
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const eventIndex = events.findIndex((e) => e.id === id)

  if (eventIndex === -1) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 })
  }

  events.splice(eventIndex, 1)

  return NextResponse.json({ message: "Event deleted successfully" })
}
