"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Award, Trash2, ExternalLink } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function CertificationsSection() {
  const { register, control } = useFormContext<Portfolio>()

  const {
    fields: certifications,
    append: addCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  })

  const handleAddCertification = () => {
    addCertification({
      course: "",
      platform: "",
      duration: "",
      credentialLink: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Certifications</h3>
        <p className="text-muted-foreground">
          Add professional certifications, online courses, and credentials that demonstrate your commitment to learning.
        </p>
      </div>

      {certifications.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No certifications added yet</h4>
            <p className="text-muted-foreground mb-4">Add your professional certifications and courses.</p>
            <Button onClick={handleAddCertification}>
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </CardContent>
        </Card>
      )}

      {certifications.map((field, index) => (
        <Card key={field.id} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certification {index + 1}
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-course-${index}`}>Course/Certification Name *</Label>
                <Input
                  id={`cert-course-${index}`}
                  placeholder="AWS Certified Solutions Architect"
                  {...register(`certifications.${index}.course`)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-platform-${index}`}>Platform/Institution *</Label>
                <Input
                  id={`cert-platform-${index}`}
                  placeholder="Amazon Web Services"
                  {...register(`certifications.${index}.platform`)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-duration-${index}`}>Date Completed</Label>
                <Input
                  id={`cert-duration-${index}`}
                  placeholder="March 2024"
                  {...register(`certifications.${index}.duration`)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`cert-link-${index}`} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Credential Link
                </Label>
                <Input
                  id={`cert-link-${index}`}
                  placeholder="https://credentials.platform.com/certificate/123"
                  {...register(`certifications.${index}.credentialLink`)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {certifications.length > 0 && (
        <Button type="button" variant="outline" onClick={handleAddCertification} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Certification
        </Button>
      )}

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Certifications Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Include both formal certifications and online course completions</li>
            <li>• List most recent or relevant certifications first</li>
            <li>• Always include credential links when available</li>
            <li>• Focus on certifications relevant to your target roles</li>
            <li>• Include completion dates to show currency of knowledge</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
