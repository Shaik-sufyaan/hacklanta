import { Suspense } from 'react';
import { PanelContainer } from '@/components/panels/PanelContainer';

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <PanelContainer />
    </Suspense>
  );
}
