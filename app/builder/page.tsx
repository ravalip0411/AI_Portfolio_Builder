"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProtectedRoute } from "@/components/Common/ProtectedRoute"
import { TemplateCard } from "@/components/Templates/TemplateCard"
import { TEMPLATES, TEMPLATE_CATEGORIES, type Template } from "@/lib/templates"
import { setStoredValue, getStoredValue, STORAGE_KEYS } from "@/lib/persist"
import { Search, ArrowRight, Filter, Grid, List } from "lucide-react"
import { cn } from "@/lib/utils"

function TemplateGalleryContent() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  // Load saved template selection on mount
  useEffect(() => {
    const savedTemplateId = getStoredValue(STORAGE_KEYS.SELECTED_TEMPLATE, null)
    if (savedTemplateId) {
      const template = TEMPLATES.find((t) => t.id === savedTemplateId)
      if (template) {
        setSelectedTemplate(template)
      }
    }
  }, [])

  // Filter templates based on category and search
  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setStoredValue(STORAGE_KEYS.SELECTED_TEMPLATE, template.id)
  }

  const handlePreview = (template: Template) => {
    // TODO: Implement template preview modal
    console.log("Preview template:", template.name)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      router.push("/builder/intake")
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          <span className="text-sm text-muted-foreground">Step 1 of 7</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Choose Your Template</h1>
        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          Select from 20+ professionally designed templates. Each template is fully customizable and mobile-responsive.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {TEMPLATE_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="h-8"
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredTemplates.length} of {TEMPLATES.length} templates
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        {selectedTemplate && (
          <Badge variant="secondary" className="px-3 py-1">
            Selected: {selectedTemplate.name}
          </Badge>
        )}
      </div>

      {/* Template Grid */}
      <div
        className={cn(
          "mb-12",
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4",
        )}
      >
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate?.id === template.id}
            onSelect={handleTemplateSelect}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or category filters.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Continue Button */}
      <div className="sticky bottom-6 z-10">
        <div className="bg-background/95 backdrop-blur-sm border rounded-xl p-4 shadow-lg max-w-md mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              {selectedTemplate ? (
                <div>
                  <p className="font-medium truncate">{selectedTemplate.name}</p>
                  <p className="text-sm text-muted-foreground">Template selected</p>
                </div>
              ) : (
                <div>
                  <p className="font-medium">Select a template</p>
                  <p className="text-sm text-muted-foreground">Choose one to continue</p>
                </div>
              )}
            </div>
            <Button onClick={handleContinue} disabled={!selectedTemplate} className="flex-shrink-0">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TemplateGalleryPage() {
  return (
    <ProtectedRoute>
      <TemplateGalleryContent />
    </ProtectedRoute>
  )
}
