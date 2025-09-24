"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Briefcase, Trash2 } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function ExperienceSection() {
  const { register, control } = useFormContext<Portfolio>()

  const {
    fields: experiences,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  })

  const {
    fields: bullets,
    append: addBullet,
    remove: removeBullet,
  } = useFieldArray({
    control,
    name: "experience",
  })

  const handleAddExperience = () => {
    addExperience({
      role: "",
      company: "",
      duration: "",
      location: "",
      bullets: [],
    })
  }

  const handleAddBullet = (experienceIndex: number) => {
    const currentBullets = experiences[experienceIndex]?.bullets || []
    // This is a simplified approach - in a real implementation you'd need nested field arrays
    console.log("Add bullet for experience", experienceIndex)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
        <p className="text-muted-foreground">
          Add your professional experience to showcase your career progression and achievements.
        </p>
      </div>

      {experiences.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No experience added yet</h4>
            <p className="text-muted-foreground mb-4">Add your first work experience to get started.</p>
            <Button onClick={handleAddExperience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardContent>
        </Card>
      )}

      {experiences.map((field, index) => (
        <Card key={field.id} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experience {index + 1}
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`role-${index}`}>Job Title *</Label>
                <Input
                  id={`role-${index}`}
                  placeholder="Senior Software Engineer"
                  {...register(`experience.${index}.role`)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>Company *</Label>
                <Input
                  id={`company-${index}`}
                  placeholder="Tech Company Inc."
                  {...register(`experience.${index}.company`)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`duration-${index}`}>Duration *</Label>
                <Input
                  id={`duration-${index}`}
                  placeholder="Jan 2020 - Present"
                  {...register(`experience.${index}.duration`)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  placeholder="San Francisco, CA"
                  {...register(`experience.${index}.location`)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`bullets-${index}`}>Key Achievements & Responsibilities</Label>
              <Textarea
                id={`bullets-${index}`}
                placeholder="• Led a team of 5 developers to build a new product feature&#10;• Improved application performance by 40%&#10;• Implemented CI/CD pipeline reducing deployment time by 60%"
                rows={4}
                {...register(`experience.${index}.bullets.0`)}
              />
              <p className="text-xs text-muted-foreground">
                Use bullet points to highlight your key achievements and responsibilities
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {experiences.length > 0 && (
        <Button type="button" variant="outline" onClick={handleAddExperience} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Experience
        </Button>
      )}

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Experience Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Start with your most recent position first</li>
            <li>• Use action verbs and quantify achievements when possible</li>
            <li>• Focus on results and impact, not just responsibilities</li>
            <li>• Keep descriptions concise but informative</li>
            <li>• Include relevant internships and freelance work</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
