"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { EventCard } from "@/components/event-card"
import { events } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

const categories = ["all", "workshop", "meetup", "hackathon", "conference"] as const
type Category = (typeof categories)[number]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="mt-2 text-muted-foreground">
            Discover and register for upcoming workshops, meetups, and hackathons
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center gap-2">
          <Badge variant="secondary">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
          </Badge>
          {searchQuery && (
            <Badge variant="outline" className="gap-1">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-primary">
                ×
              </button>
            </Badge>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No events found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
