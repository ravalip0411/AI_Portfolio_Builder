"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RichText } from "@/components/Wizard/RichText"
import { ImagePicker } from "@/components/Wizard/ImagePicker"
import { Plus, PenTool, Trash2 } from "lucide-react"
import type { Portfolio } from "@/lib/schema"

export function BlogSection() {
  const { register, control, watch, setValue } = useFormContext<Portfolio>()

  const {
    fields: blogPosts,
    append: addBlogPost,
    remove: removeBlogPost,
  } = useFieldArray({
    control,
    name: "blog",
  })

  const handleAddBlogPost = () => {
    addBlogPost({
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      date: new Date().toISOString().split("T")[0],
      tags: [],
    })
  }

  const handleAddTag = (postIndex: number, tag: string) => {
    if (!tag.trim()) return
    const currentTags = watch(`blog.${postIndex}.tags`) || []
    setValue(`blog.${postIndex}.tags`, [...currentTags, tag.trim()])
  }

  const handleRemoveTag = (postIndex: number, tagIndex: number) => {
    const currentTags = watch(`blog.${postIndex}.tags`) || []
    const updatedTags = currentTags.filter((_, index) => index !== tagIndex)
    setValue(`blog.${postIndex}.tags`, updatedTags)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Blog Posts</h3>
        <p className="text-muted-foreground">
          Share your thoughts, insights, and expertise through blog posts to demonstrate your knowledge and
          communication skills.
        </p>
      </div>

      {blogPosts.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <PenTool className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="font-semibold mb-2">No blog posts added yet</h4>
            <p className="text-muted-foreground mb-4">Add your first blog post to showcase your expertise.</p>
            <Button onClick={handleAddBlogPost}>
              <Plus className="h-4 w-4 mr-2" />
              Add Blog Post
            </Button>
          </CardContent>
        </Card>
      )}

      {blogPosts.map((field, index) => {
        const tags = watch(`blog.${index}.tags`) || []
        const coverImage = watch(`blog.${index}.coverImage`)

        return (
          <Card key={field.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  Blog Post {index + 1}
                </CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBlogPost(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`blog-title-${index}`}>Title *</Label>
                  <Input
                    id={`blog-title-${index}`}
                    placeholder="10 Tips for Better Code Reviews"
                    {...register(`blog.${index}.title`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`blog-date-${index}`}>Date *</Label>
                  <Input id={`blog-date-${index}`} type="date" {...register(`blog.${index}.date`)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`blog-excerpt-${index}`}>Excerpt *</Label>
                <Input
                  id={`blog-excerpt-${index}`}
                  placeholder="A brief summary of what this post is about..."
                  {...register(`blog.${index}.excerpt`)}
                />
                <p className="text-xs text-muted-foreground">A short description that appears in blog listings</p>
              </div>

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <ImagePicker
                  value={coverImage}
                  onChange={(value) => setValue(`blog.${index}.coverImage`, value)}
                  onRemove={() => setValue(`blog.${index}.coverImage`, "")}
                  placeholder="Upload cover image"
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRemoveTag(index, tagIndex)}
                      >
                        ×
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag (e.g., JavaScript, Tutorial, Career)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        handleAddTag(index, input.value)
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
                      handleAddTag(index, input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`blog-content-${index}`}>Content *</Label>
                <RichText
                  value={watch(`blog.${index}.content`) || ""}
                  onChange={(value) => setValue(`blog.${index}.content`, value)}
                  placeholder="Write your blog post content here. You can use **bold**, *italic*, and other formatting..."
                  minRows={6}
                />
              </div>
            </CardContent>
          </Card>
        )
      })}

      {blogPosts.length > 0 && (
        <Button type="button" variant="outline" onClick={handleAddBlogPost} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Blog Post
        </Button>
      )}

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Tips for Blog Section</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Write about topics relevant to your field and expertise</li>
            <li>• Include both technical tutorials and industry insights</li>
            <li>• Use clear, engaging titles that describe the value</li>
            <li>• Add relevant tags to help categorize your content</li>
            <li>• Include high-quality cover images to make posts more appealing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
