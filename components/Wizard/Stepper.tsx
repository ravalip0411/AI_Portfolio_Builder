"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  label: string
  description?: string
  completed?: boolean
  current?: boolean
}

interface StepperProps {
  steps: Step[]
  currentStep: string
  onStepClick?: (stepId: string) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <nav className="space-y-2">
      {steps.map((step, index) => {
        const isCompleted = step.completed || index < currentIndex
        const isCurrent = step.id === currentStep
        const isClickable = onStepClick && (isCompleted || isCurrent)

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
              isCurrent && "bg-primary/10 border border-primary/20",
              isClickable && "cursor-pointer hover:bg-muted/50",
              !isCurrent && !isCompleted && "opacity-60",
            )}
            onClick={() => isClickable && onStepClick(step.id)}
          >
            {/* Step Indicator */}
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isCompleted && "bg-green-500 text-white",
                isCurrent && "bg-primary text-primary-foreground",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground border-2 border-muted-foreground/20",
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "font-medium text-sm truncate",
                  isCurrent && "text-primary",
                  isCompleted && "text-foreground",
                  !isCompleted && !isCurrent && "text-muted-foreground",
                )}
              >
                {step.label}
              </div>
              {step.description && (
                <div className="text-xs text-muted-foreground truncate mt-0.5">{step.description}</div>
              )}
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-7 mt-12 w-0.5 h-6 -translate-x-1/2",
                  isCompleted ? "bg-green-500" : "bg-muted",
                )}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
