import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Zap, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">About Portfolio Builder</h1>
        <p className="text-xl text-muted-foreground text-balance leading-relaxed">
          We believe everyone deserves a chance to showcase their talents. That's why we built a platform that removes
          barriers and makes professional portfolio creation accessible to all.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            We're on a mission to democratize professional portfolio creation. Too many talented individuals miss
            opportunities because they lack the technical skills or resources to build a compelling online presence.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Portfolio Builder bridges that gap by providing world-class templates, intuitive tools, and guidance that
            helps anyone create a portfolio that truly represents their potential.
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              What Drives Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Accessibility First</h4>
              <p className="text-sm text-muted-foreground">
                No coding knowledge required. Our platform is designed for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quality Without Compromise</h4>
              <p className="text-sm text-muted-foreground">
                Professional-grade templates that rival expensive custom designs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Privacy Focused</h4>
              <p className="text-sm text-muted-foreground">
                Your data stays on your device. We don't store or sell your information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your personal information and portfolio data remain completely private. Everything runs in your browser
                - no server storage, no data collection.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Inclusive Design</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built for everyone, regardless of technical background. Our language-friendly interface uses visual cues
                to minimize barriers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle>Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                No waiting, no complex setup. Create, preview, and download your portfolio in minutes, not hours or
                days.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">By the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-muted-foreground">Portfolios Created</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">20+</div>
            <p className="text-muted-foreground">Professional Templates</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">94%</div>
            <p className="text-muted-foreground">User Success Rate</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">5 min</div>
            <p className="text-muted-foreground">Average Setup Time</p>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <Card className="border-0 shadow-lg bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Your Privacy Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            Portfolio Builder is designed with privacy at its core. All processing happens locally in your browser - we
            never see, store, or have access to your personal information. Your portfolio data belongs to you and stays
            with you.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">No Data Collection</Badge>
            <Badge variant="secondary">Local Processing</Badge>
            <Badge variant="secondary">GDPR Compliant</Badge>
            <Badge variant="secondary">Open Source</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
