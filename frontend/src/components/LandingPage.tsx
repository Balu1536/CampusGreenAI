import {
  Leaf,
  ArrowRight,
  Building2,
  Recycle,
  CloudSun,
  Sparkles,
  Database,
  Code2,
  BarChart3,
  Brain,
} from "lucide-react";
import GrowthRing from "./GrowthRing";
import { Page } from "../types";
import { CATEGORIES } from "../data/questions";

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const SDGS = [
  {
    code: "SDG 11",
    title: "Sustainable Cities & Communities",
    role: "Primary",
    icon: Building2,
    description:
      "CampusGreen AI turns campuses into living labs for sustainable infrastructure, resource use, and community planning.",
  },
  {
    code: "SDG 12",
    title: "Responsible Consumption & Production",
    role: "Secondary",
    icon: Recycle,
    description:
      "Waste segregation, recycling, and procurement insights help institutions consume and produce more responsibly.",
  },
  {
    code: "SDG 13",
    title: "Climate Action",
    role: "Secondary",
    icon: CloudSun,
    description:
      "Energy, water, and transportation scores translate directly into measurable steps toward climate resilience.",
  },
];

const TECH_GROUPS = [
  {
    title: "Frontend",
    icon: Code2,
    items: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
  },
  {
    title: "Backend",
    icon: Sparkles,
    items: ["Python", "FastAPI"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["Supabase"],
  },
  {
    title: "AI Foundations",
    icon: Brain,
    items: ["Prompt Engineering", "IBM Granite Models", "Entity Extraction", "Summarization", "Responsible AI"],
  },
];

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="bg-mesh">
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-sprout/30 bg-sprout/10 text-sprout">
            <Leaf size={14} /> IBM SkillsBuild &times; 1M1B AI for Sustainability
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl mt-6 leading-[1.05]">
            CampusGreen <span className="text-sprout">AI</span>
          </h1>
          <p className="mt-3 font-display text-xl sm:text-2xl text-mist/80">
            Measure. Improve. Sustain.
          </p>
          <p className="mt-6 text-mist/70 leading-relaxed max-w-md">
            An AI-based sustainability assessment and recommendation system that helps
            educational institutions understand their environmental footprint and act on it —
            one campus, one score, one set of next steps at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("assessment")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sprout text-canopy font-semibold hover:bg-mist transition-colors"
            >
              Start Assessment <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate("responsible-ai")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-mist/80 hover:bg-white/5 transition-colors"
            >
              Responsible AI commitments
            </button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end animate-rise" style={{ animationDelay: "0.15s" }}>
          <div className="glass-strong p-8 flex flex-col items-center gap-4">
            <GrowthRing score={72} label="Sample Score" sublabel="Good" size={220} />
            <p className="text-xs text-center text-mist/60 max-w-[220px]">
              The Growth Ring visualizes your CampusGreen Score — it fills like a leaf as
              your campus practices mature.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="glass p-8 sm:p-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">About the project</h2>
          <p className="mt-4 text-mist/70 leading-relaxed max-w-3xl">
            CampusGreen AI helps educational institutions assess their sustainability
            practices and provides AI-driven recommendations for improving environmental
            responsibility. Built on learnings from the IBM SkillsBuild and 1M1B AI for
            Sustainability Internship, it combines a structured assessment, a transparent
            scoring engine, and a recommendation layer designed around prompt engineering
            and IBM Granite model concepts.
          </p>
          <div className="mt-6 grid sm:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="rounded-xl2 border border-white/10 bg-white/5 p-4 text-center">
                <p className="font-display font-semibold text-sm">{cat.label}</p>
                <p className="font-mono text-sprout text-lg mt-1">{cat.weight}%</p>
                <p className="text-xs text-mist/50 mt-1">of overall score</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl">SDGs we move the needle on</h2>
            <p className="text-mist/60 mt-2 max-w-2xl">
              Every recommendation links back to one of three United Nations Sustainable
              Development Goals.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SDGS.map((sdg) => {
            const Icon = sdg.icon;
            return (
              <div key={sdg.code} className="glass p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-sprout/15 border border-sprout/30">
                    <Icon size={20} className="text-sprout" />
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-mist/50">
                    {sdg.role}
                  </span>
                </div>
                <p className="font-mono text-sprout text-sm">{sdg.code}</p>
                <h3 className="font-display font-semibold text-lg">{sdg.title}</h3>
                <p className="text-sm text-mist/65 leading-relaxed">{sdg.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl">Built with</h2>
            <p className="text-mist/60 mt-2 max-w-2xl">
              A modern, AI-ready stack chosen for clarity, speed, and room to grow into
              agentic and multimodal workflows.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-amber/30 bg-amber/10 text-amber">
            <BarChart3 size={14} /> Recharts-powered dashboard
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="glass p-6">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-white/5 border border-white/10 mb-4">
                  <Icon size={18} className="text-sprout" />
                </span>
                <h3 className="font-display font-semibold">{group.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-mist/65 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sprout/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="glass-strong p-10 text-center flex flex-col items-center gap-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">
            Ready to see where your campus stands?
          </h2>
          <p className="text-mist/65 max-w-xl">
            20 questions, five categories, one clear score — and a set of recommendations
            you can act on this semester.
          </p>
          <button
            onClick={() => onNavigate("assessment")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sprout text-canopy font-semibold hover:bg-mist transition-colors mt-2"
          >
            Start Assessment <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
