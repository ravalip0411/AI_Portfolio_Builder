"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FieldChipProps {
  label: string
  value?: string
  onRemove?: () => void
  removable?: boolean
  className?: string
}

export function FieldChip({ label, value, onRemove, removable = true, className }: FieldChipProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("flex items-center gap-2 px-3 py-1.5 text-sm max-w-fit", removable && "pr-1", className)}
    >
      <span className="truncate">
        {label}
        {value && <span className="text-muted-foreground ml-1">: {value}</span>}
      </span>

      {removable && onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove {label}</span>
        </Button>
      )}
    </Badge>
  )
}
