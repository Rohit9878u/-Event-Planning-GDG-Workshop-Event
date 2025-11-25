export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  registeredCount: number
  category: "workshop" | "meetup" | "hackathon" | "conference"
  speaker?: string
  imageUrl?: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "organizer" | "member"
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ApiError {
  message: string
  status: number
}
