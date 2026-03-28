'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Route } from 'next';

import type { DashboardView } from '@/types';

const DEFAULT_VIEW: DashboardView = 'agent';

export function useDashboardView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const view = (searchParams.get('view') as DashboardView | null) ?? DEFAULT_VIEW;

  const setView = (nextView: DashboardView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', nextView);
    router.push(`${pathname}?${params.toString()}` as Route);
  };

  return useMemo(
    () => ({
      view,
      setView
    }),
    [view]
  );
}
