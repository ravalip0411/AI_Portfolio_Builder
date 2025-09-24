"use client"

import { Switch } from "@/components/ui/switch"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

interface SectionToggleProps {
  id: string
  label: string
  description: string
  icon: string
  enabled: boolean
  required?: boolean
  onToggle: (id: string, enabled: boolean) => void
  className?: string
}

export function SectionToggle({
  id,
  label,
  description,
  icon,
  enabled,
  required = false,
  onToggle,
  className,
}: SectionToggleProps) {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[icon] || Icons.FileText

  const handleToggle = (checked: boolean) => {
    if (!required) {
      onToggle(id, checked)
    }
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        enabled ? "border-primary/50 bg-primary/5" : "border-border bg-muted/30",
        !required && "cursor-pointer hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                enabled ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
              )}
            >
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {label}
                {required && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    Required
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>

          <Switch checked={enabled} onCheckedChange={handleToggle} disabled={required} className="flex-shrink-0" />
        </div>
      </CardHeader>
    </Card>
  )
}
