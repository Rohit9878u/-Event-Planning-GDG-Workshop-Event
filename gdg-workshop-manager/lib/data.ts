import type { Event } from "./types"

// In-memory event store (simulates database)
export const events: Event[] = [
  {
    id: "1",
    title: "Introduction to Flutter",
    description:
      "Learn the basics of Flutter development and build your first cross-platform mobile app. This hands-on workshop covers widgets, state management, and deployment.",
    date: "2025-12-15",
    time: "10:00 AM",
    location: "Google Office, Building A",
    capacity: 50,
    registeredCount: 32,
    category: "workshop",
    speaker: "Jane Smith",
    createdAt: "2025-11-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Firebase Deep Dive",
    description:
      "Master Firebase services including Authentication, Firestore, Cloud Functions, and Hosting. Perfect for full-stack developers.",
    date: "2025-12-20",
    time: "2:00 PM",
    location: "Tech Hub, Room 202",
    capacity: 40,
    registeredCount: 28,
    category: "workshop",
    speaker: "John Doe",
    createdAt: "2025-11-05T14:00:00Z",
  },
  {
    id: "3",
    title: "GDG Monthly Meetup",
    description:
      "Join us for our monthly community meetup! Network with fellow developers, share projects, and learn about upcoming events.",
    date: "2025-12-10",
    time: "6:00 PM",
    location: "Community Center",
    capacity: 100,
    registeredCount: 67,
    category: "meetup",
    createdAt: "2025-11-10T09:00:00Z",
  },
  {
    id: "4",
    title: "AI/ML Hackathon 2025",
    description:
      "48-hour hackathon focused on building AI-powered solutions. Teams of 3-5 members. Amazing prizes and mentorship available!",
    date: "2025-12-28",
    time: "9:00 AM",
    location: "Innovation Campus",
    capacity: 200,
    registeredCount: 156,
    category: "hackathon",
    createdAt: "2025-11-15T11:00:00Z",
  },
  {
    id: "5",
    title: "Cloud Computing with GCP",
    description:
      "Comprehensive workshop on Google Cloud Platform. Learn about Compute Engine, Kubernetes, BigQuery, and more.",
    date: "2026-01-05",
    time: "10:00 AM",
    location: "Virtual Event",
    capacity: 150,
    registeredCount: 89,
    category: "workshop",
    speaker: "Sarah Chen",
    createdAt: "2025-11-20T08:00:00Z",
  },
  {
    id: "6",
    title: "DevFest 2025",
    description:
      "Annual developer conference featuring talks, workshops, and networking opportunities. Multiple tracks for all skill levels.",
    date: "2026-01-20",
    time: "8:00 AM",
    location: "Convention Center",
    capacity: 500,
    registeredCount: 234,
    category: "conference",
    createdAt: "2025-11-25T12:00:00Z",
  },
]

// Demo users
export const users = [
  {
    id: "1",
    email: "admin@gdg.dev",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "organizer@gdg.dev",
    password: "organizer123",
    name: "Event Organizer",
    role: "organizer" as const,
  },
]
