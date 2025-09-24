"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/Common/ProtectedRoute"
import { FileText, Upload, ArrowRight, Clock, Zap } from "lucide-react"

function DataIntakeModeContent() {
  const router = useRouter()

  const handleManualMode = () => {
    router.push("/builder/manual")
  }

  const handleResumeMode = () => {
    router.push("/builder/resume")
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          <span className="text-sm text-muted-foreground">Step 2 of 7</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">How would you like to add your content?</h1>
        <p className="text-lg text-muted-foreground text-balance leading-relaxed">
          Choose the method that works best for you. Both options create the same professional result.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Manual Mode */}
        <Card
          className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={handleManualMode}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">Manual Entry</CardTitle>
            <CardDescription className="text-base">
              Fill in your information step by step using our guided wizard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Complete control over every detail</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Add custom sections and fields</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Perfect for first-time users</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Visual progress tracking</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>10-15 minutes</span>
              </div>
              <Button className="group-hover:bg-primary group-hover:text-primary-foreground">
                Start Manual Entry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload Mode */}
        <Card
          className="border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={handleResumeMode}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
              <Upload className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-2xl">Resume Upload</CardTitle>
            <CardDescription className="text-base">
              Upload your PDF resume and let our AI extract and organize your information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Instant information extraction</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">ATS compatibility score (70-95%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Edit and customize after upload</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Perfect for existing resumes</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span>2-3 minutes</span>
              </div>
              <Button className="group-hover:bg-primary group-hover:text-primary-foreground">
                Upload Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <div className="max-w-2xl mx-auto mt-12">
        <Card className="border-0 bg-muted/30">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Need Help Deciding?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Both methods create the same professional result. Choose manual entry for complete control, or upload your
              resume for speed and convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm">
                View Sample Templates
              </Button>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DataIntakeModePage() {
  return (
    <ProtectedRoute>
      <DataIntakeModeContent />
    </ProtectedRoute>
  )
}
