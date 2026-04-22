import type { ReactNode } from "react";
import BadgeText from "@/components/shared/BadgeText";

type SectionHeaderAlign = "left" | "center";
type SectionHeaderHeadingTag = "h1" | "h2";
type SectionHeaderLinePlacement = "none" | "leading" | "both";

interface SectionHeaderProps {
  badge: string;
  title: ReactNode;
  description?: ReactNode;
  align?: SectionHeaderAlign;
  headingTag?: SectionHeaderHeadingTag;
  linePlacement?: SectionHeaderLinePlacement;
  className?: string;
  contentClassName?: string;
  badgeClassName?: string;
  badgeContainerClassName?: string;
  lineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  headingTag = "h2",
  linePlacement = align === "center" ? "both" : "leading",
  className,
  contentClassName,
  badgeClassName,
  badgeContainerClassName,
  lineClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const headingBaseClass = cn(
    "mt-5 text-4xl font-extrabold text-brand-black md:text-5xl",
    align === "center" ? "text-center" : "text-left leading-tight",
    titleClassName,
  );

  const descriptionBaseClass = cn(
    "mt-4 text-lg leading-relaxed text-gray-500 text-justify",
    align === "center" ? "mx-auto max-w-2xl text-center" : "text-left",
    descriptionClassName,
  );

  return (
    <div className={cn("landing-section-header", className)}>
      <div
        className={cn(
          "max-w-3xl",
          align === "center" ? "mx-auto" : "mx-0",
          contentClassName,
        )}
      >
        <BadgeText
          text={badge}
          align={align}
          linePlacement={linePlacement}
          className={badgeClassName}
          containerClassName={badgeContainerClassName}
          lineClassName={lineClassName}
        />

        {headingTag === "h1" ? (
          <h1 className={headingBaseClass}>{title}</h1>
        ) : (
          <h2 className={headingBaseClass}>{title}</h2>
        )}

        {description ? (
          <p className={descriptionBaseClass}>{description}</p>
        ) : null}
      </div>
    </div>
  );
}
