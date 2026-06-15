import { Leaf } from "lucide-react";
import { Page } from "../types";

interface NavbarProps {
  page: Page;
  onNavigate: (page: Page) => void;
}

const LINKS: { id: Page; label: string }[] = [
  { id: "landing", label: "Home" },
  { id: "assessment", label: "Assessment" },
  { id: "dashboard", label: "Dashboard" },
  { id: "responsible-ai", label: "Responsible AI" },
];

export default function Navbar({ page, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl bg-canopy/70">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2 font-display font-bold text-lg"
        >
          <span className="grid place-items-center w-9 h-9 rounded-full bg-sprout/15 border border-sprout/30">
            <Leaf size={18} className="text-sprout" />
          </span>
          CampusGreen <span className="text-sprout">AI</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                page === link.id
                  ? "bg-sprout/15 text-sprout border border-sprout/30"
                  : "text-mist/70 hover:text-mist hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => onNavigate("assessment")}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sprout text-canopy font-semibold text-sm hover:bg-mist transition-colors"
        >
          Start Assessment
        </button>
      </div>
    </header>
  );
}
