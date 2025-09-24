// // import type { Portfolio } from "./schema"

// // // Mock AI analysis - extracts data from resume text
// // export async function analyzeResume(text: string): Promise<Partial<Portfolio>> {
// //   // Simulate AI processing delay
// //   await new Promise((resolve) => setTimeout(resolve, 2000))

// //   const lines = text
// //     .split("\n")
// //     .map((line) => line.trim())
// //     .filter(Boolean)
// //   const lowerText = text.toLowerCase()

// //   // Extract basic information
// //   const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/)
// //   const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?$$?\d{3}$$?[-.\s]?\d{3}[-.\s]?\d{4}/)
// //   const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/)
// //   const githubMatch = text.match(/github\.com\/[\w-]+/)

// //   // Extract name (usually first line or after "Name:")
// //   let name = ""
// //   const namePatterns = [/^([A-Z][a-z]+ [A-Z][a-z]+)/, /Name:\s*([A-Z][a-z]+ [A-Z][a-z]+)/i]
// //   for (const pattern of namePatterns) {
// //     const match = text.match(pattern)
// //     if (match) {
// //       name = match[1]
// //       break
// //     }
// //   }

// //   // Extract skills
// //   const skills: string[] = []
// //   const skillKeywords = [
// //     "javascript",
// //     "typescript",
// //     "react",
// //     "node.js",
// //     "python",
// //     "java",
// //     "c++",
// //     "html",
// //     "css",
// //     "sql",
// //     "mongodb",
// //     "postgresql",
// //     "aws",
// //     "docker",
// //     "kubernetes",
// //     "git",
// //     "figma",
// //     "photoshop",
// //   ]

// //   skillKeywords.forEach((skill) => {
// //     if (lowerText.includes(skill)) {
// //       skills.push(skill.charAt(0).toUpperCase() + skill.slice(1))
// //     }
// //   })

// //   // Extract experience (look for job titles and companies)
// //   const experience: Array<{
// //     title: string
// //     company: string
// //     startDate: string
// //     endDate: string
// //     description: string
// //   }> = []

// //   const jobTitles = [
// //     "software engineer",
// //     "developer",
// //     "programmer",
// //     "analyst",
// //     "manager",
// //     "designer",
// //     "intern",
// //     "consultant",
// //     "specialist",
// //     "coordinator",
// //     "lead",
// //     "senior",
// //     "junior",
// //   ]

// //   // Simple extraction - look for patterns like "Title at Company"
// //   const experienceMatches = text.match(
// //     /([A-Z][a-z\s]+(?:Engineer|Developer|Manager|Designer|Analyst|Intern))\s+(?:at|@)\s+([A-Z][a-z\s&]+)/gi,
// //   )
// //   if (experienceMatches) {
// //     experienceMatches.slice(0, 3).forEach((match, index) => {
// //       const parts = match.split(/\s+(?:at|@)\s+/i)
// //       if (parts.length === 2) {
// //         experience.push({
// //           title: parts[0].trim(),
// //           company: parts[1].trim(),
// //           startDate: "2022-01",
// //           endDate: index === 0 ? "Present" : "2023-12",
// //           description: `Responsible for various tasks and projects at ${parts[1].trim()}.`,
// //         })
// //       }
// //     })
// //   }

// //   // Extract education
// //   const education: Array<{
// //     degree: string
// //     institution: string
// //     graduationDate: string
// //     gpa?: string
// //   }> = []

// //   const degreePatterns = [
// //     /Bachelor(?:'?s)?\s+(?:of\s+)?(?:Science|Arts|Engineering)\s+in\s+([A-Z][a-z\s]+)/gi,
// //     /Master(?:'?s)?\s+(?:of\s+)?(?:Science|Arts|Engineering)\s+in\s+([A-Z][a-z\s]+)/gi,
// //     /(B\.?S\.?|M\.?S\.?|B\.?A\.?|M\.?A\.?)\s+in\s+([A-Z][a-z\s]+)/gi,
// //   ]

// //   degreePatterns.forEach((pattern) => {
// //     const matches = [...text.matchAll(pattern)]
// //     matches.forEach((match) => {
// //       education.push({
// //         degree: match[0],
// //         institution: "University Name", // Simplified - would need more complex extraction
// //         graduationDate: "2023-05",
// //       })
// //     })
// //   })

// //   // Extract projects (look for project-related keywords)
// //   const projects: Array<{
// //     title: string
// //     description: string
// //     technologies: string[]
// //     liveUrl?: string
// //     githubUrl?: string
// //   }> = []

