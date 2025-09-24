//app/builder/resume/page.tsx

// app/builder/resume/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileDropZone } from "@/components/Upload/FileDropZone";
import { analyzeResume, extractTextFromFile } from "@/lib/resumeAnalysis"; // ok if mocked
import { savePortfolioData, STORAGE_KEYS, setStoredValue } from "@/lib/persist";
import type { Portfolio } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { CheckCircle2, Sparkles, FileText } from "lucide-react";
import Link from "next/link";

/** Semi-circle ATS gauge (70–95) */
function AnalysisMeter({ score = 80 }: { score: number }) {
  // Semi-circle path math
  const radius = 90;
  const circumference = Math.PI * radius; // half of full circle (2πr/2)
  const clamped = Math.max(0, Math.min(100, score));
  const ratio = clamped / 100;
  const dash = circumference * ratio;
  const rest = circumference - dash;

  const color = useMemo(() => {
    if (clamped >= 90) return "stroke-green-500";
    if (clamped >= 80) return "stroke-yellow-500";
    return "stroke-orange-500";
  }, [clamped]);

  return (
    <div className="w-[260px] mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        {/* track */}
        <path
          d="M10 110 A 100 100 0 0 1 190 110"
          className="stroke-muted-foreground/20"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        {/* value */}
        <path
          d="M10 110 A 100 100 0 0 1 190 110"
          className={cn(color)}
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${rest}`}
        />
      </svg>
      <div className="text-center -mt-6">
        <div className="text-3xl font-bold">{clamped}</div>
        <div className="text-sm text-muted-foreground">ATS score</div>
      </div>
    </div>
  );
}

/** Dumb name/title from filename */
function deriveBasicsFromFilename(filename: string) {
  // ex: "john_doe - Senior Developer Resume.pdf" -> John Doe, Senior Developer
  const base = filename.replace(/\.[a-z0-9]+$/i, "");
  const parts = base.split(/[-_]/).map((s) => s.trim());
  const firstChunk = parts[0] || "Your Name";
  const name = firstChunk
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ")
    .slice(0, 40) || "Your Name";
  const guessTitle =
    (parts.slice(1).join(" ").match(/(developer|engineer|designer|manager|analyst)/i)?.[0] as string) ||
    "Software Engineer";
  return { name, title: guessTitle };
}

/** Make a plausible Portfolio object */
function buildSimulatedPortfolio(text: string, filename: string): Portfolio {
  const { name, title } = deriveBasicsFromFilename(filename);
  const nowYear = String(new Date().getFullYear());

  return {
    header: {
      siteTitle: `${name} — ${title}`,
      navLinks: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ],
      logo: "",
    },
    hero: {
      headline: `${name}`,
      subheadline: `${title}`,
      intro:
        "Results-driven professional with hands-on experience delivering projects end-to-end. Passionate about clean architecture, performance, and great UX.",
      profilePhoto: "",
    },
    about: {
      bio:
        "I specialize in building modern, accessible web apps and data-driven systems. I enjoy shipping quickly while keeping codebases maintainable.",
      interests: ["Clean code", "Problem solving", "Cross-functional collaboration"],
    },
    experience: [
      {
        role: "Software Engineer",
        company: "DemoCorp",
        duration: "2023 — Present",
        location: "Remote",
        bullets: [
          "Built and shipped features across the stack (Next.js, Node, Postgres).",
          "Improved page performance scores from 68 → 95.",
          "Collaborated with design/product to deliver on time.",
        ],
      },
      {
        role: "Developer Intern",
        company: "Sample Labs",
        duration: "2022 — 2023",
        location: "Remote",
        bullets: [
          "Automated CI/CD workflows; reduced build times by 30%.",
          "Wrote scripts to analyze logs and detect anomalies.",
        ],
      },
    ],
    projects: [
      {
        name: "Portfolio Builder",
        duration: "2024",
        description:
          "Frontend-only portfolio generator with template gallery, ATS analysis simulation, and ZIP export.",
        technologies: ["React", "Next.js", "Tailwind", "TypeScript"],
        github: "https://github.com/your/repo",
        demo: "https://example.com",
      },
      {
        name: "Analytics Dashboard",
        duration: "2023",
        description: "Data visualization dashboard with role-based access.",
        technologies: ["React", "Supabase", "Charting"],
        github: "",
        demo: "",
      },
    ],
    skills: [
      {
        name: "Web Development",
        skills: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Postgres"]
      }
    ],
    education: [
      { university: "State University", course: "B.Tech", duration: "2019 — 2023", location: "India", highlights: [] },
    ],
    blog: [],
    testimonials: [],
    certifications: [{ course: "Certified Web Developer", platform: "Example Org", duration: nowYear }],
    contact: {
      email: "you@example.com",
      phone: "+91 99999 99999",
      location: "India",
      socials: [
        { label: "GitHub", href: "https://github.com/your" },
        { label: "LinkedIn", href: "https://linkedin.com/in/your" },
      ],
    },
    footer: {
      copyrightYear: nowYear,
      reservedText: "All rights reserved",
      quickLinks: [],
    },
  } as Portfolio;
}

export default function ResumeIntakePage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ats, setAts] = useState<number | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const startAnimation = useCallback((finalScore: number) => {
    setIsAnalyzing(true);
    setProgress(0);
    setAts(null);

    // simulate 2–3s analysis with progress to 90, then finish to 100
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(tick);
          setTimeout(() => {
            setProgress(100);
            setAts(finalScore);
            setIsAnalyzing(false);
            setAnalysisDone(true);
          }, 500);
        }
        return p + 10;
      });
    }, 200);
  }, []);

  async function onFileSelect(file: File) {
    setFileName(file.name);
    const randomATS = Math.floor(Math.random() * (95 - 70 + 1)) + 70; // 70..95
    startAnimation(randomATS);

    try {
      // text is optional; you can keep your mocked analyzeResume
      const text = await extractTextFromFile(file).catch(() => "");
      const _ai = await analyzeResume(text).catch(() => ({}));
      // create a plausible Portfolio using filename (and text if you want)
      const portfolio = buildSimulatedPortfolio(text || "", file.name);

      // persist for review/edit steps
      savePortfolioData(portfolio);
      setStoredValue(STORAGE_KEYS.WIZARD_PROGRESS, { step: "resume", completed: true, ats: randomATS });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload resume</h1>
        <p className="text-muted-foreground">
          We’ll analyze your resume locally and pre-fill your portfolio. No files leave your device.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Resume Intake</CardTitle>
          <CardDescription>PDF, DOC/DOCX, or TXT up to 10MB.</CardDescription>
        </CardHeader>
        <CardContent>
          <FileDropZone onFileSelect={onFileSelect} isProcessing={isAnalyzing} progress={progress} />
        </CardContent>
      </Card>

      {(isAnalyzing || analysisDone) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Analyzing resume…
            </CardTitle>
            <CardDescription>
              {fileName ? <span className="font-medium">{fileName}</span> : "Parsing file…"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Progress value={progress} />
              <div className="text-xs text-muted-foreground">{progress}% complete</div>
            </div>

            {ats !== null && (
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <AnalysisMeter score={ats} />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Your ATS score: {ats}</span>
                  </div>
                  <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
                    <li>Tip: Keep project outcomes measurable.</li>
                    <li>Tip: List recent tech you actually used.</li>
                    <li>Tip: Highlight your role and impact.</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link href="/builder/manual">
                <Button variant="outline" disabled={!analysisDone}>
                  Edit details in Manual
                </Button>
              </Link>
              <Button onClick={() => router.push("/builder/review")} disabled={!analysisDone}>
                Continue to Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
