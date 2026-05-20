import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "md" | "lg";
type ColorVariant = "light" | "dark";

interface LogoProps {
  size?: SizeVariant;
  variant?: ColorVariant;
  className?: string;
}

const sizeMap: Record<SizeVariant, string> = {
  sm: "h-9 sm:h-10",
  md: "h-11 sm:h-12",
  lg: "h-14 sm:h-16",
};

export function Logo({ size = "sm", variant = "light", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <span
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="LYL Realty Group"
    >
      <img
        src={
          isLight
            ? "/brand/lyl-realty-group-logo-inverted.png"
            : "/brand/lyl-realty-group-logo-cropped.png"
        }
        alt="LYL Realty Group"
        className={cn(
          "w-auto object-contain",
          sizeMap[size],
          isLight && "drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
        )}
      />
    </span>
  );
}
