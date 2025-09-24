"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldChip } from "@/components/Wizard/FieldChip"
import { ImagePicker } from "@/components/Wizard/ImagePicker"
import { Plus, LinkIcon } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function HeaderSection() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<Portfolio>()

  const {
    fields: navLinks,
    append: addNavLink,
    remove: removeNavLink,
  } = useFieldArray({
    control,
    name: "header.navLinks",
  })

  const watchedLogo = watch("header.logo")

  const handleAddNavLink = () => {
    addNavLink({ label: "", href: "" })
  }

  return (
    <div className="space-y-6">
      {/* Site Title */}
      <div className="space-y-2">
        <Label htmlFor="siteTitle">Site Title *</Label>
        <Input
          id="siteTitle"
          placeholder="Your Portfolio"
          {...register("header.siteTitle")}
          className={errors.header?.siteTitle ? "border-destructive" : ""}
        />
        {errors.header?.siteTitle && <p className="text-sm text-destructive">{errors.header.siteTitle.message}</p>}
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <Label>Logo (Optional)</Label>
        <ImagePicker
          value={watchedLogo}
          onChange={(value) => setValue("header.logo", value)}
          onRemove={() => setValue("header.logo", "")}
          placeholder="Upload your logo"
        />
        <p className="text-xs text-muted-foreground">Upload a logo image or leave empty to use text-based branding</p>
      </div>

      {/* Navigation Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Navigation Links
          </CardTitle>
          <CardDescription>
            Add navigation links for your portfolio. These will appear in the header menu.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {navLinks.map((field, index) => (
            <div key={field.id} className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Link {index + 1}</h4>
                <FieldChip label={`Link ${index + 1}`} onRemove={() => removeNavLink(index)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`navLink-${index}-label`}>Label</Label>
                  <Input
                    id={`navLink-${index}-label`}
                    placeholder="Home"
                    {...register(`header.navLinks.${index}.label`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`navLink-${index}-href`}>Link</Label>
                  <Input
                    id={`navLink-${index}-href`}
                    placeholder="#home"
                    {...register(`header.navLinks.${index}.href`)}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={handleAddNavLink} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Navigation Link
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Header Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Keep your site title concise and professional</li>
            <li>• Use a high-quality logo that works on both light and dark backgrounds</li>
            <li>• Limit navigation links to 4-6 main sections for best user experience</li>
            <li>• Use descriptive labels like "About" instead of "Info"</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
