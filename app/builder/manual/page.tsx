"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ProtectedRoute } from "@/components/Common/ProtectedRoute"
import { Stepper } from "@/components/Wizard/Stepper"
import { SectionToggle } from "@/components/Wizard/SectionToggle"
import { PortfolioSchema, DEFAULT_SECTIONS, type Portfolio } from "@/lib/schema"
import { setStoredValue, getStoredValue, STORAGE_KEYS } from "@/lib/persist"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, ArrowLeft, Save, Settings } from "lucide-react"

// Import section components (we'll create these)
import { HeaderSection } from "@/components/Wizard/Sections/HeaderSection"
import { HeroSection } from "@/components/Wizard/Sections/HeroSection"
import { AboutSection } from "@/components/Wizard/Sections/AboutSection"
import { ExperienceSection } from "@/components/Wizard/Sections/ExperienceSection"
import { ProjectsSection } from "@/components/Wizard/Sections/ProjectsSection"
import { SkillsSection } from "@/components/Wizard/Sections/SkillsSection"
import { EducationSection } from "@/components/Wizard/Sections/EducationSection"
import { BlogSection } from "@/components/Wizard/Sections/BlogSection"
import { TestimonialsSection } from "@/components/Wizard/Sections/TestimonialsSection"
import { CertificationsSection } from "@/components/Wizard/Sections/CertificationsSection"
import { ContactSection } from "@/components/Wizard/Sections/ContactSection"
import { FooterSection } from "@/components/Wizard/Sections/FooterSection"

import { z } from "zod";
// import { PortfolioSchema } from "@/lib/schema";

type PortfolioForm = z.input<typeof PortfolioSchema>; // <-- input type


