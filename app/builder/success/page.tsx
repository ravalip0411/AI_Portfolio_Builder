"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, ExternalLink, Home, Sparkles, FileText, Code, Zap } from "lucide-react"
import { generatePortfolioZip, downloadZip } from "@/lib/zipGenerator"
import { loadPortfolioData, loadSelectedTemplate } from "@/lib/persist"
import { templates } from "@/lib/templates"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadReady, setDownloadReady] = useState(false)
  const [zipBlob, setZipBlob] = useState<Blob | null>(null)

  const tier = searchParams.get("tier") || "free"
  const paymentSuccess = searchParams.get("payment") === "success"

  const tierNames = {
    free: "Free",
    pro: "Pro",
    premium: "Premium",
  }

  const tierFeatures = {
    free: ["Basic HTML portfolio", "Essential sections", "Download as ZIP"],
    pro: ["All 20 templates", "Separate CSS file", "Mobile responsive", "SEO optimized"],
    premium: ["Interactive features", "Smooth animations", "Deployment guide", "Premium support"],
  }

  useEffect(() => {
    // Auto-generate ZIP file when page loads
    generateZipFile()
  }, [])

  const generateZipFile = async () => {
    setIsGenerating(true)

    try {
      const portfolioData = loadPortfolioData()
      const templateId = loadSelectedTemplate()

      if (!portfolioData || !templateId) {
        throw new Error("Portfolio data not found")
      }

      const template = templates.find((t) => t.id === templateId)
      if (!template) {
        throw new Error("Template not found")
      }

      const blob = await generatePortfolioZip(portfolioData, template, tier)
      setZipBlob(blob)
      setDownloadReady(true)
    } catch (error) {
      console.error("Failed to generate ZIP:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (zipBlob) {
      const portfolioData = loadPortfolioData()
      const filename = `${portfolioData?.header?.name?.replace(/\s+/g, "-").toLowerCase() || "portfolio"}-${tier}.zip`
      downloadZip(zipBlob, filename)
    }
  }

  const handleCreateAnother = () => {
    // Clear stored data and start fresh
    localStorage.removeItem("portfolioData")
    localStorage.removeItem("selectedTemplate")
    router.push("/builder")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Portfolio Ready!</h1>
          <p className="text-xl text-muted-foreground">
            {paymentSuccess
              ? `Thank you for your purchase! Your ${tierNames[tier as keyof typeof tierNames]} portfolio is ready to download.`
              : `Your ${tierNames[tier as keyof typeof tierNames]} portfolio has been generated successfully.`}
          </p>
        </div>

        {/* Download Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Your Portfolio
            </CardTitle>
            <CardDescription>
              Your portfolio has been packaged as a ZIP file with everything you need to get online.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGenerating ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4" />
                <p className="text-muted-foreground">Generating your portfolio files...</p>
              </div>
            ) : downloadReady ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Portfolio ZIP File</p>
                      <p className="text-sm text-muted-foreground">Contains HTML, CSS, and all assets</p>
                    </div>
                  </div>
                  <Badge variant="outline">{tierNames[tier as keyof typeof tierNames]} Plan</Badge>
                </div>

                <Button onClick={handleDownload} size="lg" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Portfolio ZIP
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Failed to generate portfolio. Please try again.</p>
                <Button onClick={generateZipFile} variant="outline">
                  Retry Generation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              What's Included in Your {tierNames[tier as keyof typeof tierNames]} Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tierFeatures[tier as keyof typeof tierFeatures].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Here's how to get your portfolio online</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="flex justify-center mb-2">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">1. Download</h4>
                <p className="text-sm text-muted-foreground">Extract the ZIP file to your computer</p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="flex justify-center mb-2">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">2. Customize</h4>
                <p className="text-sm text-muted-foreground">Edit the files to match your style</p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="flex justify-center mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">3. Deploy</h4>
                <p className="text-sm text-muted-foreground">Upload to hosting or use our guide</p>
              </div>
            </div>

            {tier === "premium" && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-2">Premium Bonus: Deployment Guide Included!</h4>
                <p className="text-sm text-muted-foreground">
                  Your download includes a detailed deployment guide with step-by-step instructions for free hosting
                  platforms like Netlify, Vercel, and GitHub Pages.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleCreateAnother} variant="outline" size="lg">
            Create Another Portfolio
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Link href="https://netlify.com" target="_blank">
            <Button size="lg">
              <ExternalLink className="h-4 w-4 mr-2" />
              Deploy on Netlify
            </Button>
          </Link>
        </div>

        {/* Support */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Check out our help center or contact support if you need assistance with your portfolio.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/help">
                <Button variant="outline">Help Center</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
