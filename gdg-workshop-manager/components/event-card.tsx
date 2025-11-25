import Link from "next/link"
import type { Event } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface EventCardProps {
  event: Event
}

const categoryColors = {
  workshop: "bg-gdg-blue text-primary-foreground",
  meetup: "bg-gdg-green text-primary-foreground",
  hackathon: "bg-gdg-red text-primary-foreground",
  conference: "bg-gdg-yellow text-foreground",
}

export function EventCard({ event }: EventCardProps) {
  const spotsLeft = event.capacity - event.registeredCount
  const isAlmostFull = spotsLeft <= 10
  const isFull = spotsLeft <= 0

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge className={categoryColors[event.category]}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
          <Badge variant={isFull ? "destructive" : isAlmostFull ? "secondary" : "outline"}>
            {isFull ? "Full" : `${spotsLeft} spots left`}
          </Badge>
        </div>
        <h3 className="mt-2 text-xl font-semibold leading-tight text-balance group-hover:text-primary transition-colors">
          {event.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-gdg-blue" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-gdg-red" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-gdg-green" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-gdg-yellow" />
            <span>
              {event.registeredCount} / {event.capacity} registered
            </span>
          </div>
        </div>
        {event.speaker && (
          <p className="mt-3 text-sm">
            <span className="text-muted-foreground">Speaker:</span> <span className="font-medium">{event.speaker}</span>
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
