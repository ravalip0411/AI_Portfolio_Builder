import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Portfolio Mistakes That Cost You Job Interviews",
    excerpt:
      "Avoid these common pitfalls that make recruiters skip your application. Learn what hiring managers really look for in portfolios.",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Career Tips",
    image: "/professional-portfolio-mistakes.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "How to Showcase Projects Without Real Work Experience",
    excerpt:
      "New graduates and career changers can build compelling portfolios using personal projects, coursework, and volunteer work.",
    author: "Marcus Johnson",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Getting Started",
    image: "/student-portfolio-projects.jpg",
  },
  {
    id: 3,
    title: "The Psychology of Color in Portfolio Design",
    excerpt:
      "Understanding how colors influence perception can help you choose the right template and create the perfect first impression.",
    author: "Elena Rodriguez",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "Design",
    image: "/color-psychology-design.jpg",
  },
  {
    id: 4,
    title: "ATS-Friendly Portfolios: What You Need to Know",
    excerpt: "Make sure your portfolio passes through applicant tracking systems and reaches human recruiters.",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Technical",
    image: "/ats-applicant-tracking-system.jpg",
  },
  {
    id: 5,
    title: "From Portfolio to Interview: Success Stories",
    excerpt: "Real stories from professionals who landed their dream jobs using portfolios built with our platform.",
    author: "Portfolio Builder Team",
    date: "2024-01-05",
    readTime: "8 min read",
    category: "Success Stories",
    image: "/job-interview-success.jpg",
  },
  {
    id: 6,
    title: "Mobile-First Portfolio Design in 2024",
    excerpt:
      "Why mobile optimization is crucial for your portfolio and how our templates ensure perfect mobile experience.",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Design",
    image: "/mobile-responsive-design.png",
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Portfolio Builder Blog</h1>
        <p className="text-xl text-muted-foreground text-balance leading-relaxed">
          Tips, insights, and inspiration to help you create portfolios that get results. Learn from experts and success
          stories.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{featuredPost.category}</Badge>
                  <Badge>Featured</Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-balance mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground text-balance leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.id}`}>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => (
          <Card
            key={post.id}
            className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-balance leading-relaxed mb-4">{post.excerpt}</CardDescription>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16">
        <Card className="border-0 shadow-lg bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Stay Updated</CardTitle>
            <CardDescription>
              Get the latest portfolio tips and career advice delivered to your inbox weekly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-input rounded-lg bg-background"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
