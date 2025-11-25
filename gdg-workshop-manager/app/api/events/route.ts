import { type NextRequest, NextResponse } from "next/server"
import { events } from "@/lib/data"
import type { Event } from "@/lib/types"

// GET /api/events - List all events
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filteredEvents = [...events]

  if (category && category !== "all") {
    filteredEvents = filteredEvents.filter((e) => e.category === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredEvents = filteredEvents.filter(
      (e) => e.title.toLowerCase().includes(searchLower) || e.description.toLowerCase().includes(searchLower),
    )
  }

  return NextResponse.json(filteredEvents)
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const requiredFields = ["title", "description", "date", "time", "location", "capacity", "category"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 })
      }
    }

    if (body.title.length < 3) {
      return NextResponse.json({ message: "Title must be at least 3 characters" }, { status: 400 })
    }

    if (body.description.length < 20) {
      return NextResponse.json({ message: "Description must be at least 20 characters" }, { status: 400 })
    }

    if (!["workshop", "meetup", "hackathon", "conference"].includes(body.category)) {
      return NextResponse.json({ message: "Invalid category" }, { status: 400 })
    }

    const newEvent: Event = {
      id: String(events.length + 1),
      title: body.title,
      description: body.description,
      date: body.date,
      time: body.time,
      location: body.location,
      capacity: body.capacity,
      registeredCount: 0,
      category: body.category,
      speaker: body.speaker || undefined,
      createdAt: new Date().toISOString(),
    }

    events.push(newEvent)

    return NextResponse.json(newEvent, { status: 201 })
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
  }
}
