"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Code, Trash2, Github, ExternalLink } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function ProjectsSection() {
  const { register, control, watch, setValue } = useFormContext<Portfolio>()

  const {
    fields: projects,
    append: addProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  })

  const handleAddProject = () => {
    addProject({
      name: "",
      duration: "",
      description: "",
      technologies: [],
      github: "",
      demo: "",
    })
  }

  const handleAddTechnology = (projectIndex: number, tech: string) => {
    if (!tech.trim()) return
    const currentTechs = watch(`projects.${projectIndex}.technologies`) || []
    setValue(`projects.${projectIndex}.technologies`, [...currentTechs, tech.trim()])
  }

  const handleRemoveTechnology = (projectIndex: number, techIndex: number) => {
    const currentTechs = watch(`projects.${projectIndex}.technologies`) || []
    const updatedTechs = currentTechs.filter((_, index) => index !== techIndex)
    setValue(`projects.${projectIndex}.technologies`, updatedTechs)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Projects</h3>
        <p className="text-muted-foreground">
          Showcase your best work and projects that demonstrate your skills and expertise.
        </p>
      </div>

      {projects.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Code className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No projects added yet</h4>
            <p className="text-muted-foreground mb-4">Add your first project to showcase your work.</p>
            <Button onClick={handleAddProject}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </CardContent>
        </Card>
      )}

      {projects.map((field, index) => {
        const technologies = watch(`projects.${index}.technologies`) || []

        return (
          <Card key={field.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Project {index + 1}
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`project-name-${index}`}>Project Name *</Label>
                  <Input
                    id={`project-name-${index}`}
                    placeholder="E-commerce Platform"
                    {...register(`projects.${index}.name`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-duration-${index}`}>Duration</Label>
                  <Input
                    id={`project-duration-${index}`}
                    placeholder="3 months"
                    {...register(`projects.${index}.duration`)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`project-description-${index}`}>Description *</Label>
                <Textarea
                  id={`project-description-${index}`}
                  placeholder="A full-stack e-commerce platform built with React and Node.js. Features include user authentication, payment processing, inventory management, and real-time order tracking."
                  rows={3}
                  {...register(`projects.${index}.description`)}
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRemoveTechnology(index, techIndex)}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology (e.g., React, Node.js)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        handleAddTechnology(index, input.value)
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
                      handleAddTechnology(index, input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`project-github-${index}`} className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub URL
                  </Label>
                  <Input
                    id={`project-github-${index}`}
                    placeholder="https://github.com/username/project"
                    {...register(`projects.${index}.github`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-demo-${index}`} className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo URL
                  </Label>
                  <Input
                    id={`project-demo-${index}`}
                    placeholder="https://project-demo.com"
                    {...register(`projects.${index}.demo`)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {projects.length > 0 && (
        <Button type="button" variant="outline" onClick={handleAddProject} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Project
        </Button>
      )}

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Projects Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Choose 3-5 of your best projects that showcase different skills</li>
            <li>• Include both personal and professional projects</li>
            <li>• Explain the problem you solved and your approach</li>
            <li>• Mention specific technologies and tools you used</li>
            <li>• Always include links to live demos or GitHub repositories</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
