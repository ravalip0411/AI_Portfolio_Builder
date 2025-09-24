"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldChip } from "@/components/Wizard/FieldChip"
import { Plus, Layout } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function FooterSection() {
  const { register, control } = useFormContext<Portfolio>()

  const {
    fields: quickLinks,
    append: addQuickLink,
    remove: removeQuickLink,
  } = useFieldArray({
    control,
    name: "footer.quickLinks",
  })

  const handleAddQuickLink = () => {
    addQuickLink({ label: "", href: "" })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Footer</h3>
        <p className="text-muted-foreground">
          Configure your portfolio footer with copyright information and quick navigation links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="footer-year">Copyright Year</Label>
          <Input id="footer-year" placeholder="2024" {...register("footer.copyrightYear")} />
          <p className="text-xs text-muted-foreground">Usually the current year</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="footer-reserved">Rights Text</Label>
          <Input id="footer-reserved" placeholder="All rights reserved" {...register("footer.reservedText")} />
          <p className="text-xs text-muted-foreground">Standard copyright text</p>
        </div>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Quick Links
          </CardTitle>
          <CardDescription>Add quick navigation links that will appear in your footer for easy access.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickLinks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-4">No quick links added yet</p>
              <Button type="button" variant="outline" onClick={handleAddQuickLink}>
                <Plus className="h-4 w-4 mr-2" />
                Add Quick Link
              </Button>
            </div>
          )}

          {quickLinks.map((field, index) => (
            <div key={field.id} className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Quick Link {index + 1}</h4>
                <FieldChip label={`Link ${index + 1}`} onRemove={() => removeQuickLink(index)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`quickLink-${index}-label`}>Label</Label>
                  <Input
                    id={`quickLink-${index}-label`}
                    placeholder="Privacy Policy"
                    {...register(`footer.quickLinks.${index}.label`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`quickLink-${index}-href`}>Link</Label>
                  <Input
                    id={`quickLink-${index}-href`}
                    placeholder="/privacy"
                    {...register(`footer.quickLinks.${index}.href`)}
                  />
                </div>
              </div>
            </div>
          ))}

          {quickLinks.length > 0 && (
            <Button type="button" variant="outline" onClick={handleAddQuickLink} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Quick Link
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Footer Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Footer Preview</CardTitle>
          <CardDescription>See how your footer will appear on your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg text-center text-sm">
            <p className="text-muted-foreground">
              © {register("footer.copyrightYear").name ? "2024" : "YYYY"} Your Name.{" "}
              {register("footer.reservedText").name ? "All rights reserved" : "Rights text"}.
            </p>
            {quickLinks.length > 0 && (
              <div className="flex justify-center gap-4 mt-2 text-xs">
                {quickLinks.map((link, index) => (
                  <span key={index} className="text-primary hover:underline cursor-pointer">
                    {link.label || `Link ${index + 1}`}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
