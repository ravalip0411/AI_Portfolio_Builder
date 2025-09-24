"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PortfolioPreview } from "@/components/Preview/PortfolioPreview"
import { SectionEditor } from "@/components/Review/SectionEditor"
import { loadPortfolioData, savePortfolioData, loadSelectedTemplate } from "@/lib/persist"
import { TEMPLATES, type Template } from "@/lib/templates";
import { ArrowLeft, ArrowRight, Eye, Edit, Palette, Download } from "lucide-react"
import Link from "next/link"
import type { Portfolio } from "@/lib/schema"
// import type { Template } from "@/lib/templates"

export default function ReviewPage() {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [activeTab, setActiveTab] = useState("preview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load portfolio data and selected template
    const portfolioData = loadPortfolioData()
    const templateId = loadSelectedTemplate()


    if (portfolioData) {
      setPortfolio(portfolioData)
    }

    if (templateId) {
    const template = TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        setSelectedTemplate(template)
      }
    }

    setIsLoading(false)
  }, [])

  const handlePortfolioUpdate = (updates: Partial<Portfolio>) => {
    if (!portfolio) return

    const updatedPortfolio = { ...portfolio, ...updates }
    setPortfolio(updatedPortfolio)
    savePortfolioData(updatedPortfolio)
  }

  const handleTemplateChange = (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template)
      localStorage.setItem("selectedTemplate", templateId)
    }
  }

  const handleEditSection = (sectionKey: string) => {
    // For now, just switch to edit tab - in a full implementation,
    // this would open a modal or navigate to a section-specific edit page
    setActiveTab("edit")
  }

  const handleContinue = () => {
    router.push("/builder/pricing")
  }

  const SECTION_KEYS: Array<keyof Portfolio> = [
  "header",
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "blog",
  "testimonials",
  "certifications",
  "contact",
  "footer",
];

function isFilled(section: any): boolean {
  if (!section) return false;
  if (Array.isArray(section)) return section.length > 0;
  if (typeof section === "object") {
    return Object.values(section).some((v) => {
      if (Array.isArray(v)) return v.length > 0;
      return Boolean(v);
    });
  }
  return Boolean(section);
}

const getCompletionStats = () => {
  if (!portfolio) return { completed: 0, total: SECTION_KEYS.length, percentage: 0 };
  const completed = SECTION_KEYS.filter((k) => isFilled((portfolio as any)[k])).length;
  const total = SECTION_KEYS.length;
  return { completed, total, percentage: Math.round((completed / total) * 100) };
};


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  if (!portfolio || !selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-2">No Portfolio Data Found</h2>
            <p className="text-muted-foreground mb-4">Please start by creating a portfolio or uploading your resume.</p>
            <Link href="/builder">
              <Button>Start Building</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = getCompletionStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/builder/upload">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Review & Preview</h1>
              <p className="text-muted-foreground">Fine-tune your portfolio and see how it looks</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{stats.percentage}% Complete</p>
              <p className="text-xs text-muted-foreground">
                {stats.completed} of {stats.total} sections
              </p>
            </div>
            <Button onClick={handleContinue} className="gap-2">
              Continue to Pricing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium">Choose Template</span>
            </div>
            <div className="w-8 h-px bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium">Add Content</span>
            </div>
            <div className="w-8 h-px bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-primary">Review & Preview</span>
            </div>
            <div className="w-8 h-px bg-muted" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="text-sm text-muted-foreground">Download</span>
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Template Selection
                </CardTitle>
                <CardDescription>Choose a different template or customize the current one</CardDescription>
              </div>
              <Badge variant="outline">{selectedTemplate.name}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={selectedTemplate.id} onValueChange={handleTemplateChange}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
  {TEMPLATES.map((template) => (
    <SelectItem key={template.id} value={template.id}>
      {template.name}
    </SelectItem>
  ))}
</SelectContent>

              </Select>
              <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="edit" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Sections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Preview</CardTitle>
                <CardDescription>
                  This is how your portfolio will look with the {selectedTemplate.name} template
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-lg overflow-hidden bg-white">
                  <PortfolioPreview
                    portfolio={portfolio}
                    template={selectedTemplate}
                    className="scale-75 origin-top-left w-[133.33%] h-[133.33%] transform"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit Portfolio Sections</CardTitle>
                <CardDescription>Enable, disable, and edit the content of your portfolio sections</CardDescription>
              </CardHeader>
              <CardContent>
                <SectionEditor
                  portfolio={portfolio}
                  onUpdate={handlePortfolioUpdate}
                  onEditSection={handleEditSection}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Ready to download?</h3>
                <p className="text-sm text-muted-foreground">
                  Your portfolio is {stats.percentage}% complete. You can download it now or add more sections.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setActiveTab("edit")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit More
                </Button>
                <Button onClick={handleContinue}>
                  <Download className="h-4 w-4 mr-2" />
                  Continue to Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
