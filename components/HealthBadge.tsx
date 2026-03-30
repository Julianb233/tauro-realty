import clsx from "clsx";

const healthConfig = {
  great: { color: "bg-emerald-500", glow: "glow-emerald", label: "On Track", textColor: "text-emerald-400" },
  good: { color: "bg-blue-500", glow: "glow-blue", label: "Good", textColor: "text-blue-400" },
  attention: { color: "bg-amber-500", glow: "", label: "Needs Attention", textColor: "text-amber-400" },
  blocked: { color: "bg-rose-500", glow: "", label: "Blocked", textColor: "text-rose-400" },
};

interface HealthBadgeProps {
  health: keyof typeof healthConfig;
  summary: string;
}

export default function HealthBadge({ health, summary }: HealthBadgeProps) {
  const config = healthConfig[health];
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={clsx("w-4 h-4 rounded-full", config.color, config.glow)} />
      <div>
        <span className={clsx("text-sm font-semibold", config.textColor)}>{config.label}</span>
        <p className="text-sm text-slate-400 mt-0.5">{summary}</p>
      </div>
    </div>
  );
}
