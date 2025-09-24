"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldChip } from "@/components/Wizard/FieldChip"
import { Plus, Heart, MapPin } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function AboutSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Portfolio>()

  const {
    fields: interests,
    append: addInterest,
    remove: removeInterest,
  } = useFieldArray({
    control,
    name: "about.interests",
  })

  const handleAddInterest = () => {
    addInterest("")
  }

  return (
    <div className="space-y-6">
      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio *</Label>
        <Textarea
          id="bio"
          placeholder="Tell your story. What drives you? What's your background? What makes you unique? Share your journey, passions, and what you're working towards."
          rows={6}
          {...register("about.bio")}
          className={errors.about?.bio ? "border-destructive" : ""}
        />
        {errors.about?.bio && <p className="text-sm text-destructive">{errors.about.bio.message}</p>}
        <p className="text-xs text-muted-foreground">
          Share your professional story, background, and what makes you unique (minimum 10 characters)
        </p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Location
        </Label>
        <Input id="location" placeholder="San Francisco, CA" {...register("about.location")} />
        <p className="text-xs text-muted-foreground">Your current location or where you're open to work</p>
      </div>

      {/* Goals */}
      <div className="space-y-2">
        <Label htmlFor="goals">Goals & Aspirations</Label>
        <Textarea
          id="goals"
          placeholder="What are you working towards? What kind of opportunities are you seeking? What impact do you want to make?"
          rows={3}
          {...register("about.goals")}
        />
        <p className="text-xs text-muted-foreground">
          Share your professional goals and what you're looking to achieve
        </p>
      </div>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Interests & Hobbies
          </CardTitle>
          <CardDescription>
            Add personal interests that show your personality and make you more relatable.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {interests.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input placeholder="Photography" {...register(`about.interests.${index}`)} className="w-32" />
                <FieldChip label={`Interest ${index + 1}`} onRemove={() => removeInterest(index)} />
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={handleAddInterest} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Interest
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for About Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Write in first person to create a personal connection</li>
            <li>• Include both professional background and personal elements</li>
            <li>• Mention specific achievements or experiences that shaped you</li>
            <li>• Show personality through your interests and hobbies</li>
            <li>• Keep it authentic and conversational, not overly formal</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
