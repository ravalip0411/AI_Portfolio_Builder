"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Zap, Trash2 } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function SkillsSection() {
  const { register, control, watch, setValue } = useFormContext<Portfolio>()

  const {
    fields: skillCategories,
    append: addSkillCategory,
    remove: removeSkillCategory,
  } = useFieldArray({
    control,
    name: "skills",
  })

  const handleAddSkillCategory = () => {
    addSkillCategory({
      name: "",
      skills: [],
    })
  }

  const handleAddSkill = (categoryIndex: number, skill: string) => {
    if (!skill.trim()) return
    const currentSkills = watch(`skills.${categoryIndex}.skills`) || []
    setValue(`skills.${categoryIndex}.skills`, [...currentSkills, skill.trim()])
  }

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const currentSkills = watch(`skills.${categoryIndex}.skills`) || []
    const updatedSkills = currentSkills.filter((_, index) => index !== skillIndex)
    setValue(`skills.${categoryIndex}.skills`, updatedSkills)
  }

  const defaultCategories = [
    { name: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js"] },
    { name: "Backend", skills: ["Node.js", "Python", "Java", "PostgreSQL", "MongoDB"] },
    { name: "Tools & Technologies", skills: ["Git", "Docker", "AWS", "Figma", "VS Code"] },
  ]

  const handleAddDefaultCategories = () => {
    defaultCategories.forEach((category) => {
      addSkillCategory(category)
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Skills & Technologies</h3>
        <p className="text-muted-foreground">
          Organize your skills into categories to help visitors quickly understand your expertise.
        </p>
      </div>

      {skillCategories.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Zap className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No skills added yet</h4>
            <p className="text-muted-foreground mb-4">Add your skills organized by categories.</p>
            <div className="flex gap-2">
              <Button onClick={handleAddDefaultCategories} variant="outline">
                Add Default Categories
              </Button>
              <Button onClick={handleAddSkillCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Category
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {skillCategories.map((field, index) => {
        const skills = watch(`skills.${index}.skills`) || []

        return (
          <Card key={field.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Skill Category {index + 1}
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkillCategory(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`skill-category-${index}`}>Category Name *</Label>
                <Input
                  id={`skill-category-${index}`}
                  placeholder="Frontend Development"
                  {...register(`skills.${index}.name`)}
                />
              </div>

              <div className="space-y-2">
                <Label>Skills in this category</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRemoveSkill(index, skillIndex)}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add skill (e.g., React, Python, Figma)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        handleAddSkill(index, input.value)
                        input.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement
                      handleAddSkill(index, input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {skillCategories.length > 0 && (
        <Button type="button" variant="outline" onClick={handleAddSkillCategory} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Category
        </Button>
      )}

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Skills Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Group related skills into logical categories</li>
            <li>• List skills you're genuinely proficient in</li>
            <li>• Include both technical and soft skills</li>
            <li>• Order skills by proficiency level within each category</li>
            <li>• Keep the list focused and relevant to your target roles</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
