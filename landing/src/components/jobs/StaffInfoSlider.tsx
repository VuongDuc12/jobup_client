"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchPublicStaff } from "@/lib/api";
import { resolveAssetUrl } from "@/lib/utils";
import type { PublicStaffResponse } from "@/lib/types";

const fallbackStaff: PublicStaffResponse[] = [
  {
    id: "1",
    fullName: "Nguyen Minh Anh",
    roleName: "Talent Acquisition Lead",
    avatar: "https://i.pravatar.cc/150?u=jobup-1",
  },
  {
    id: "2",
    fullName: "Tran Hoang Viet",
    roleName: "HR Business Partner",
    avatar: "https://i.pravatar.cc/150?u=jobup-2",
  },
  {
    id: "3",
    fullName: "Le Thu Trang",
    roleName: "Career Advisor",
    avatar: "https://i.pravatar.cc/150?u=jobup-3",
  },
];

export default function StaffInfoSlider() {
  const [staff, setStaff] = useState<PublicStaffResponse[]>(fallbackStaff);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (staff.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % staff.length);
    }, 4000);
  }, [staff.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    let mounted = true;

    const loadStaff = async () => {
      try {
        const result = await fetchPublicStaff(8);
        if (!mounted || result.length === 0) return;

        const normalized = [...result];
        let fillIndex = 0;

        while (normalized.length < 3) {
          const fallback = fallbackStaff[fillIndex % fallbackStaff.length];
          normalized.push({
            ...fallback,
            id: `${fallback.id}-fallback-${fillIndex}`,
          });
          fillIndex += 1;
        }

        setStaff(normalized);
        setCurrent(0);
      } catch {
        // keep fallback
      }
    };

    loadStaff();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="bg-white rounded-[2rem] p-6 border border-gray-100"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-black text-gray-900 text-lg flex items-center gap-2">
          <span>Nhân sự nổi bật</span>
          <i className="fa-solid fa-star text-amber-500" />
        </h4>
        <div className="flex gap-1.5">
          {staff.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "w-6 bg-brand-yellow" : "w-2 bg-gray-200"
              }`}
              aria-label={`Nhân sự ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {staff.map((member) => {
            const avatar =
              resolveAssetUrl(member.avatar) ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.fullName)}&background=111827&color=fff&size=128`;

            return (
              <div key={member.id} className="w-full flex-shrink-0">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 bg-white">
                    <img
                      src={avatar}
                      alt={member.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-gray-900 truncate">
                      {member.fullName}
                    </h5>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {member.roleName}
                    </p>
                    <Link
                      href="/tuyen-dung"
                      className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-yellow uppercase tracking-wide mt-3"
                    >
                      Kết nối ngay
                      <i className="fa-solid fa-arrow-right text-[10px]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
