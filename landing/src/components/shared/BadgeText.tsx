import type { ReactNode } from "react";

type BadgeTextVariant = "section" | "pill";
type BadgeTextAlign = "left" | "center";
type BadgeTextLinePlacement = "none" | "leading" | "both";

interface BadgeTextProps {
  text: string;
  variant?: BadgeTextVariant;
  align?: BadgeTextAlign;
  linePlacement?: BadgeTextLinePlacement;
  prefix?: ReactNode;
  className?: string;
  containerClassName?: string;
  lineClassName?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function BadgeText({
  text,
  variant = "section",
  align = "left",
  linePlacement = align === "center" ? "both" : "leading",
  prefix,
  className,
  containerClassName,
  lineClassName,
}: BadgeTextProps) {
  if (variant === "pill") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[14px] font-bold uppercase leading-none tracking-[0.18em] sm:text-[15px]",
          className,
        )}
      >
        {prefix ? <span className="shrink-0">{prefix}</span> : null}
        <span>{text}</span>
      </span>
    );
  }

  const showLeadingLine = linePlacement === "leading" || linePlacement === "both";
  const showTrailingLine = linePlacement === "both";

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" ? "justify-center" : "justify-start",
        containerClassName,
      )}
    >
      {showLeadingLine ? (
        <span
          aria-hidden="true"
          className={cn("h-px w-10 shrink-0 bg-brand-yellow sm:w-12", lineClassName)}
        />
      ) : null}
      <span
        className={cn(
          "text-brand-yellow text-[14px] font-bold uppercase leading-none tracking-[0.22em] sm:text-[15px]",
          className,
        )}
      >
        {text}
      </span>
      {showTrailingLine ? (
        <span
          aria-hidden="true"
          className={cn("h-px w-10 shrink-0 bg-brand-yellow sm:w-12", lineClassName)}
        />
      ) : null}
    </div>
  );
}
