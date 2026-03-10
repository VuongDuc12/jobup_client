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
    email: "staff@jopup.vn",
    zaloPhone: "0979334143",
    avatar: "https://i.pravatar.cc/150?u=jobup-1",
  },
  {
    id: "2",
    fullName: "Tran Hoang Viet",
    roleName: "HR Business Partner",
    email: "staff@jopup.vn",
    zaloPhone: "0979334143",
    avatar: "https://i.pravatar.cc/150?u=jobup-2",
  },
  {
    id: "3",
    fullName: "Le Thu Trang",
    roleName: "Career Advisor",
    email: "staff@jopup.vn",
    zaloPhone: "0979334143",
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
              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.fullName)}&background=111827&color=fff&size=160`;

            return (
              <div key={member.id} className="w-full flex-shrink-0">
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-5 md:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 md:gap-6 text-center sm:text-left">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0 rounded-2xl overflow-hidden border border-gray-100 bg-white shrink-0">
                    <img
                      src={avatar}
                      alt={member.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <h5 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                      {member.fullName}
                    </h5>

                    <div className="mt-3 space-y-1.5 max-w-full">
                      <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-2 truncate">
                        <i className="fa-regular fa-envelope text-gray-400" />
                        {member.email || "Đang cập nhật email"}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-2 truncate">
                        <i className="fa-solid fa-phone text-gray-400" />
                        {member.zaloPhone || "Đang cập nhật số điện thoại"}
                      </p>
                    </div>

                    <Link
                      href="/tuyen-dung"
                      className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-brand-yellow uppercase tracking-wide mt-4"
                    >
                      Kết nối ngay
                      <i className="fa-solid fa-arrow-right text-xs" />
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
