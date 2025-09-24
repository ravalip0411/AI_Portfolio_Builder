import { z } from "zod"

// Core portfolio data schemas
export const HeroSchema = z.object({
  headline: z.string().min(2, "Headline is required"),
  subheadline: z.string().optional(),
  intro: z.string().optional(),
  profilePhoto: z.string().optional(),
})

export const AboutSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  interests: z.array(z.string()).default([]),
  goals: z.string().optional(),
  location: z.string().optional(),
})

export const ExperienceSchema = z.object({
  role: z.string().min(2, "Role is required"),
  company: z.string().min(2, "Company is required"),
  duration: z.string().min(2, "Duration is required"),
  location: z.string().optional(),
  bullets: z.array(z.string()).default([]),
})

export const ProjectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  duration: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.array(z.string()).default([]),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  demo: z.string().url("Invalid demo URL").optional().or(z.literal("")),
})

export const SkillCategorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  skills: z.array(z.string()).default([]),
})

export const EducationSchema = z.object({
  course: z.string().min(2, "Course/Program is required"),
  university: z.string().min(2, "University is required"),
  duration: z.string().min(2, "Duration is required"),
  location: z.string().optional(),
  highlights: z.array(z.string()).default([]),
})

export const BlogPostSchema = z.object({
  title: z.string().min(2, "Title is required"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  tags: z.array(z.string()).default([]),
})

export const TestimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().min(2, "Designation is required"),
  company: z.string().min(2, "Company is required"),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  photo: z.string().optional(),
})

export const CertificationSchema = z.object({
  course: z.string().min(2, "Course is required"),
  platform: z.string().min(2, "Platform is required"),
  duration: z.string().optional(),
  credentialLink: z.string().url("Invalid credential URL").optional().or(z.literal("")),
})

export const ContactSchema = z.object({
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
})

export const HeaderSchema = z.object({
  siteTitle: z.string().min(2, "Site title is required"),
  navLinks: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .default([]),
  logo: z.string().optional(),
})

export const FooterSchema = z.object({
  copyrightYear: z.string().default(new Date().getFullYear().toString()),
  reservedText: z.string().default("All rights reserved"),
  quickLinks: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .default([]),
})

// Complete portfolio schema
export const PortfolioSchema = z.object({
  header: HeaderSchema,
  hero: HeroSchema,
  about: AboutSchema.optional(),
  experience: z.array(ExperienceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  skills: z.array(SkillCategorySchema).default([]),
  education: z.array(EducationSchema).default([]),
  blog: z.array(BlogPostSchema).default([]),
  testimonials: z.array(TestimonialSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  contact: ContactSchema.optional(),
  footer: FooterSchema,
})

export type Portfolio = z.infer<typeof PortfolioSchema>
export type Hero = z.infer<typeof HeroSchema>
export type About = z.infer<typeof AboutSchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Project = z.infer<typeof ProjectSchema>
export type SkillCategory = z.infer<typeof SkillCategorySchema>
export type Education = z.infer<typeof EducationSchema>
export type BlogPost = z.infer<typeof BlogPostSchema>
export type Testimonial = z.infer<typeof TestimonialSchema>
export type Certification = z.infer<typeof CertificationSchema>
export type Contact = z.infer<typeof ContactSchema>
export type Header = z.infer<typeof HeaderSchema>
export type Footer = z.infer<typeof FooterSchema>

// Section configuration for wizard
export interface SectionConfig {
  id: keyof Portfolio
  label: string
  description: string
  icon: string
  enabled: boolean
  required: boolean
}

export const DEFAULT_SECTIONS: SectionConfig[] = [
  {
    id: "header",
    label: "Header",
    description: "Site navigation and branding",
    icon: "Layout",
    enabled: true,
    required: true,
  },
  {
    id: "hero",
    label: "Hero",
    description: "Main introduction and headline",
    icon: "User",
    enabled: true,
    required: true,
  },
  {
    id: "about",
    label: "About",
    description: "Personal bio and background",
    icon: "FileText",
    enabled: true,
    required: false,
  },
  {
    id: "experience",
    label: "Experience",
    description: "Work history and roles",
    icon: "Briefcase",
    enabled: true,
    required: false,
  },
  {
    id: "projects",
    label: "Projects",
    description: "Portfolio projects and work",
    icon: "Code",
    enabled: true,
    required: false,
  },
  {
    id: "skills",
    label: "Skills",
    description: "Technical and soft skills",
    icon: "Zap",
    enabled: true,
    required: false,
  },
  {
    id: "education",
    label: "Education",
    description: "Academic background",
    icon: "GraduationCap",
    enabled: true,
    required: false,
  },
  { id: "blog", label: "Blog", description: "Articles and thoughts", icon: "PenTool", enabled: false, required: false },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Client and colleague feedback",
    icon: "MessageSquare",
    enabled: false,
    required: false,
  },
  {
    id: "certifications",
    label: "Certifications",
    description: "Professional certifications",
    icon: "Award",
    enabled: false,
    required: false,
  },
  {
    id: "contact",
    label: "Contact",
    description: "Contact information and form",
    icon: "Mail",
    enabled: true,
    required: false,
  },
  {
    id: "footer",
    label: "Footer",
    description: "Site footer and links",
    icon: "Layout",
    enabled: true,
    required: true,
  },
]
