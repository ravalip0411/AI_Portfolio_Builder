"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check, Star, Zap, Crown, CreditCard, Download } from "lucide-react"
import Link from "next/link"

const pricingTiers = [
  {
    id: "free",
    name: "Free",
    price: "$20",
    description: "Perfect for getting started",
    features: [
      "Basic HTML portfolio",
      "1 template design",
      "Essential sections only",
      "Basic styling",
      "Download as ZIP",
    ],
    limitations: ["No custom CSS file", "No JavaScript features", "No deployment guide", "Limited customization"],
    icon: Download,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$50",
    description: "Most popular choice for professionals",
    features: [
      "Everything in Free",
      "All 20 template designs",
      "Separate CSS file for easy customization",
      "Professional styling",
      "Mobile-responsive design",
      "SEO-optimized structure",
      "Priority support",
    ],
    limitations: [],
    icon: Zap,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$80",
    description: "Complete solution with advanced features",
    features: [
      "Everything in Pro",
      "Interactive JavaScript features",
      "Smooth animations & transitions",
      "Advanced template customization",
      "Deployment guide & hosting tips",
      "Custom domain setup guide",
      "1-year of updates",
      "Premium support",
    ],
    limitations: [],
    icon: Crown,
    popular: false,
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState<string>("")
  const [showPayment, setShowPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    country: "US",
  })

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId)
    if (tierId === "free") {
      // Free tier - go directly to download
      router.push(`/builder/success?tier=${tierId}`)
    } else {
      // Paid tier - show payment form
      setShowPayment(true)
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful payment
    router.push(`/builder/success?tier=${selectedTier}&payment=success`)
  }

  const selectedTierData = pricingTiers.find((tier) => tier.id === selectedTier)

  if (showPayment && selectedTierData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => setShowPayment(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
              <p className="text-muted-foreground">Secure payment powered by Stripe</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedTierData.icon className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedTierData.name} Plan</p>
                    <p className="text-sm text-muted-foreground">{selectedTierData.description}</p>
                  </div>
                  <p className="text-2xl font-bold">{selectedTierData.price}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{selectedTierData.price}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>Your payment information is secure and encrypted</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={paymentData.email}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Use 4242 4242 4242 4242 for testing</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>Complete Purchase {selectedTierData.price}</>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment processing. Your information is protected with 256-bit SSL encryption.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/builder/review">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Review
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Choose Your Plan</h1>
            <p className="text-muted-foreground">Select the perfect plan for your portfolio needs</p>
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
              <span className="text-sm font-medium">Add Content</span>
            </div>
            <div className="w-8 h-px bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium">Review & Preview</span>
            </div>
            <div className="w-8 h-px bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="text-sm font-medium text-primary">Choose Plan & Download</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon
            return (
              <Card
                key={tier.id}
                className={`relative transition-all hover:shadow-lg ${
                  tier.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""
                } ${selectedTier === tier.id ? "ring-2 ring-primary" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-full ${tier.popular ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold">{tier.price}</div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                    onClick={() => handleTierSelect(tier.id)}
                  >
                    {tier.id === "free" ? "Download Free" : `Get ${tier.name}`}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What's included in the download?</h4>
                <p className="text-sm text-muted-foreground">
                  You'll get a complete HTML portfolio with all your content, styling, and assets ready to upload to any
                  web hosting service.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I customize the design later?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Pro and Premium plans include separate CSS files that make customization easy, even if you're not
                  a developer.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do I need hosting?</h4>
                <p className="text-sm text-muted-foreground">
                  The Premium plan includes a deployment guide with free hosting options like Netlify and Vercel that
                  you can use immediately.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is this a one-time payment?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! All plans are one-time purchases. You own your portfolio files forever with no recurring fees.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
