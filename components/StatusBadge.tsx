import clsx from "clsx";

const styles = {
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  active: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  upcoming: "bg-slate-500/20 text-slate-600 border-slate-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  overdue: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  submitted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

interface StatusBadgeProps {
  status: keyof typeof styles;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[status])}>
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
