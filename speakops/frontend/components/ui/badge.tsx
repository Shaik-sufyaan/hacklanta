import { cn } from '@/lib/utils';

export function Badge({
  children,
  tone = 'default'
}: {
  children: React.ReactNode;
  tone?: 'default' | 'success' | 'warning';
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
        tone === 'success' && 'bg-emerald-100 text-emerald-800',
        tone === 'warning' && 'bg-amber-100 text-amber-900',
        tone === 'default' && 'bg-accentSoft text-ink'
      )}
    >
      {children}
    </span>
  );
}
