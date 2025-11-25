import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  colorClass?: string
}

export function StatsCard({ title, value, icon: Icon, description, colorClass = "bg-primary" }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-lg ${colorClass} p-3`}>
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
