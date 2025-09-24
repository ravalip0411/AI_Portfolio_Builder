"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, Link, Eye, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minRows?: number
}

export function RichText({ value, onChange, placeholder, className, minRows = 4 }: RichTextProps) {
  const [isPreview, setIsPreview] = useState(false)

  // Simple markdown-like formatting helpers
  const formatText = (format: string) => {
    // This is a simplified implementation
    // In a real app, you'd use a proper rich text editor
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let formattedText = selectedText
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "list":
        formattedText = `\n- ${selectedText}`
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        break
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end)
    onChange(newValue)
  }

  // Simple markdown to HTML converter for preview
  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-primary underline">$1</a>')
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1">$1</ul>')
      .replace(/\n/g, "<br>")
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("bold")} className="h-8 w-8 p-0">
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("italic")} className="h-8 w-8 p-0">
            <Italic className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("list")} className="h-8 w-8 p-0">
            <List className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatText("link")} className="h-8 w-8 p-0">
            <Link className="h-4 w-4" />
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-2"
        >
          {isPreview ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {isPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      {/* Content */}
      {isPreview ? (
        <div
          className="min-h-[100px] p-3 border rounded-md bg-muted/30 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
        />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          className="resize-none"
        />
      )}
    </div>
  )
}
