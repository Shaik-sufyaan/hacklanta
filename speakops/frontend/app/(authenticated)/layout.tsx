import { Suspense } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { EvaWidget } from '@/components/EvaWidget';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-6 py-6 md:px-8">
      <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[304px_1fr]">
        <Suspense fallback={null}>
          <AppSidebar />
        </Suspense>
        <main className="rounded-[32px] border border-line bg-white/50 p-6 shadow-float backdrop-blur-sm md:p-8">
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </main>
      </div>
      <EvaWidget />
    </div>
  );
}
