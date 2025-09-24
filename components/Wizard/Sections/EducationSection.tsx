"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, GraduationCap, Trash2 } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function EducationSection() {
  const { register, control } = useFormContext<Portfolio>()

  const {
    fields: education,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  })

  const handleAddEducation = () => {
    addEducation({
      course: "",
      university: "",
      duration: "",
      location: "",
      highlights: [],
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Education</h3>
        <p className="text-muted-foreground">
          Add your educational background including degrees, certifications, and relevant coursework.
        </p>
      </div>

      {education.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No education added yet</h4>
            <p className="text-muted-foreground mb-4">Add your educational background.</p>
            <Button onClick={handleAddEducation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardContent>
        </Card>
      )}

      {education.map((field, index) => (
        <Card key={field.id} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education {index + 1}
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`course-${index}`}>Degree/Course *</Label>
                <Input
                  id={`course-${index}`}
                  placeholder="Bachelor of Computer Science"
                  {...register(`education.${index}.course`)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`university-${index}`}>Institution *</Label>
                <Input
                  id={`university-${index}`}
                  placeholder="Stanford University"
                  {...register(`education.${index}.university`)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`duration-${index}`}>Duration *</Label>
                <Input
                  id={`duration-${index}`}
                  placeholder="2018 - 2022"
                  {...register(`education.${index}.duration`)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  placeholder="Stanford, CA"
                  {...register(`education.${index}.location`)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`highlights-${index}`}>Highlights & Achievements</Label>
              <Textarea
                id={`highlights-${index}`}
                placeholder="• Graduated Magna Cum Laude (GPA: 3.8/4.0)&#10;• Dean's List for 6 semesters&#10;• Relevant coursework: Data Structures, Algorithms, Machine Learning"
                rows={3}
                {...register(`education.${index}.highlights.0`)}
              />
              <p className="text-xs text-muted-foreground">
                Include GPA (if strong), honors, relevant coursework, or notable achievements
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {education.length > 0 && (
        <Button type="button" variant="outline" onClick={handleAddEducation} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>
      )}

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Education Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• List education in reverse chronological order (most recent first)</li>
            <li>• Include relevant online courses and bootcamps</li>
            <li>• Mention GPA only if it's 3.5 or higher</li>
            <li>• Highlight relevant coursework for your target field</li>
            <li>• Include academic honors and achievements</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
