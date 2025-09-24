"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Mail, Phone, MapPin, Calendar, Award } from "lucide-react"
import type { Portfolio } from "@/lib/schema"
import type { Template } from "@/lib/templates"

interface PortfolioPreviewProps {
  portfolio: Portfolio
  template: Template
  className?: string
}

export function PortfolioPreview({ portfolio, template, className }: PortfolioPreviewProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  // Template-specific styling
  const getTemplateStyles = () => {
    switch (template.id) {
      case "minimal-serif":
        return {
          container: "font-serif bg-white text-gray-900",
          header: "border-b border-gray-200 pb-8 mb-8",
          section: "mb-12",
          title: "text-2xl font-bold mb-6 text-gray-900",
          card: "border border-gray-200 rounded-none shadow-sm",
        }
      case "modern-gradient":
        return {
          container: "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900",
          header: "bg-white/80 backdrop-blur-sm rounded-lg p-8 mb-8 shadow-lg",
          section: "mb-10",
          title: "text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
          card: "bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg",
        }
      case "dark-professional":
        return {
          container: "bg-gray-900 text-white",
          header: "border-b border-gray-700 pb-8 mb-8",
          section: "mb-12",
          title: "text-2xl font-bold mb-6 text-white",
          card: "bg-gray-800 border border-gray-700 rounded-lg",
        }
      default:
        return {
          container: "bg-white text-gray-900",
          header: "border-b pb-8 mb-8",
          section: "mb-10",
          title: "text-2xl font-bold mb-6",
          card: "border rounded-lg shadow-sm",
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <div className={`${styles.container} p-8 min-h-screen ${className}`}>
      {/* Header Section */}
      {portfolio.enabledSections?.header && (
        <header className={styles.header}>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">{portfolio.header?.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">{portfolio.header?.title}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {portfolio.header?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {portfolio.header.email}
                </div>
              )}
              {portfolio.header?.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {portfolio.header.phone}
                </div>
              )}
              {portfolio.header?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {portfolio.header.location}
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {portfolio.header?.linkedin && (
                <Button variant="outline" size="sm">
                  LinkedIn
                </Button>
              )}
              {portfolio.header?.github && (
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </Button>
              )}
              {portfolio.header?.website && (
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Website
                </Button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      {portfolio.enabledSections?.hero && portfolio.hero && (
        <section className={styles.section}>
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">{portfolio.hero.headline}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{portfolio.hero.subtext}</p>
            {portfolio.hero.ctaText && <Button size="lg">{portfolio.hero.ctaText}</Button>}
          </div>
        </section>
      )}

      {/* About Section */}
      {portfolio.enabledSections?.about && portfolio.about && (
        <section className={styles.section}>
          <h3 className={styles.title}>About Me</h3>
          <Card className={styles.card}>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">{portfolio.about.content}</p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.enabledSections?.experience && portfolio.experience && portfolio.experience.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.title}>Experience</h3>
          <div className="space-y-6">
            {portfolio.experience.map((exp, index) => (
              <Card key={index} className={styles.card}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.enabledSections?.projects && portfolio.projects && portfolio.projects.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.title}>Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, index) => (
              <Card key={index} className={styles.card}>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.enabledSections?.skills && portfolio.skills && portfolio.skills.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.title}>Skills</h3>
          <Card className={styles.card}>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Education Section */}
      {portfolio.enabledSections?.education && portfolio.education && portfolio.education.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.title}>Education</h3>
          <div className="space-y-4">
            {portfolio.education.map((edu, index) => (
              <Card key={index} className={styles.card}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {edu.graduationDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      {portfolio.enabledSections?.contact && (
        <section className={styles.section}>
          <h3 className={styles.title}>Get In Touch</h3>
          <Card className={styles.card}>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-6">Interested in working together? Let's connect!</p>
              <div className="flex justify-center gap-4">
                {portfolio.header?.email && (
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Email Me
                  </Button>
                )}
                {portfolio.header?.linkedin && <Button variant="outline">LinkedIn</Button>}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Footer */}
      {portfolio.enabledSections?.footer && portfolio.footer && (
        <footer className="border-t pt-8 mt-16 text-center text-sm text-muted-foreground">
          <p>
            © {portfolio.footer.copyrightYear} {portfolio.header?.name}. {portfolio.footer.reservedText}
          </p>
          {portfolio.footer.quickLinks && portfolio.footer.quickLinks.length > 0 && (
            <div className="flex justify-center gap-4 mt-2">
              {portfolio.footer.quickLinks.map((link, index) => (
                <a key={index} href={link.href} className="hover:text-primary">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </footer>
      )}
    </div>
  )
}
