import type { PartnerResponse } from "@/lib/types";
import { getAssetUrl } from "@/lib/utils";

export const defaultPartnerLogos = [
  {
    src: "/images/google-logo.svg",
    alt: "Google",
    height: "h-5",
  },
  {
    src: "/images/meta-logo.svg",
    alt: "Meta",
    height: "h-6",
  },
  {
    src: "/images/microsoft-logo.svg",
    alt: "Microsoft",
    height: "h-5",
  },
  {
    src: "/images/amazon-logo.svg",
    alt: "Amazon",
    height: "h-5",
  },
  {
    src: "/images/netflix-logo.svg",
    alt: "Netflix",
    height: "h-4",
  },
  {
    src: "/images/linkedin-logo.svg",
    alt: "LinkedIn",
    height: "h-6",
  },
];

export function resolvePartnerLogos(
  partners?: PartnerResponse[] | null,
): typeof defaultPartnerLogos {
  if (!partners || partners.length === 0) return defaultPartnerLogos;

  const mapped = partners
    .filter((item) => Boolean(item.logoUrl))
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .flatMap((item) => {
      if (!item.logoUrl) return [];

      return [
        {
          src: getAssetUrl(item.logoUrl) || item.logoUrl,
          alt: item.name || "Partner",
          height: "h-6",
        },
      ];
    });

  return mapped.length > 0 ? mapped : defaultPartnerLogos;
}