// //   if (lowerText.includes("project")) {
// //     projects.push({
// //       title: "Portfolio Website",
// //       description: "Built a responsive portfolio website to showcase projects and skills.",
// //       technologies: skills.slice(0, 3),
// //       liveUrl: "https://example.com",
// //       githubUrl: "https://github.com/username/portfolio",
// //     })
// //   }

// //   return {
// //     header: {
// //       name: name || "Your Name",
// //       title: experience[0]?.title || "Software Developer",
// //       email: emailMatch?.[0] || "",
// //       phone: phoneMatch?.[0] || "",
// //       location: "City, State",
// //       linkedin: linkedinMatch?.[0] || "",
// //       github: githubMatch?.[0] || "",
// //       website: "",
// //     },
// //     hero: {
// //       headline: `${name || "Professional"} - ${experience[0]?.title || "Software Developer"}`,
// //       subtext: "Passionate about creating innovative solutions and delivering exceptional results.",
// //       ctaText: "View My Work",
// //       ctaLink: "#projects",
// //       backgroundImage: "",
// //     },
// //     about: {
// //       content: `I am a dedicated ${experience[0]?.title?.toLowerCase() || "professional"} with experience in ${skills.slice(0, 3).join(", ")}. I enjoy solving complex problems and building user-friendly applications.`,
// //       image: "",
// //     },
// //     experience:
// //       experience.length > 0
// //         ? experience
// //         : [
// //             {
// //               title: "Software Developer",
// //               company: "Tech Company",
// //               startDate: "2022-01",
// //               endDate: "Present",
// //               description: "Developed and maintained web applications using modern technologies.",
// //             },
// //           ],
// //     projects:
// //       projects.length > 0
// //         ? projects
// //         : [
// //             {
// //               title: "Sample Project",
// //               description: "A web application built with modern technologies.",
// //               technologies: skills.slice(0, 3),
// //               liveUrl: "",
// //               githubUrl: "",
// //             },
// //           ],
// //     skills: skills.length > 0 ? skills : ["JavaScript", "React", "Node.js"],
// //     education:
// //       education.length > 0
// //         ? education
// //         : [
// //             {
// //               degree: "Bachelor of Science in Computer Science",
// //               institution: "University Name",
// //               graduationDate: "2023-05",
// //             },
// //           ],
// //   }
// // }

// // // Extract text from different file types
// // export async function extractTextFromFile(file: File): Promise<string> {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader()

// //     reader.onload = (e) => {
// //       const result = e.target?.result as string

// //       if (file.type === "text/plain") {
// //         resolve(result)
// //       } else if (file.type === "application/pdf") {
// //         // For demo purposes, return mock PDF content
// //         resolve(`
// //           John Doe
// //           Software Engineer
// //           john.doe@email.com | (555) 123-4567
// //           linkedin.com/in/johndoe | github.com/johndoe
          
// //           EXPERIENCE
// //           Senior Software Engineer at Tech Corp
// //           January 2022 - Present
// //           • Developed scalable web applications using React and Node.js
// //           • Led a team of 5 developers on multiple projects
// //           • Improved application performance by 40%
          
// //           Software Developer at StartupXYZ
// //           June 2020 - December 2021
// //           • Built responsive web interfaces using JavaScript and CSS
// //           • Collaborated with designers and product managers
// //           • Implemented RESTful APIs and database integrations
          
// //           EDUCATION
// //           Bachelor of Science in Computer Science
// //           State University, May 2020
// //           GPA: 3.8/4.0
          
// //           SKILLS
// //           JavaScript, TypeScript, React, Node.js, Python, SQL, MongoDB, AWS, Docker, Git
          
// //           PROJECTS
// //           E-commerce Platform
// //           Built a full-stack e-commerce application with React, Node.js, and MongoDB
          
// //           Task Management App
// //           Developed a collaborative task management tool with real-time updates
// //         `)
// //       } else {
// //         // For DOC/DOCX files, return mock content
// //         resolve(`
// //           Jane Smith
// //           UX/UI Designer
// //           jane.smith@email.com | (555) 987-6543
          
// //           EXPERIENCE
// //           Senior UX Designer at Design Studio
// //           March 2021 - Present
          
// //           UI Designer at Creative Agency
// //           August 2019 - February 2021
          
