"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { API_BASE_URL } from "@/lib/config";

export interface SystemConfig {
  companyName: string | null;
  address: string | null;
  hotline: string | null;
  email: string | null;
  zaloUrl: string | null;
  facebookUrl: string | null;
  linkedInUrl: string | null;
  tiktokUrl: string | null;
  threadUrl: string | null;
  instagramUrl: string | null;
  mapEmbedUrl: string | null;
}

export const defaultConfig: SystemConfig = {
  companyName: "JobUp",
  address: "C23.Lot18, P.Định Công, Q.Hoàng Mai, Hà Nội",
  hotline: "0979334143",
  email: "tuyendung@jopup.vn",
  zaloUrl: "#",
  facebookUrl: "#",
  linkedInUrl: "#",
  tiktokUrl: "#",
  threadUrl: "#",
  instagramUrl: "#",
  mapEmbedUrl: null,
};

interface SystemConfigContextValue {
  config: SystemConfig;
  loading: boolean;
}

const SystemConfigContext = createContext<SystemConfigContextValue>({
  config: defaultConfig,
  loading: true,
});

export function SystemConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/SystemConfigs/public`,
          {
            cache: "no-store",
          },
        );

        if (response.ok) {
          const result = await response.json();
          const data = result.data || result;

          setConfig({
            companyName: data.companyName || defaultConfig.companyName,
            address: data.address || defaultConfig.address,
            hotline: data.hotline || defaultConfig.hotline,
            email: data.email || defaultConfig.email,
            zaloUrl: data.zaloUrl || defaultConfig.zaloUrl,
            facebookUrl: data.facebookUrl || defaultConfig.facebookUrl,
            linkedInUrl: data.linkedInUrl || defaultConfig.linkedInUrl,
            tiktokUrl: data.tiktokUrl || defaultConfig.tiktokUrl,
            threadUrl: data.threadUrl || defaultConfig.threadUrl,
            instagramUrl: data.instagramUrl || defaultConfig.instagramUrl,
            mapEmbedUrl: data.mapEmbedUrl || defaultConfig.mapEmbedUrl,
          });
        }
      } catch (error) {
        console.error("Failed to fetch system config:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return (
    <SystemConfigContext.Provider value={{ config, loading }}>
      {children}
    </SystemConfigContext.Provider>
  );
}

export function useSystemConfigContext() {
  return useContext(SystemConfigContext);
}
