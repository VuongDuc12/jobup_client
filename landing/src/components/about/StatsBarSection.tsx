import type { StatisticResponse } from "@/lib/types";

const fallbackStats = [
  { numberText: "100+", label: "Khách hàng" },
  { numberText: "15+", label: "Ngành nghề" },
  { numberText: "98%", label: "Hài lòng" },
  { numberText: "50K+", label: "Ứng viên" },
];

interface StatsBarSectionProps {
  statistics: StatisticResponse[] | null;
}

export default function StatsBarSection({ statistics }: StatsBarSectionProps) {
  const stats =
    statistics && statistics.length > 0
      ? statistics
          .filter((s) => s.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((s) => ({
            numberText: s.numberText ?? "",
            label: s.label ?? "",
          }))
      : fallbackStats;

  return (
    <section className="py-16 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => {
            const value = stat.numberText.trim();
            const lastChar = value.slice(-1);
            const hasTrailingSymbol = /[^\dA-Za-z]/.test(lastChar);
            const number = hasTrailingSymbol ? value.slice(0, -1) : value;
            const suffix = hasTrailingSymbol ? lastChar : "";

            return (
              <div key={idx}>
                <p className="inline-flex items-center justify-center gap-1 text-4xl md:text-5xl font-extrabold leading-none text-brand-yellow">
                  <span>{number}</span>
                  {suffix && (
                    <span className="inline-flex items-center justify-center leading-none text-brand-yellow">
                      {suffix === "+" ? (
                        <i
                          className="fa-solid fa-plus text-[0.58em]"
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="text-[0.72em] leading-none">
                          {suffix}
                        </span>
                      )}
                    </span>
                  )}
                </p>
                <p className="text-gray-400 text-sm font-bold mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
