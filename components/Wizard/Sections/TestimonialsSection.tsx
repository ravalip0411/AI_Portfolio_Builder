"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePicker } from "@/components/Wizard/ImagePicker"
import { Plus, MessageSquare, Trash2 } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function TestimonialsSection() {
  const { register, control, watch, setValue } = useFormContext<Portfolio>()

  const {
    fields: testimonials,
    append: addTestimonial,
    remove: removeTestimonial,
  } = useFieldArray({
    control,
    name: "testimonials",
  })

  const handleAddTestimonial = () => {
    addTestimonial({
      name: "",
      designation: "",
      company: "",
      quote: "",
      photo: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Testimonials</h3>
        <p className="text-muted-foreground">
          Add testimonials from colleagues, clients, or supervisors to build credibility and showcase your impact.
        </p>
      </div>

      {testimonials.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No testimonials added yet</h4>
            <p className="text-muted-foreground mb-4">Add testimonials to build trust and credibility.</p>
            <Button onClick={handleAddTestimonial}>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </CardContent>
        </Card>
      )}

      {testimonials.map((field, index) => {
        const photo = watch(`testimonials.${index}.photo`)

        return (
          <Card key={field.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Testimonial {index + 1}
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTestimonial(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-name-${index}`}>Name *</Label>
                  <Input
                    id={`testimonial-name-${index}`}
                    placeholder="John Smith"
                    {...register(`testimonials.${index}.name`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-designation-${index}`}>Job Title *</Label>
                  <Input
                    id={`testimonial-designation-${index}`}
                    placeholder="Senior Product Manager"
                    {...register(`testimonials.${index}.designation`)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`testimonial-company-${index}`}>Company *</Label>
                <Input
                  id={`testimonial-company-${index}`}
                  placeholder="Tech Company Inc."
                  {...register(`testimonials.${index}.company`)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`testimonial-quote-${index}`}>Testimonial Quote *</Label>
                <Textarea
                  id={`testimonial-quote-${index}`}
                  placeholder="Working with [Your Name] was an absolute pleasure. Their attention to detail and ability to deliver high-quality work under tight deadlines made them an invaluable team member. I would highly recommend them for any development project."
                  rows={4}
                  {...register(`testimonials.${index}.quote`)}
                />
                <p className="text-xs text-muted-foreground">
                  The actual testimonial text - keep it authentic and specific
                </p>
              </div>

              <div className="space-y-2">
                <Label>Photo (Optional)</Label>
                <ImagePicker
                  value={photo}
                  onChange={(value) => setValue(`testimonials.${index}.photo`, value)}
                  onRemove={() => setValue(`testimonials.${index}.photo`, "")}
                  placeholder="Upload person's photo"
                />
                <p className="text-xs text-muted-foreground">
                  A professional photo of the person giving the testimonial
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {testimonials.length > 0 && (
        <Button type="button" variant="outline" onClick={handleAddTestimonial} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Testimonial
        </Button>
      )}

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Testimonials Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Always get permission before using someone's testimonial</li>
            <li>• Include specific details about your work and impact</li>
            <li>• Use testimonials from different types of relationships (colleagues, clients, supervisors)</li>
            <li>• Keep testimonials authentic and avoid overly promotional language</li>
            <li>• Include the person's full name, title, and company for credibility</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
