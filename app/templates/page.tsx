// app/templates/page.tsx
"use client";

import { useState } from "react";
import { TEMPLATES, type Template } from "@/lib/templates"; // <-- import your data + type
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, Palette, Layout, Monitor } from "lucide-react";

/* ---------------- TemplateCard (your component) ---------------- */

interface TemplateCardProps {
  template: Template;
  isSelected?: boolean;
  onSelect?: (template: Template) => void;
  onPreview?: (template: Template) => void;
}

function TemplateCard({ template, isSelected, onSelect, onPreview }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = () => onSelect?.(template);
  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview?.(template);
  };

  const getCategoryColor = (category: Template["category"]) => {
    switch (category) {
      case "minimal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "modern":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "creative":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "professional":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "bold":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getColorSchemeIcon = (scheme: Template["colorScheme"]) => {
    switch (scheme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "mixed":
        return "🌗";
      default:
        return "☀️";
    }
  };

  const getLayoutIcon = (layout: Template["layout"]) => {
    switch (layout) {
      case "single-page":
        return <Layout className="h-3 w-3" />;
      case "multi-section":
        return <Monitor className="h-3 w-3" />;
      case "grid-based":
        return (
          <div className="w-3 h-3 grid grid-cols-2 gap-0.5">
            <div className="bg-current rounded-sm" />
            <div className="bg-current rounded-sm" />
            <div className="bg-current rounded-sm" />
            <div className="bg-current rounded-sm" />
          </div>
        );
      case "timeline":
        return (
          <div className="w-3 h-3 flex flex-col gap-0.5">
            <div className="h-0.5 bg-current rounded" />
            <div className="h-0.5 bg-current rounded" />
            <div className="h-0.5 bg-current rounded" />
          </div>
        );
      default:
        return <Layout className="h-3 w-3" />;
    }
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-xl border-2",
        isSelected ? "border-primary bg-primary/5 shadow-lg" : "border-border hover:border-primary/50",
        "relative overflow-hidden"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelect}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-primary-foreground" />
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={template.thumbnail || "/placeholder.svg"}
          alt={`${template.name} template preview`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button variant="secondary" size="sm" onClick={handlePreview} className="bg-white/90 text-black hover:bg-white">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight truncate">{template.name}</CardTitle>
            <CardDescription className="text-sm mt-1 line-clamp-2">{template.description}</CardDescription>
          </div>
          <Badge className={getCategoryColor(template.category)} variant="secondary">
            {template.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">+{template.tags.length - 3}</Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                {getLayoutIcon(template.layout)}
                {template.layout.replace("-", " ")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>{getColorSchemeIcon(template.colorScheme)}</span>
              <span>{template.colorScheme}</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Palette className="h-3 w-3" />
              <span className="font-medium">Features:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 ml-4">
              {template.features.slice(0, 2).map((feature) => (
                <li key={feature} className="truncate">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- Default export: the actual page ---------------- */

export default function TemplatesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Template Gallery</h1>
        <p className="text-muted-foreground">Pick a starting point. You can customize everything later.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            template={tpl}
            isSelected={selectedId === tpl.id}
            onSelect={(t) => setSelectedId(t.id)}
            onPreview={(t) => {
              // TODO: push to a preview route or open a modal
              // e.g., router.push(`/builder/preview?template=${t.id}`)
              alert(`Preview: ${t.name}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
