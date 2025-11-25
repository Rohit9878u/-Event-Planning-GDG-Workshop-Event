import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { EventCard } from "@/components/event-card"
import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { events } from "@/lib/data"
import { Calendar, Users, Zap, ArrowRight, Code2, Lightbulb } from "lucide-react"

export default function HomePage() {
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  const totalRegistrations = events.reduce((acc, e) => acc + e.registeredCount, 0)
  const totalCapacity = events.reduce((acc, e) => acc + e.capacity, 0)

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gdg-blue" />
              <div className="h-4 w-4 rounded-full bg-gdg-red" />
              <div className="h-4 w-4 rounded-full bg-gdg-yellow" />
              <div className="h-4 w-4 rounded-full bg-gdg-green" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              GDG Workshop Manager
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              Organize and manage workshops, meetups, hackathons, and conferences for your Google Developer Group
              community. Connect, learn, and grow together.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/events">
                <Button size="lg" className="gap-2">
                  Browse Events
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/events/create">
                <Button size="lg" variant="outline">
                  Create Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Events"
              value={events.length}
              icon={Calendar}
              description="Workshops & meetups"
              colorClass="bg-gdg-blue"
            />
            <StatsCard
              title="Total Registrations"
              value={totalRegistrations}
              icon={Users}
              description={`of ${totalCapacity} capacity`}
              colorClass="bg-gdg-green"
            />
            <StatsCard
              title="Workshops"
              value={events.filter((e) => e.category === "workshop").length}
              icon={Code2}
              description="Hands-on learning"
              colorClass="bg-gdg-red"
            />
            <StatsCard
              title="Hackathons"
              value={events.filter((e) => e.category === "hackathon").length}
              icon={Zap}
              description="Build & innovate"
              colorClass="bg-gdg-yellow"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <p className="mt-2 text-muted-foreground">Don't miss out on these exciting opportunities</p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="gap-2 bg-transparent">
                View All Events
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why GDG Workshop Manager?</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to manage your developer community events</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-gdg-blue/10 p-4">
                <Calendar className="h-8 w-8 text-gdg-blue" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Easy Scheduling</h3>
              <p className="mt-2 text-muted-foreground">
                Create and manage events with an intuitive interface. Set dates, venues, and capacity limits
                effortlessly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-gdg-green/10 p-4">
                <Users className="h-8 w-8 text-gdg-green" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Attendee Management</h3>
              <p className="mt-2 text-muted-foreground">
                Track registrations, manage waitlists, and communicate with attendees all in one place.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-gdg-yellow/10 p-4">
                <Lightbulb className="h-8 w-8 text-gdg-yellow" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Community Growth</h3>
              <p className="mt-2 text-muted-foreground">
                Build a thriving developer community with workshops, meetups, and hackathons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-gdg-blue" />
                <div className="h-2 w-2 rounded-full bg-gdg-red" />
                <div className="h-2 w-2 rounded-full bg-gdg-yellow" />
                <div className="h-2 w-2 rounded-full bg-gdg-green" />
              </div>
              <span className="text-sm text-muted-foreground">GDG Workshop Manager</span>
            </div>
            <p className="text-sm text-muted-foreground">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
