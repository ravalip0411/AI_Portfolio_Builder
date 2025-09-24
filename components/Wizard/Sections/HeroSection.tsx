"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePicker } from "@/components/Wizard/ImagePicker"
import { User } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function HeroSection() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<Portfolio>()

  const watchedProfilePhoto = watch("hero.profilePhoto")

  return (
    <div className="space-y-6">
      {/* Headline */}
      <div className="space-y-2">
        <Label htmlFor="headline">Headline *</Label>
        <Input
          id="headline"
          placeholder="Full Stack Developer & UI/UX Designer"
          {...register("hero.headline")}
          className={errors.hero?.headline ? "border-destructive" : ""}
        />
        {errors.hero?.headline && <p className="text-sm text-destructive">{errors.hero.headline.message}</p>}
        <p className="text-xs text-muted-foreground">A compelling headline that describes what you do</p>
      </div>

      {/* Subheadline */}
      <div className="space-y-2">
        <Label htmlFor="subheadline">Subheadline</Label>
        <Input
          id="subheadline"
          placeholder="Creating beautiful, functional digital experiences"
          {...register("hero.subheadline")}
        />
        <p className="text-xs text-muted-foreground">A supporting statement that adds context to your headline</p>
      </div>

      {/* Introduction */}
      <div className="space-y-2">
        <Label htmlFor="intro">Introduction</Label>
        <Textarea
          id="intro"
          placeholder="I'm passionate about creating user-centered designs and building scalable web applications. With 5+ years of experience, I help businesses transform their ideas into digital reality."
          rows={4}
          {...register("hero.intro")}
        />
        <p className="text-xs text-muted-foreground">
          A brief introduction that gives visitors a sense of who you are and what you do
        </p>
      </div>

      {/* Profile Photo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Photo
          </CardTitle>
          <CardDescription>
            Add a professional headshot to make your portfolio more personal and trustworthy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImagePicker
            value={watchedProfilePhoto}
            onChange={(value) => setValue("hero.profilePhoto", value)}
            onRemove={() => setValue("hero.profilePhoto", "")}
            placeholder="Upload your profile photo"
          />
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Hero Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Make your headline specific and action-oriented</li>
            <li>• Use your subheadline to highlight your unique value proposition</li>
            <li>• Keep your introduction concise but engaging (2-3 sentences)</li>
            <li>• Use a high-quality, professional photo where you look approachable</li>
            <li>• Consider your target audience when crafting your message</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
