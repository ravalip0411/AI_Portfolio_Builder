import JSZip from "jszip"
import type { Portfolio } from "./schema"
import type { Template } from "./templates"

// Generate HTML content for the portfolio
function generatePortfolioHTML(portfolio: Portfolio, template: Template): string {
  const templateStyles = getTemplateCSS(template)

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolio.header?.name || "Portfolio"} - Portfolio</title>
    <style>
        ${templateStyles}
    </style>
</head>
<body>
    <div class="portfolio-container">
        ${generateHeaderHTML(portfolio)}
        ${generateHeroHTML(portfolio)}
        ${generateAboutHTML(portfolio)}
        ${generateExperienceHTML(portfolio)}
        ${generateProjectsHTML(portfolio)}
        ${generateSkillsHTML(portfolio)}
        ${generateEducationHTML(portfolio)}
        ${generateContactHTML(portfolio)}
        ${generateFooterHTML(portfolio)}
    </div>
</body>
</html>`
}

function getTemplateCSS(template: Template): string {
  const baseStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
    }
    
    .portfolio-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    .section {
        margin-bottom: 3rem;
    }
    
    .section-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        text-align: center;
    }
    
    .card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header {
        text-align: center;
        padding: 3rem 0;
        border-bottom: 2px solid #eee;
        margin-bottom: 3rem;
    }
    
    .hero {
        text-align: center;
        padding: 4rem 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        margin-bottom: 3rem;
    }
    
    .skills-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .skill-tag {
        background: #f0f0f0;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
    }
    
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .contact-info {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
    
    .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: #667eea;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        transition: background 0.2s;
    }
    
    .btn:hover {
        background: #5a67d8;
    }
    
    .footer {
        text-align: center;
        padding: 2rem 0;
        border-top: 1px solid #eee;
        margin-top: 3rem;
        color: #666;
    }
  `

  // Template-specific styles
  switch (template.id) {
    case "minimal-serif":
      return (
        baseStyles +
        `
        body { font-family: Georgia, serif; }
        .hero { background: #2d3748; }
        .section-title { font-family: Georgia, serif; }
      `
      )
    case "modern-gradient":
      return (
        baseStyles +
        `
        body { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); }
        .card { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); }
      `
      )
    case "dark-professional":
      return (
        baseStyles +
        `
        body { background: #1a202c; color: #e2e8f0; }
        .card { background: #2d3748; color: #e2e8f0; }
        .hero { background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%); }
      `
      )
    default:
      return baseStyles
  }
}

function generateHeaderHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.header || !portfolio.header) return ""

  return `
    <header class="header">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">${portfolio.header.name}</h1>
        <p style="font-size: 1.25rem; color: #666; margin-bottom: 1rem;">${portfolio.header.title}</p>
        <div class="contact-info">
            ${portfolio.header.email ? `<span>📧 ${portfolio.header.email}</span>` : ""}
            ${portfolio.header.phone ? `<span>📞 ${portfolio.header.phone}</span>` : ""}
            ${portfolio.header.location ? `<span>📍 ${portfolio.header.location}</span>` : ""}
        </div>
        <div style="margin-top: 1rem;">
            ${portfolio.header.linkedin ? `<a href="${portfolio.header.linkedin}" class="btn" style="margin: 0 0.5rem;">LinkedIn</a>` : ""}
            ${portfolio.header.github ? `<a href="${portfolio.header.github}" class="btn" style="margin: 0 0.5rem;">GitHub</a>` : ""}
            ${portfolio.header.website ? `<a href="${portfolio.header.website}" class="btn" style="margin: 0 0.5rem;">Website</a>` : ""}
        </div>
    </header>
  `
}

function generateHeroHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.hero || !portfolio.hero) return ""

  return `
    <section class="hero">
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">${portfolio.hero.headline}</h2>
        <p style="font-size: 1.125rem; margin-bottom: 2rem; opacity: 0.9;">${portfolio.hero.subtext}</p>
        ${portfolio.hero.ctaText ? `<a href="${portfolio.hero.ctaLink || "#"}" class="btn">${portfolio.hero.ctaText}</a>` : ""}
    </section>
  `
}

function generateAboutHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.about || !portfolio.about) return ""

  return `
    <section class="section">
        <h2 class="section-title">About Me</h2>
        <div class="card">
            <p>${portfolio.about.content}</p>
        </div>
    </section>
  `
}

function generateExperienceHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.experience || !portfolio.experience?.length) return ""

  const experienceItems = portfolio.experience
    .map(
      (exp) => `
    <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <div>
                <h3 style="font-size: 1.25rem; font-weight: bold;">${exp.title}</h3>
                <p style="color: #667eea; font-weight: 500;">${exp.company}</p>
            </div>
            <span style="color: #666; font-size: 0.875rem;">${exp.startDate} - ${exp.endDate}</span>
        </div>
        <p>${exp.description}</p>
    </div>
  `,
    )
    .join("")

  return `
    <section class="section">
        <h2 class="section-title">Experience</h2>
        ${experienceItems}
    </section>
  `
}

function generateProjectsHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.projects || !portfolio.projects?.length) return ""

  const projectItems = portfolio.projects
    .map(
      (project) => `
    <div class="card">
        <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">${project.title}</h3>
        <p style="margin-bottom: 1rem;">${project.description}</p>
        <div class="skills-grid" style="margin-bottom: 1rem;">
            ${project.technologies?.map((tech) => `<span class="skill-tag">${tech}</span>`).join("") || ""}
        </div>
        <div>
            ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn" style="margin-right: 0.5rem;">Live Demo</a>` : ""}
            ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn">View Code</a>` : ""}
        </div>
    </div>
  `,
    )
    .join("")

  return `
    <section class="section">
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid">
            ${projectItems}
        </div>
    </section>
  `
}

function generateSkillsHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.skills || !portfolio.skills?.length) return ""

  return `
    <section class="section">
        <h2 class="section-title">Skills</h2>
        <div class="card">
            <div class="skills-grid">
                ${portfolio.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
        </div>
    </section>
  `
}

function generateEducationHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.education || !portfolio.education?.length) return ""

  const educationItems = portfolio.education
    .map(
      (edu) => `
    <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
                <h3 style="font-size: 1.25rem; font-weight: bold;">${edu.degree}</h3>
                <p style="color: #667eea; font-weight: 500;">${edu.institution}</p>
                ${edu.gpa ? `<p style="color: #666; font-size: 0.875rem;">GPA: ${edu.gpa}</p>` : ""}
            </div>
            <span style="color: #666; font-size: 0.875rem;">${edu.graduationDate}</span>
        </div>
    </div>
  `,
    )
    .join("")

  return `
    <section class="section">
        <h2 class="section-title">Education</h2>
        ${educationItems}
    </section>
  `
}

function generateContactHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.contact) return ""

  return `
    <section class="section">
        <h2 class="section-title">Get In Touch</h2>
        <div class="card" style="text-align: center;">
            <p style="margin-bottom: 2rem;">Interested in working together? Let's connect!</p>
            <div>
                ${portfolio.header?.email ? `<a href="mailto:${portfolio.header.email}" class="btn">Email Me</a>` : ""}
            </div>
        </div>
    </section>
  `
}

function generateFooterHTML(portfolio: Portfolio): string {
  if (!portfolio.enabledSections?.footer || !portfolio.footer) return ""

  return `
    <footer class="footer">
        <p>© ${portfolio.footer.copyrightYear} ${portfolio.header?.name}. ${portfolio.footer.reservedText}</p>
        ${
          portfolio.footer.quickLinks?.length
            ? `
            <div style="margin-top: 1rem;">
                ${portfolio.footer.quickLinks.map((link) => `<a href="${link.href}" style="margin: 0 1rem; color: #667eea;">${link.label}</a>`).join("")}
            </div>
        `
            : ""
        }
    </footer>
  `
}

// Generate README file
function generateReadme(portfolio: Portfolio): string {
  return `# ${portfolio.header?.name || "Portfolio"} - Portfolio Website

This portfolio was generated using the AI-Powered Portfolio Builder.

## About
${portfolio.about?.content || "Professional portfolio showcasing skills and experience."}

## Contact
${portfolio.header?.email ? `- Email: ${portfolio.header.email}` : ""}
${portfolio.header?.linkedin ? `- LinkedIn: ${portfolio.header.linkedin}` : ""}
${portfolio.header?.github ? `- GitHub: ${portfolio.header.github}` : ""}

## How to Use
1. Open \`index.html\` in your web browser to view the portfolio
2. Upload the files to any web hosting service to make it live
3. Customize the content by editing the HTML file

## Features
- Responsive design that works on all devices
- Professional layout and styling
- Easy to customize and maintain
- SEO-friendly structure

Generated with ❤️ by Portfolio Builder
`
}

// Main ZIP generation function
export async function generatePortfolioZip(portfolio: Portfolio, template: Template, tier: string): Promise<Blob> {
  const zip = new JSZip()

  // Generate main HTML file
  const htmlContent = generatePortfolioHTML(portfolio, template)
  zip.file("index.html", htmlContent)

  // Add README
  const readmeContent = generateReadme(portfolio)
  zip.file("README.md", readmeContent)

  // Add additional files based on tier
  if (tier === "pro" || tier === "premium") {
    // Add CSS file for easier customization
    const cssContent = getTemplateCSS(template)
    zip.file("styles.css", cssContent)

    // Update HTML to use external CSS
    const htmlWithExternalCSS = htmlContent.replace(
      /<style>[\s\S]*?<\/style>/,
      '<link rel="stylesheet" href="styles.css">',
    )
    zip.file("index.html", htmlWithExternalCSS, { overwrite: true })
  }

  if (tier === "premium") {
    // Add JavaScript for interactivity
    const jsContent = `
// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
`
    zip.file("script.js", jsContent)

    // Add deployment guide
    const deployGuide = `# Deployment Guide

## Quick Deployment Options

### 1. Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your portfolio folder
3. Your site will be live instantly!

### 2. Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your project from GitHub or upload directly
3. Deploy with zero configuration

### 3. GitHub Pages
1. Create a new repository on GitHub
2. Upload your files
3. Enable GitHub Pages in repository settings

### 4. Traditional Web Hosting
Upload all files to your web hosting provider's public_html or www folder.

## Custom Domain
Most hosting providers allow you to connect a custom domain for a professional look.

## SEO Tips
- Update the title tag in index.html
- Add meta descriptions
- Optimize images for web
- Submit to Google Search Console
`
    zip.file("DEPLOYMENT.md", deployGuide)
  }

  // Generate and return the ZIP blob
  return await zip.generateAsync({ type: "blob" })
}

export function downloadZip(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
