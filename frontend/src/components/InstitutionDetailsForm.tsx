import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Page } from "../types";

interface InstitutionDetailsFormProps {
  onDetailsSubmit: (details: {
    institution_name: string;
    institution_type: string;
    location: string;
    student_count: number;
  }) => void;
  onNavigate: (page: Page) => void;
}

export default function InstitutionDetailsForm({ onDetailsSubmit, onNavigate }: InstitutionDetailsFormProps) {
  const [form, setForm] = useState({
    institution_name: "",
    institution_type: "School", // default
    location: "",
    student_count: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const studentCount = parseInt(form.student_count, 10);
      if (isNaN(studentCount) || studentCount <= 0) {
        setError("Please enter a valid student count");
        setLoading(false);
        return;
      }
      onDetailsSubmit({
        institution_name: form.institution_name.trim(),
        institution_type: form.institution_type,
        location: form.location.trim(),
        student_count,
      });
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8 animate-rise">
        <p className="text-sm font-mono text-sprout uppercase tracking-widest">Institution Details</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-2">
          Help us customize your assessment
        </h1>
        <p className="text-mist/65 mt-2">
          Please provide the following details about your institution. This information will be used to
          tailor your sustainability assessment and recommendations.
        </p>
      </div>

      {error && (
        <div className="rounded-xl2 border border-coral/40 bg-coral/10 p-4 mb-6">
          <p className="text-coral text-sm font-mono">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 animate-rise space-y-6">
        <div>
          <label className="block text-sm font-mono text-mist/70 mb-2">Institution Name</label>
          <input
            type="text"
            value={form.institution_name}
            onChange={(e) => setForm({ ...form, institution_name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl2 border border-white/10 bg-white/5 focus:border-sprout/50 focus:bg-white/10 transition-colors text-sm"
            placeholder="Enter institution name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-mono text-mist/70 mb-2">Institution Type</label>
          <select
            value={form.institution_type}
            onChange={(e) => setForm({ ...form, institution_type: e.target.value })}
            className="w-full px-4 py-3 rounded-xl2 border border-white/10 bg-white/5 focus:border-sprout/50 focus:bg-white/10 transition-colors text-sm"
          >
            <option value="School">School</option>
            <option value="College">College</option>
            <option value="University">University</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-mono text-mist/70 mb-2">Location (City, State)</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-3 rounded-xl2 border border-white/10 bg-white/5 focus:border-sprout/50 focus:bg-white/10 transition-colors text-sm"
            placeholder="Enter city and state"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-mono text-mist/70 mb-2">Student Count</label>
          <input
            type="number"
            value={form.student_count}
            onChange={(e) => setForm({ ...form, student_count: e.target.value })}
            className="w-full px-4 py-3 rounded-xl2 border border-white/10 bg-white/5 focus:border-sprout/50 focus:bg-white/10 transition-colors text-sm"
            min="1"
            placeholder="Enter number of students"
            required
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm text-mist/70 hover:bg-white/5"
          >
            <ArrowRight size={18} /> Back to Home
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sprout text-canopy font-semibold text-sm hover:bg-mist transition-colors ${
              loading ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Continue to Assessment <CheckCircle2 size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}