// //           EDUCATION
// //           Bachelor of Fine Arts in Graphic Design
// //           Art Institute, 2019
          
// //           SKILLS
// //           Figma, Sketch, Adobe Creative Suite, Prototyping, User Research, Wireframing
// //         `)
// //       }
// //     }

// //     reader.onerror = () => reject(new Error("Failed to read file"))
// //     reader.readAsText(file)
// //   })
// // }

// // export function validateResumeFile(file: File): { valid: boolean; error?: string } {
// //   const maxSize = 10 * 1024 * 1024 // 10MB
// //   const allowedTypes = [
// //     "application/pdf",
// //     "application/msword",
// //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// //     "text/plain",
// //   ]

// //   if (file.size > maxSize) {
// //     return { valid: false, error: "File size must be less than 10MB" }
// //   }

// //   if (!allowedTypes.includes(file.type)) {
// //     return { valid: false, error: "Please upload a PDF, DOC, DOCX, or TXT file" }
// //   }

// //   return { valid: true }
// // }


// // lib/resumeAnalysis.ts
// import type { Portfolio } from "./schema";

// // Mock AI analysis - extracts data from resume text
// export async function analyzeResume(text: string): Promise<Partial<Portfolio>> {
//   // Simulate AI processing delay
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   const lowerText = text.toLowerCase();

//   // Extract basic information
//   const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
//   // ✅ fixed: optional country code + area code with optional parentheses
//   const phoneMatch = text.match(/(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/);
//   const linkedinMatch = text.match(/linkedin\.com\/in\/[A-Za-z0-9-_.]+/i);
//   const githubMatch = text.match(/github\.com\/[A-Za-z0-9-_.]+/i);

//   // Extract name (usually first line or after "Name:")
//   let name = "";
//   const namePatterns = [/^([A-Z][a-z]+ [A-Z][a-z]+)/m, /Name:\s*([A-Z][a-z]+ [A-Z][a-z]+)/i];
//   for (const pattern of namePatterns) {
//     const m = text.match(pattern);
//     if (m) { name = m[1]; break; }
//   }

//   // Extract skills (very simple keyword scan)
//   const skills: string[] = [];
//   const skillKeywords = [
//     "javascript","typescript","react","node.js","python","java","c++","html","css","sql",
//     "mongodb","postgresql","aws","docker","kubernetes","git","figma","photoshop"
//   ];
//   skillKeywords.forEach((s) => {
//     if (lowerText.includes(s)) skills.push(s.charAt(0).toUpperCase() + s.slice(1));
//   });

//   // Simple experience extraction: "Title at Company"
//   const experience: Array<{ title: string; company: string; startDate: string; endDate: string; description: string }> = [];
//   const matches = text.match(/([A-Z][a-z\s]+(?:Engineer|Developer|Manager|Designer|Analyst|Intern))\s+(?:at|@)\s+([A-Z][a-z\s&]+)/gi);
//   if (matches) {
//     matches.slice(0, 3).forEach((m, i) => {
//       const parts = m.split(/\s+(?:at|@)\s+/i);
//       if (parts.length === 2) {
//         experience.push({
//           title: parts[0].trim(),
//           company: parts[1].trim(),
//           startDate: "2022-01",
//           endDate: i === 0 ? "Present" : "2023-12",
//           description: `Responsible for various tasks and projects at ${parts[1].trim()}.`,
//         });
//       }
//     });
//   }

//   // Education (simplified)
//   const education: Array<{ degree: string; institution: string; graduationDate: string; gpa?: string }> = [];
//   const degreePatterns = [
//     /Bachelor(?:'?s)?\s+(?:of\s+)?(?:Science|Arts|Engineering)\s+in\s+[A-Z][a-z\s]+/gi,
//     /Master(?:'?s)?\s+(?:of\s+)?(?:Science|Arts|Engineering)\s+in\s+[A-Z][a-z\s]+/gi,
//     /(B\.?S\.?|M\.?S\.?|B\.?A\.?|M\.?A\.?)\s+in\s+[A-Z][a-z\s]+/gi,
//   ];
//   degreePatterns.forEach((p) => {
//     const ms = text.match(p);
//     ms?.forEach((d) => {
//       education.push({
//         degree: d,
//         institution: "University Name",
//         graduationDate: "2023-05",
//       });
//     });
//   });