function ManualWizardContent() {
  const [currentSection, setCurrentSection] = useState("header")
  const [sectionConfig, setSectionConfig] = useState(DEFAULT_SECTIONS)
  const [showSectionSettings, setShowSectionSettings] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  

  // Initialize form with default values
 const DEFAULT_VALUES: PortfolioForm = {
  header: {
    siteTitle: "",
    navLinks: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    logo: "",
  },
  hero: {
    headline: "",
    subheadline: "",
    intro: "",
    profilePhoto: "",
  },

  // You can omit optional sections entirely, or seed them with empty values:
  about: { bio: "", interests: [], goals: "", location: "" },

  experience: [],
  projects: [],

  // skills is an array of categories, not a string[]
  skills: [{ name: "Core", skills: [] }], // or just [] if your UI adds the first category

  education: [],
  blog: [],
  testimonials: [],
  certifications: [],

  contact: { linkedin: "", github: "", email: "", phone: "", location: "" },

  footer: {
    copyrightYear: new Date().getFullYear().toString(),
    reservedText: "All rights reserved",
    quickLinks: [],
  },
};

const methods = useForm<PortfolioForm>({
  resolver: zodResolver(PortfolioSchema),
  defaultValues: DEFAULT_VALUES,
  shouldUnregister: true, // so disabled/unmounted sections don't block validation
});
  const { watch, setValue, trigger } = methods

  // Load saved data on mount
  useEffect(() => {
    const savedData = getStoredValue(STORAGE_KEYS.PORTFOLIO_DATA, null)
    const savedSections = getStoredValue("pb.sectionConfig", DEFAULT_SECTIONS)

    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        setValue(key as keyof Portfolio, savedData[key])
      })
    }

    setSectionConfig(savedSections)
  }, [setValue])

  // Auto-save on form changes
  useEffect(() => {
    const subscription = watch((data) => {
      setStoredValue(STORAGE_KEYS.PORTFOLIO_DATA, data)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // Get enabled sections for stepper
  const enabledSections = sectionConfig.filter((section) => section.enabled)
  const currentSectionIndex = enabledSections.findIndex((section) => section.id === currentSection)
  const progress = ((currentSectionIndex + 1) / enabledSections.length) * 100

  // Section toggle handler
  const handleSectionToggle = (sectionId: string, enabled: boolean) => {
    const updatedConfig = sectionConfig.map((section) => (section.id === sectionId ? { ...section, enabled } : section))
    setSectionConfig(updatedConfig)
    setStoredValue("pb.sectionConfig", updatedConfig)

    // If we disabled the current section, move to the next enabled one
    if (!enabled && sectionId === currentSection) {
      const nextEnabled = updatedConfig.find((s) => s.enabled && s.id !== sectionId)
      if (nextEnabled) {
        setCurrentSection(nextEnabled.id)
      }
    }
  }

  // Navigation handlers
  const handleNext = async () => {
    const isValid = await trigger(currentSection as keyof Portfolio)
    if (!isValid) return

    const currentIndex = enabledSections.findIndex((s) => s.id === currentSection)
    if (currentIndex < enabledSections.length - 1) {
      setCurrentSection(enabledSections[currentIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    const currentIndex = enabledSections.findIndex((s) => s.id === currentSection)
    if (currentIndex > 0) {
      setCurrentSection(enabledSections[currentIndex - 1].id)
    }
  }

  const handleComplete = async () => {
    const isValid = await trigger()
    if (!isValid) {
      toast({
        title: "Please fix validation errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Portfolio saved!",
      description: "Your portfolio data has been saved successfully.",
    })

    router.push("/builder/review")
  }

  const handleSave = () => {
    toast({
      title: "Progress saved",
      description: "Your changes have been saved automatically.",
    })
  }

  // Render current section component
  const renderCurrentSection = () => {
    switch (currentSection) {
      case "header":
        return <HeaderSection />
      case "hero":
        return <HeroSection />
      case "about":
        return <AboutSection />
      case "experience":
        return <ExperienceSection />
      case "projects":
        return <ProjectsSection />
      case "skills":
        return <SkillsSection />
      case "education":
        return <EducationSection />
      case "blog":
        return <BlogSection />
      case "testimonials":
        return <TestimonialsSection />
      case "certifications":
        return <CertificationsSection />
      case "contact":
        return <ContactSection />
      case "footer":
        return <FooterSection />
      default:
        return <div>Section not found</div>
    }
  }

  const currentSectionData = enabledSections.find((s) => s.id === currentSection)
  const isFirstSection = currentSectionIndex === 0
  const isLastSection = currentSectionIndex === enabledSections.length - 1

  return (
    <FormProvider {...methods}>
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3A
            </div>
            <span className="text-sm text-muted-foreground">Step 3A of 7</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Build Your Portfolio</h1>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Fill in your information step by step. All sections are customizable and you can add or remove fields as
            needed.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Section Settings */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Sections</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowSectionSettings(!showSectionSettings)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Customize which sections to include in your portfolio</CardDescription>
                </CardHeader>
                {showSectionSettings && (
                  <CardContent className="space-y-3">
                    {sectionConfig.map((section) => (
                      <SectionToggle
                        key={section.id}
                        id={section.id}
                        label={section.label}
                        description={section.description}
                        icon={section.icon}
                        enabled={section.enabled}
                        required={section.required}
                        onToggle={handleSectionToggle}
                      />
                    ))}
                  </CardContent>
                )}
              </Card>

              {/* Stepper */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stepper
                    steps={enabledSections.map((section) => ({
                      id: section.id,
                      label: section.label,
                      description: section.description,
                      completed: enabledSections.findIndex((s) => s.id === section.id) < currentSectionIndex,
                      current: section.id === currentSection,
                    }))}
                    currentStep={currentSection}
                    onStepClick={setCurrentSection}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="min-h-[600px]">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{currentSectionData?.label}</CardTitle>
                      <CardDescription>{currentSectionData?.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6">{renderCurrentSection()}</CardContent>

                {/* Navigation */}
                <div className="border-t p-6">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={handlePrevious} disabled={isFirstSection}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <div className="text-sm text-muted-foreground">
                      {currentSectionIndex + 1} of {enabledSections.length}
                    </div>

                    {isLastSection ? (
                      <Button onClick={handleComplete}>
                        Complete
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default function ManualWizardPage() {
  return (
    <ProtectedRoute>
      <ManualWizardContent />
    </ProtectedRoute>
  )
}
