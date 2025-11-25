"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CreateEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    category: "",
    speaker: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required"
    } else if (Number.parseInt(formData.capacity) < 1) {
      newErrors.capacity = "Capacity must be at least 1"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          capacity: Number.parseInt(formData.capacity),
        }),
      })

      if (response.ok) {
        router.push("/events")
      } else {
        const data = await response.json()
        setErrors({ form: data.message || "Failed to create event" })
      }
    } catch {
      setErrors({ form: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Create New Event</CardTitle>
                <CardDescription>Fill in the details to create a new workshop, meetup, or event</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.form && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{errors.form}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Flutter"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className={errors.date ? "border-destructive" : ""}
                  />
                  {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    className={errors.time ? "border-destructive" : ""}
                  />
                  {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Google Office, Building A"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={errors.location ? "border-destructive" : ""}
                />
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    placeholder="e.g., 50"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    className={errors.capacity ? "border-destructive" : ""}
                  />
                  {errors.capacity && <p className="text-sm text-destructive">{errors.capacity}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="speaker">Speaker (Optional)</Label>
                <Input
                  id="speaker"
                  placeholder="e.g., Jane Smith"
                  value={formData.speaker}
                  onChange={(e) => handleChange("speaker", e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
