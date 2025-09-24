"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  // For now, this is just a placeholder for future i18n implementation
  const handleLanguageChange = (language: string) => {
    // TODO: Implement language switching
    console.log("Language changed to:", language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>🇺🇸 English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("es")}>🇪🇸 Español</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>🇫🇷 Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("de")}>🇩🇪 Deutsch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
