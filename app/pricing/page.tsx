import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground text-balance leading-relaxed">
          Choose the plan that fits your needs. All plans include our complete template library and professional-grade
          features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {/* Starter Plan */}
        <Card className="border-2 hover:shadow-xl transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Starter</CardTitle>
            <div className="text-4xl font-bold text-primary mb-2">$20</div>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">1 template export</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Minified static assets</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Complete HTML/CSS/JS</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Deployment guide</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Mobile responsive</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-transparent" variant="outline" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-2 border-primary relative hover:shadow-xl transition-all duration-300">
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Pro</CardTitle>
            <div className="text-4xl font-bold text-primary mb-2">$50</div>
            <CardDescription>Best value for professionals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">3 template exports</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Color preset variations</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Favicon pack included</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">SEO optimized</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">All Starter features</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Elite Plan */}
        <Card className="border-2 hover:shadow-xl transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Elite</CardTitle>
            <div className="text-4xl font-bold text-primary mb-2">$80</div>
            <CardDescription>Everything you need and more</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">5 template exports</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">PDF resume embed page</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Advanced customization</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">Priority support</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">All Pro features</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-transparent" variant="outline" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">What's included in the download?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                You get a complete, deployable website with HTML, CSS, JavaScript, images, and a detailed README with
                deployment instructions for popular platforms like GitHub Pages, Netlify, and Vercel.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Can I customize the templates?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Yes! All templates are fully customizable. You can modify colors, fonts, layout, add or remove sections,
                and personalize every aspect of your portfolio through our intuitive editor.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Is my data secure?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Absolutely. All processing happens locally in your browser. We never store, access, or have any
                visibility into your personal information or portfolio data. Your privacy is completely protected.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">What if I need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We provide comprehensive documentation, video tutorials, and our AI assistant is available 24/7 to help
                guide you through the process. Elite plan users also get priority email support.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
