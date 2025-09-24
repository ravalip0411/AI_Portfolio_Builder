"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, EyeOff, Plus } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

interface SectionEditorProps {
  portfolio: Portfolio
  onUpdate: (updates: Partial<Portfolio>) => void
  onEditSection: (section: string) => void
}

export function SectionEditor({ portfolio, onUpdate, onEditSection }: SectionEditorProps) {
  const sections = [
    { key: "header", title: "Header", description: "Name, title, and contact information" },
    { key: "hero", title: "Hero", description: "Main headline and call-to-action" },
    { key: "about", title: "About", description: "Personal introduction and background" },
    { key: "experience", title: "Experience", description: "Work history and achievements" },
    { key: "projects", title: "Projects", description: "Portfolio projects and demos" },
    { key: "skills", title: "Skills", description: "Technical and professional skills" },
    { key: "education", title: "Education", description: "Academic background and certifications" },
    { key: "blog", title: "Blog", description: "Recent articles and posts" },
    { key: "testimonials", title: "Testimonials", description: "Client and colleague recommendations" },
    { key: "certifications", title: "Certifications", description: "Professional certifications" },
    { key: "contact", title: "Contact", description: "Contact form and information" },
    { key: "footer", title: "Footer", description: "Copyright and quick links" },
  ]

  const toggleSection = (sectionKey: string) => {
    const currentEnabled = portfolio.enabledSections || {}
    onUpdate({
      enabledSections: {
        ...currentEnabled,
        [sectionKey]: !currentEnabled[sectionKey as keyof typeof currentEnabled],
      },
    })
  }

  const getSectionData = (sectionKey: string) => {
    const data = portfolio[sectionKey as keyof Portfolio]
    if (Array.isArray(data)) {
      return `${data.length} items`
    }
    if (typeof data === "object" && data !== null) {
      return "Configured"
    }
    if (typeof data === "string" && data.length > 0) {
      return "Added"
    }
    return "Empty"
  }

  const getSectionPreview = (sectionKey: string) => {
    const data = portfolio[sectionKey as keyof Portfolio]

    switch (sectionKey) {
      case "header":
        return portfolio.header?.name || "No name set"
      case "hero":
        return portfolio.hero?.headline || "No headline set"
      case "about":
        return portfolio.about?.content?.substring(0, 100) + "..." || "No content"
      case "experience":
        return portfolio.experience?.length ? `${portfolio.experience.length} positions` : "No experience added"
      case "projects":
        return portfolio.projects?.length ? `${portfolio.projects.length} projects` : "No projects added"
      case "skills":
        return portfolio.skills?.length ? `${portfolio.skills.length} skills` : "No skills added"
      case "education":
        return portfolio.education?.length ? `${portfolio.education.length} degrees` : "No education added"
      default:
        return getSectionData(sectionKey)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Portfolio Sections</h3>
        <p className="text-sm text-muted-foreground">
          {Object.values(portfolio.enabledSections || {}).filter(Boolean).length} of {sections.length} sections enabled
        </p>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => {
          const isEnabled = portfolio.enabledSections?.[section.key as keyof typeof portfolio.enabledSections]
          const hasData = getSectionData(section.key) !== "Empty"

          return (
            <Card key={section.key} className={`transition-all ${isEnabled ? "ring-2 ring-primary/20" : "opacity-75"}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={() => toggleSection(section.key)} className="p-1">
                      {isEnabled ? (
                        <Eye className="h-4 w-4 text-primary" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <div>
                      <CardTitle className="text-base">{section.title}</CardTitle>
                      <CardDescription className="text-sm">{section.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={hasData ? "default" : "secondary"} className="text-xs">
                      {getSectionData(section.key)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditSection(section.key)}
                      disabled={!isEnabled}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isEnabled && hasData && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{getSectionPreview(section.key)}</p>
                </CardContent>
              )}

              {isEnabled && !hasData && (
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Plus className="h-4 w-4" />
                    <span>Click Edit to add content</span>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
