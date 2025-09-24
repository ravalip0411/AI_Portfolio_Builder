"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function ContactSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Portfolio>()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
        <p className="text-muted-foreground">
          Add your contact details so potential employers and clients can easily reach you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="your.email@example.com"
            {...register("contact.email")}
            className={errors.contact?.email ? "border-destructive" : ""}
          />
          {errors.contact?.email && <p className="text-sm text-destructive">{errors.contact.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input id="contact-phone" placeholder="+1 (555) 123-4567" {...register("contact.phone")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-location" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Location
        </Label>
        <Input id="contact-location" placeholder="San Francisco, CA" {...register("contact.location")} />
        <p className="text-xs text-muted-foreground">Your current location or preferred work location</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn Profile
          </Label>
          <Input
            id="contact-linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register("contact.linkedin")}
            className={errors.contact?.linkedin ? "border-destructive" : ""}
          />
          {errors.contact?.linkedin && <p className="text-sm text-destructive">{errors.contact.linkedin.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-github" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub Profile
          </Label>
          <Input
            id="contact-github"
            placeholder="https://github.com/yourusername"
            {...register("contact.github")}
            className={errors.contact?.github ? "border-destructive" : ""}
          />
          {errors.contact?.github && <p className="text-sm text-destructive">{errors.contact.github.message}</p>}
        </div>
      </div>

      {/* Contact Form Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Form</CardTitle>
          <CardDescription>
            A contact form will be automatically added to your portfolio with these fields:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input placeholder="Visitor's name" disabled />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input placeholder="Visitor's email" disabled />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Message *</Label>
              <Input placeholder="Visitor's message" disabled />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: This is a preview. The actual contact form will be functional in your final portfolio.
          </p>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Contact Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use a professional email address (avoid nicknames or numbers)</li>
            <li>• Include your LinkedIn profile - it's essential for professional networking</li>
            <li>• Add your GitHub if you're in a technical field</li>
            <li>• Consider using a Google Voice number for privacy</li>
            <li>• Make sure all links are working and profiles are up-to-date</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
