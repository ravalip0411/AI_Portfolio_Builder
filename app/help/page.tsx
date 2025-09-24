import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  HelpCircle,
  BookOpen,
  Video,
  MessageSquare,
  Palette,
  Upload,
  CreditCard,
  Download,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    color: "text-blue-500",
    faqs: [
      {
        question: "How do I create my first portfolio?",
        answer:
          "Sign up for an account, choose a template from our gallery, then follow our step-by-step wizard to add your content. The entire process takes about 5-10 minutes.",
      },
      {
        question: "Do I need coding skills to use Portfolio Builder?",
        answer:
          "Not at all! Portfolio Builder is designed for everyone, regardless of technical background. Our visual interface makes it easy to create professional portfolios without any coding.",
      },
      {
        question: "Can I preview my portfolio before downloading?",
        answer:
          "Yes! You can preview your portfolio at any time during the creation process. See exactly how it will look on desktop and mobile devices.",
      },
    ],
  },
  {
    title: "Templates & Design",
    icon: Palette,
    color: "text-purple-500",
    faqs: [
      {
        question: "How many templates are available?",
        answer:
          "We offer 20+ professionally designed templates covering various styles and industries. Each template is fully customizable and mobile-responsive.",
      },
      {
        question: "Can I customize the colors and fonts?",
        answer:
          "All templates support color customization, and Pro/Elite plans include additional color presets and font options.",
      },
      {
        question: "Are the templates mobile-friendly?",
        answer: "Yes, all our templates are fully responsive and optimized for mobile devices, tablets, and desktops.",
      },
    ],
  },
  {
    title: "Content & Data",
    icon: Upload,
    color: "text-green-500",
    faqs: [
      {
        question: "Can I upload my resume to auto-fill my portfolio?",
        answer:
          "Yes! Upload your PDF resume and our system will extract and organize your information automatically. You can then edit and customize everything.",
      },
      {
        question: "What sections can I include in my portfolio?",
        answer:
          "You can include: About, Experience, Projects, Skills, Education, Blog, Testimonials, Certifications, and Contact sections. All sections are optional and customizable.",
      },
      {
        question: "Is my data secure and private?",
        answer:
          "Absolutely. All processing happens locally in your browser. We never store, access, or see your personal information. Your data stays completely private.",
      },
    ],
  },
  {
    title: "Pricing & Plans",
    icon: CreditCard,
    color: "text-yellow-500",
    faqs: [
      {
        question: "What's the difference between plans?",
        answer:
          "Starter ($20) includes 1 export, Pro ($50) includes 3 exports with color presets, and Elite ($80) includes 5 exports with PDF resume embedding and priority support.",
      },
      {
        question: "Can I try before I buy?",
        answer:
          "Yes! You can create and preview your entire portfolio for free. You only pay when you're ready to download the final files.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and other secure payment methods through our payment processor.",
      },
    ],
  },
  {
    title: "Download & Deployment",
    icon: Download,
    color: "text-red-500",
    faqs: [
      {
        question: "What files do I get when I download?",
        answer:
          "You get a complete website with HTML, CSS, JavaScript, images, and a detailed README with deployment instructions for popular platforms.",
      },
      {
        question: "Where can I host my portfolio?",
        answer:
          "Anywhere! GitHub Pages, Netlify, Vercel, your own server, or any web hosting service. We provide step-by-step deployment guides.",
      },
      {
        question: "Can I edit the downloaded files?",
        answer:
          "Yes, the downloaded files are yours to modify. They're built with standard web technologies, so any developer can customize them further.",
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Help Center</h1>
        <p className="text-xl text-muted-foreground text-balance leading-relaxed mb-8">
          Find answers to common questions, browse our guides, or get in touch with our support team.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search for help..." className="pl-10 pr-4 py-3 text-base" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardHeader className="text-center">
            <Video className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>Step-by-step video guides to help you get started quickly</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardHeader className="text-center">
            <MessageSquare className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Get instant help from our AI assistant or support team</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" asChild>
          <Link href="/contact">
            <CardHeader className="text-center">
              <HelpCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Can't find what you're looking for? Reach out to us directly</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-12">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <category.icon className={`h-6 w-6 ${category.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <p className="text-muted-foreground">Common questions about {category.title.toLowerCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.faqs.map((faq, faqIndex) => (
                <Card key={faqIndex} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">{faq.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-16 bg-muted/30 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground text-balance">
            Our support team is here to help you succeed with your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button variant="outline" size="lg" className="h-auto p-6 bg-background" asChild>
            <Link href="/contact">
              <div className="text-center">
                <MessageSquare className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Contact Support</div>
                <div className="text-sm text-muted-foreground">Get personalized help</div>
              </div>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" size="lg" className="h-auto p-6 bg-background" asChild>
            <Link href="/blog">
              <div className="text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Read Our Blog</div>
                <div className="text-sm text-muted-foreground">Tips and best practices</div>
              </div>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
