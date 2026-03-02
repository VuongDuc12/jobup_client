'use client';

import { useSystemConfigContext } from '@/contexts/SystemConfigContext';

export type { SystemConfig } from '@/contexts/SystemConfigContext';
export { defaultConfig } from '@/contexts/SystemConfigContext';

/**
 * Hook to access SystemConfig from context.
 * Data is fetched once by SystemConfigProvider in layout.tsx
 * and shared across all consumers.
 */
export function useSystemConfig() {
  return useSystemConfigContext();
}
