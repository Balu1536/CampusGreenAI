import { Leaf } from "lucide-react";

interface GrowthRingProps {
  score: number;
  size?: number;
  label?: string;
  sublabel?: string;
}

export default function GrowthRing({ score, size = 220, label, sublabel }: GrowthRingProps) {
  const stroke = size * 0.07;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  const color = clamped < 50 ? "#f2725c" : clamped < 80 ? "#f4b942" : "#7cd992";

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ "--ring-circumference": circumference, "--ring-offset": offset } as React.CSSProperties}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          className="growth-ring-arc"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <Leaf size={size * 0.14} color={color} strokeWidth={2} />
        <span className="font-mono font-semibold" style={{ fontSize: size * 0.22 }}>
          {clamped}
        </span>
        {label && <span className="text-xs uppercase tracking-widest text-mist/60">{label}</span>}
        {sublabel && <span className="text-sm text-mist/80 font-display font-semibold">{sublabel}</span>}
      </div>
    </div>
  );
}
