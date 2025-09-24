"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDropZone } from "@/components/Upload/FileDropZone"
import { analyzeResume, extractTextFromFile } from "@/lib/resumeAnalysis"
import { savePortfolioData } from "@/lib/persist"
import { ArrowLeft, Sparkles, FileText, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true)
    setProgress(0)
    setAnalysisComplete(false)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Extract text from file
      const text = await extractTextFromFile(file)

      // Analyze resume with mock AI
      const portfolioData = await analyzeResume(text)

      // Complete progress
      setProgress(100)
      clearInterval(progressInterval)

      // Save extracted data
      setExtractedData(portfolioData)
      savePortfolioData(portfolioData)

      // Show completion state
      setTimeout(() => {
        setAnalysisComplete(true)
        setIsProcessing(false)
      }, 500)
    } catch (error) {
      console.error("Resume analysis failed:", error)
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const handleContinue = () => {
    router.push("/builder/review")
  }

  const handleStartOver = () => {
    setAnalysisComplete(false)
    setExtractedData(null)
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/builder/intake">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Upload Your Resume</h1>
            <p className="text-muted-foreground">Let AI analyze your resume and auto-fill your portfolio</p>
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
              <span className="text-sm font-medium text-primary">Upload Resume</span>
            </div>
            <div className="w-8 h-px bg-muted" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-muted-foreground">Review & Edit</span>
            </div>
          </div>
        </div>

        {!analysisComplete ? (
          <div className="space-y-8">
            {/* AI Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">Advanced AI extracts key information from your resume</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Instant Processing</h3>
                  <p className="text-sm text-muted-foreground">Get your portfolio data populated in seconds</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Multiple Formats</h3>
                  <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX, and TXT files</p>
                </CardContent>
              </Card>
            </div>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                  Our AI will analyze your resume and automatically populate your portfolio sections with relevant
                  information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileDropZone onFileSelect={handleFileSelect} isProcessing={isProcessing} progress={progress} />
              </CardContent>
            </Card>

            {/* Manual Option */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Prefer to enter information manually?</h3>
                <p className="text-muted-foreground mb-4">
                  You can skip the upload and fill out your portfolio information step by step.
                </p>
                <Link href="/builder/manual">
                  <Button variant="outline">Enter Information Manually</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Analysis Complete */
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2">Analysis Complete!</h2>
                  <p className="text-muted-foreground">
                    We've successfully analyzed your resume and extracted the following information:
                  </p>
                </div>

                {extractedData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Personal Information</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Name: {extractedData.header?.name}</li>
                        <li>• Title: {extractedData.header?.title}</li>
                        <li>• Email: {extractedData.header?.email}</li>
                        <li>• Phone: {extractedData.header?.phone}</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Professional Data</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• {extractedData.experience?.length || 0} work experiences</li>
                        <li>• {extractedData.skills?.length || 0} skills identified</li>
                        <li>• {extractedData.education?.length || 0} education entries</li>
                        <li>• {extractedData.projects?.length || 0} projects found</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <Button onClick={handleContinue} size="lg">
                    Continue to Review
                  </Button>
                  <Button variant="outline" onClick={handleStartOver}>
                    Upload Different Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
