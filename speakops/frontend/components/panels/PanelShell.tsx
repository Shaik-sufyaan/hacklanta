import { Card } from '@/components/ui/card';

export function PanelShell({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl text-ink">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      <Card>{children}</Card>
    </div>
  );
}