//   // Projects (toy)
//   const projects =
//     lowerText.includes("project")
//       ? [{
//           title: "Portfolio Website",
//           description: "Built a responsive portfolio website to showcase projects and skills.",
//           technologies: skills.slice(0, 3),
//           liveUrl: "https://example.com",
//           githubUrl: "https://github.com/username/portfolio",
//         }]
//       : [{
//           title: "Sample Project",
//           description: "A web application built with modern technologies.",
//           technologies: skills.slice(0, 3),
//         }];

//   return {
//     // NOTE: This header shape matches how you preview data in your Upload page
//     header: {
//       name: name || "Your Name",
//       title: experience[0]?.title || "Software Developer",
//       email: emailMatch?.[0] || "",
//       phone: phoneMatch?.[0] || "",
//       location: "City, State",
//       linkedin: linkedinMatch?.[0] || "",
//       github: githubMatch?.[0] || "",
//       website: "",
//     },
//     hero: {
//       headline: `${name || "Professional"} - ${experience[0]?.title || "Software Developer"}`,
//       subtext: "Passionate about creating innovative solutions and delivering exceptional results.",
//       ctaText: "View My Work",
//       ctaLink: "#projects",
//       backgroundImage: "",
//     },
//     about: {
//       content: `I am a dedicated ${experience[0]?.title?.toLowerCase() || "professional"} with experience in ${skills.slice(0, 3).join(", ")}.`,
//       image: "",
//     },
//     experience: experience.length
//       ? experience
//       : [{
//           title: "Software Developer",
//           company: "Tech Company",
//           startDate: "2022-01",
//           endDate: "Present",
//           description: "Developed and maintained web applications using modern technologies.",
//         }],
//     projects,
//     skills: skills.length ? skills : ["JavaScript", "React", "Node.js"],
//     education: education.length
//       ? education
//       : [{
//           degree: "Bachelor of Science in Computer Science",
//           institution: "University Name",
//           graduationDate: "2023-05",
//         }],
//   };
// }

// // Extract text from different file types (mock)
// export async function extractTextFromFile(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const result = String(e.target?.result ?? "");
//       if (file.type === "text/plain") {
//         resolve(result);
//       } else if (file.type === "application/pdf") {
//         // demo PDF content
//         resolve(`
// John Doe
// Software Engineer
// john.doe@email.com | (555) 123-4567
// linkedin.com/in/johndoe | github.com/johndoe
// EXPERIENCE
// Senior Software Engineer at Tech Corp
// January 2022 - Present
//         `);
//       } else {
//         // demo DOC/DOCX content
//         resolve(`
// Jane Smith
// UX/UI Designer
// jane.smith@email.com | (555) 987-6543
// EXPERIENCE
// Senior UX Designer at Design Studio
//         `);
//       }
//     };
//     reader.onerror = () => reject(new Error("Failed to read file"));
//     reader.readAsText(file);
//   });
// }

// export function validateResumeFile(file: File): { valid: boolean; error?: string } {
//   const maxSize = 10 * 1024 * 1024; // 10MB
//   const allowed = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "text/plain",
//   ];
//   if (file.size > maxSize) return { valid: false, error: "File size must be less than 10MB" };
//   if (!allowed.includes(file.type)) return { valid: false, error: "Please upload a PDF, DOC, DOCX, or TXT file" };
//   return { valid: true };
// }




// lib/resumeAnalysis.ts
import type { Portfolio } from "./schema";

// Basic helpers
const emailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const phoneRe =
  /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/;
const linkedinRe = /linkedin\.com\/in\/[A-Za-z0-9-_.]+/i;
const githubRe = /github\.com\/[A-Za-z0-9-_.]+/i;

