//app/dashboard/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/Common/ProtectedRoute"
import { ArrowRight, Briefcase, Users, TrendingUp, Award, CheckCircle, Sparkles } from "lucide-react"

function DashboardContent() {
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Welcome Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Ready to create something amazing?</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main CTA Card */}
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">Create Your Portfolio</CardTitle>
                  <CardDescription className="text-base">
                    Build a world-class portfolio in minutes. Choose from 20+ templates and showcase your skills.
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  New
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 flex-1" asChild>
                  <Link href="/builder">
                    Let's make a portfolio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                  <Link href="/templates">Browse Templates</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">10,000+</div>
              <p className="text-sm text-muted-foreground">Portfolios created</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">94%</div>
              <p className="text-sm text-muted-foreground">Get interviews</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Portfolio Matters Section */}
      <div className="mt-12">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Why a Portfolio Matters
            </CardTitle>
            <CardDescription>A strong portfolio is your competitive advantage in today's job market</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Showcase Skills</h4>
                  <p className="text-sm text-muted-foreground">
                    Demonstrate your abilities with real projects and achievements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Build Credibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Professional presentation builds trust with employers and clients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">ATS Friendly</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimized for applicant tracking systems used by recruiters
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Stand Out</h4>
                  <p className="text-sm text-muted-foreground">
                    Differentiate yourself from other candidates in the hiring process
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Ready to get started?</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Our guided process makes it easy to create a portfolio that gets results. Most users complete their
                portfolio in under 10 minutes.
              </p>
              <Button asChild>
                <Link href="/builder">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
