import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, FileText, Eye, CreditCard, Download, CheckCircle, Star, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 lg:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ professionals
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
              Build a World‑Class Portfolio — <span className="text-primary">No Coding, No Barriers</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
              Land your dream job with a stunning portfolio that showcases your skills. Choose from 20+ professional
              templates, add your content, and download a complete website in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>

              <Button variant="ghost" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="#how-it-works">
                  See How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ portfolios created</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>No coding required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-32">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              From Idea to Portfolio in 5 Simple Steps
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Our intuitive process guides you through creating a professional portfolio that stands out to employers
              and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Step 1 */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <CardTitle className="text-lg">Pick a Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Choose from 20+ stunning templates designed by professionals
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <CardTitle className="text-lg">Provide Data</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Fill in your details manually or upload your resume for instant setup
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  See your portfolio come to life and make final adjustments
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <CardTitle className="text-lg">Choose Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Select from our affordable pricing options starting at $20
                </CardDescription>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <CardTitle className="text-lg">Download ZIP</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get your complete portfolio website ready to deploy anywhere
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/signup">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Why Choose Portfolio Builder?</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Everything you need to create a portfolio that gets you hired.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
                <CardTitle>No Coding Required</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Build professional portfolios without writing a single line of code. Our intuitive interface makes it
                  easy for everyone.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Palette className="h-8 w-8 text-blue-500 mb-4" />
                <CardTitle>20+ Premium Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose from carefully crafted templates designed by professionals. Each template is mobile-responsive
                  and ATS-friendly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-8 w-8 text-yellow-500 mb-4" />
                <CardTitle>5-Minute Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload your resume or fill in the form manually. Our AI helps extract and organize your information
                  instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Download className="h-8 w-8 text-purple-500 mb-4" />
                <CardTitle>Complete Website</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Download a complete, deployable website. Host it anywhere - GitHub Pages, Netlify, Vercel, or your own
                  server.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Eye className="h-8 w-8 text-indigo-500 mb-4" />
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  See your portfolio update in real-time as you make changes. What you see is exactly what you get.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-4" />
                <CardTitle>Trusted by Thousands</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join over 10,000 professionals who have successfully landed jobs using portfolios built with our
                  platform.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">Ready to Build Your Portfolio?</h2>
            <p className="text-xl text-muted-foreground text-balance mb-8">
              Join thousands of professionals who have transformed their careers with stunning portfolios. Start
              building yours today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
