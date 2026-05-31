"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import type { PartnerResponse } from "@/lib/types";
import { resolvePartnerLogos } from "@/lib/partnerLogos";

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  if (size <= 0) return [items];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

type PartnerStat = {
  label: string;
  value: string;
};

interface PartnersSectionProps {
  badge: string;
  title: ReactNode;
  description: string;
  stats?: PartnerStat[];
  partners?: PartnerResponse[] | null;
}

export default function PartnersSection({
  badge,
  title,
  description,
  stats,
  partners,
}: PartnersSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const partnerLogos = resolvePartnerLogos(partners);
  const partnerSlides = chunkItems(partnerLogos, 6);
  const loopSlides = partnerSlides.length
    ? [...partnerSlides, ...partnerSlides]
    : [];
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
    };
    scroller.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || !dragState.current.active) return;
    const delta = event.clientX - dragState.current.startX;
    scroller.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    dragState.current.active = false;
    if (scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="landing-section relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[url('/images/carbon-fibre-texture.png')] bg-repeat opacity-[0.04]" />
      <div className="absolute -top-16 right-10 h-72 w-72 rounded-full bg-brand-yellow/20 blur-[120px]" />
      <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-black/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <SectionHeader
              badge={badge}
              title={title}
              description={description}
              align="left"
              linePlacement="leading"
              className="mb-6"
              badgeClassName="tracking-[0.24em]"
              titleClassName="text-3xl font-black leading-tight text-brand-black sm:text-4xl md:text-5xl"
              descriptionClassName="text-base leading-relaxed text-gray-600 sm:text-lg"
            />

            {stats && stats.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {stats.map((stat) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className="flex items-center gap-3 rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-sm"
                  >
                    <span className="text-sm font-black text-brand-black">
                      {stat.value}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative w-full min-w-0 lg:max-w-[560px] lg:justify-self-end">
            <div
              ref={scrollerRef}
              className="mask-image-gradient group/partners relative cursor-grab overflow-x-auto overflow-y-hidden active:cursor-grabbing scrollbar-hide"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
              onPointerLeave={stopDrag}
            >
              <div
                className="animate-loop-scroll flex group-hover/partners:[animation-play-state:paused] group-active/partners:[animation-play-state:paused]"
                style={{ willChange: "transform" }}
              >
                {loopSlides.map((slide, slideIndex) => (
                  <div
                    key={`slide-${slideIndex}`}
                    className="min-w-full px-3 py-2"
                  >
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
                      {slide.map((partner) => (
                        <div
                          key={`${slideIndex}-${partner.alt}`}
                          className="group relative rounded-3xl border border-white/70 bg-white/85 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:p-2.5"
                        >
                          <div className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-brand-yellow/70" />
                          <div className="flex h-20 items-center justify-center sm:h-24">
                            <Image
                              src={partner.src}
                              alt={`${partner.alt} logo`}
                              width={240}
                              height={96}
                              className="max-h-[4.5rem] w-auto max-w-[96%] object-contain sm:max-h-20"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