function titleCase(s: string) {
  return s
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

function guessName(text: string) {
  const m =
    text.match(/^([A-Z][a-z]+ [A-Z][a-z]+)/m) ||
    text.match(/Name:\s*([A-Z][a-z]+ [A-Z][a-z]+)/i);
  return m?.[1] ?? "";
}

function toExpDuration(start = "2022-01", end = "Present") {
  return `${start} — ${end}`;
}

// ---- MOCK AI: analyze resume text and return Portfolio-shaped data ----
export async function analyzeResume(text: string): Promise<Partial<Portfolio>> {
  // simulate latency
  await new Promise((r) => setTimeout(r, 1200));

  const lower = text.toLowerCase();

  const email = text.match(emailRe)?.[0] ?? "";
  const phone = text.match(phoneRe)?.[0] ?? "";
  const linkedin = text.match(linkedinRe)?.[0] ?? "";
  const github = text.match(githubRe)?.[0] ?? "";
  const name = guessName(text) || "Your Name";

  // crude title guess
  const titleGuess =
    (text.match(/(Software\s+Engineer|Frontend\s+Developer|Full[-\s]?Stack\s+Developer|Product\s+Designer)/i)?.[1] ??
      "Software Developer") as string;

  // skills (keywords → list)
  const skillKeywords = [
    "javascript","typescript","react","next.js","node.js","python","java","c++",
    "html","css","sql","mongodb","postgresql","aws","docker","kubernetes","git",
    "figma","photoshop"
  ];
  const foundSkills = skillKeywords
    .filter((k) => lower.includes(k))
    .map((k) => (k === "next.js" ? "Next.js" : titleCase(k)));

  // simple exp extraction "Title at Company"
  const expMatches =
    text.match(
      /([A-Z][A-Za-z\s]+(?:Engineer|Developer|Manager|Designer|Analyst|Intern))\s+(?:at|@)\s+([A-Z][A-Za-z\s&]+)/g
    ) ?? [];

  const exp = expMatches.slice(0, 3).map((m, i) => {
    const [roleRaw, companyRaw] = m.split(/\s+(?:at|@)\s+/i);
    return {
      role: roleRaw.trim(),
      company: (companyRaw ?? "Company").trim(),
      duration: toExpDuration("2022-01", i === 0 ? "Present" : "2023-12"),
      location: "Remote",
      bullets: [
        "Built and shipped features across the stack.",
        "Partnered with design/product to deliver on time.",
      ],
    };
  });

  if (exp.length === 0) {
    exp.push({
      role: "Software Developer",
      company: "Tech Company",
      duration: toExpDuration(),
      location: "Remote",
      bullets: [
        "Developed and maintained web applications using modern technologies.",
      ],
    });
  }

  // education (very light)
  const edu: Portfolio["education"] = [
    {
      course: "Bachelor of Science in Computer Science",
      university: "State University",
      duration: "2019 — 2023",
      location: "India",
      highlights: ["GPA: 3.8/4.0"],
    },
  ];

  // projects (toy)
  const projects: Portfolio["projects"] =
    lower.includes("project")
      ? [
          {
            name: "Portfolio Builder",
            duration: "2024",
            description:
              "Frontend-only portfolio generator with template gallery and ZIP export.",
            technologies: foundSkills.slice(0, 4),
            github: "",
            demo: "",
          },
        ]
      : [
          {
            name: "Sample Project",
            duration: "2023",
            description:
              "A web application built with modern technologies.",
            technologies: foundSkills.slice(0, 4),
            github: "",
            demo: "",
          },
        ];

  // skills need categories
  const skills: Portfolio["skills"] = [
    {
      name: "Core",
      skills:
        foundSkills.length > 0
          ? foundSkills
          : ["JavaScript", "React", "TypeScript", "Node.js"],
    },
  ];

  const nowYear = String(new Date().getFullYear());

  return {
    header: {
      siteTitle: `${name} — ${titleGuess}`,
      navLinks: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ],
      logo: "",
    },
    hero: {
      headline: name,
      subheadline: titleGuess,
      intro:
        "Results-driven professional focused on performant, accessible web apps and clean architecture.",
      profilePhoto: "",
    },
    about: {
      bio:
        `I am a dedicated ${titleGuess.toLowerCase()} experienced with `
        + (foundSkills.slice(0, 3).join(", ") || "modern web technologies")
        + ". I enjoy solving complex problems and building user-friendly applications.",
      interests: ["Clean code", "Problem solving", "Great UX"],
      goals: "Ship impactful products with delightful DX/UX.",
      location: "India",
    },
    experience: exp,
    projects,
    skills,
    education: edu,
    blog: [],
    testimonials: [],
    certifications: [],
    contact: {
      linkedin,
      github,
      email,
      phone,
      location: "India",
    },
    footer: {
      copyrightYear: nowYear,
      reservedText: "All rights reserved",
      quickLinks: [],
    },
  };
}

// Mock file text extraction
export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = (e) => resolve(String(e.target?.result ?? ""));
    r.onerror = () => reject(new Error("Failed to read file"));
    r.readAsText(file);
  });
}

export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  if (file.size > maxSize) return { valid: false, error: "File size must be less than 10MB" };
  if (!allowed.includes(file.type)) return { valid: false, error: "Please upload a PDF, DOC, DOCX, or TXT file" };
  return { valid: true };
}
