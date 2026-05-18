interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <div>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black text-white mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      {subtitle && <p className="text-sm text-gray-700 mt-1">{subtitle}</p>}
    </div>
  );
}
