import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { events } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Bookmark, User } from "lucide-react"

const categoryColors = {
  workshop: "bg-gdg-blue text-primary-foreground",
  meetup: "bg-gdg-green text-primary-foreground",
  hackathon: "bg-gdg-red text-primary-foreground",
  conference: "bg-gdg-yellow text-foreground",
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = events.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  const spotsLeft = event.capacity - event.registeredCount
  const percentFilled = (event.registeredCount / event.capacity) * 100
  const isFull = spotsLeft <= 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        {/* Event Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className={categoryColors[event.category]}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
            <Badge variant={isFull ? "destructive" : "outline"}>
              {isFull ? "Fully Booked" : `${spotsLeft} spots remaining`}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl text-balance">{event.title}</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>

            {event.speaker && (
              <Card>
                <CardHeader>
                  <CardTitle>Speaker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{event.speaker}</p>
                      <p className="text-sm text-muted-foreground">Event Speaker</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gdg-blue/10 p-2">
                    <Calendar className="h-5 w-5 text-gdg-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gdg-red/10 p-2">
                    <Clock className="h-5 w-5 text-gdg-red" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gdg-green/10 p-2">
                    <MapPin className="h-5 w-5 text-gdg-green" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gdg-yellow/10 p-2">
                    <Users className="h-5 w-5 text-gdg-yellow" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">
                      {event.registeredCount} / {event.capacity} registered
                    </p>
                  </div>
                </div>
                <Progress value={percentFilled} className="h-2" />
                <Button className="w-full" disabled={isFull}>
                  {isFull ? "Event Full" : "Register Now"}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
