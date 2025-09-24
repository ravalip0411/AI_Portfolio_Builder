//components/Upload/FileDropZone.tsx
"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { validateResumeFile } from "@/lib/resumeAnalysis"

interface FileDropZoneProps {
  onFileSelect: (file: File) => void
  isProcessing?: boolean
  progress?: number
  className?: string
}

export function FileDropZone({ onFileSelect, isProcessing, progress = 0, className }: FileDropZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>("")

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      const validation = validateResumeFile(file)
      if (!validation.valid) {
        setError(validation.error || "Invalid file")
        return
      }

      setError("")
      setSelectedFile(file)
      onFileSelect(file)
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    multiple: false,
    disabled: isProcessing,
  })

  const clearFile = () => {
    setSelectedFile(null)
    setError("")
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragActive && "border-primary bg-primary/5",
          error && "border-destructive",
          isProcessing && "cursor-not-allowed opacity-50",
        )}
      >
        <CardContent className="p-8 text-center">
          <input {...getInputProps()} />

          {selectedFile && !error ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                {!isProcessing && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFile()
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    Analyzing resume...
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-muted-foreground">{progress}% complete</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                {error ? (
                  <AlertCircle className="h-12 w-12 text-destructive" />
                ) : (
                  <Upload className="h-12 w-12 text-muted-foreground" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {error ? "Upload Error" : isDragActive ? "Drop your resume here" : "Upload your resume"}
                </h3>
                <p className="text-muted-foreground">
                  {error ? error : "Drag and drop your resume file, or click to browse"}
                </p>
              </div>

              {!error && (
                <div className="space-y-2">
                  <Button type="button" variant="outline" disabled={isProcessing}>
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX, and TXT files up to 10MB</p>
                </div>
              )}

              {error && (
                <Button type="button" variant="outline" onClick={clearFile}>
                  Try Again
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedFile && !error && !isProcessing && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          File ready for analysis
        </div>
      )}
    </div>
  )
}
