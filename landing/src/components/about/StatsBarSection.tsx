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
                        // Split numberText into number and suffix (e.g. "100+" → "100" + "+")
                        const match = stat.numberText.match(
                            /^([\d,.]+[KkMm]?)(.*)/,
                        );
                        const number = match ? match[1] : stat.numberText;
                        const suffix = match ? match[2] : "";

                        return (
                          <div key={idx}>
                            <p className="text-4xl md:text-5xl font-extrabold text-brand-yellow">
                              {number}
                              {suffix && (
                                <span className="text-brand-yellow">
                                  {suffix}
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
