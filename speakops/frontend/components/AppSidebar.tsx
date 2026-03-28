'use client';

import Link from 'next/link';
import { Bot, CreditCard, FolderOpen, LayoutDashboard, PhoneCall, Shield, Sparkles, UserCircle2 } from 'lucide-react';

import { useDashboardView } from '@/hooks/useDashboardView';
import { useSidebarStore } from '@/stores/sidebarStore';
import type { DashboardView } from '@/types';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navItems: Array<{ label: string; view: DashboardView; icon: React.ComponentType<{ className?: string }> }> = [
  { label: 'Agent', view: 'agent', icon: Bot },
  { label: 'Create Agent', view: 'create-agent', icon: Sparkles },
  { label: 'Calls', view: 'calls', icon: PhoneCall },
  { label: 'Documents', view: 'documents', icon: FolderOpen },
  { label: 'Account', view: 'account', icon: UserCircle2 },
  { label: 'Payments', view: 'payments', icon: CreditCard },
  { label: 'Usage', view: 'usage', icon: LayoutDashboard },
  { label: 'Admin', view: 'admin-orgs', icon: Shield }
];

export function AppSidebar() {
  const { view } = useDashboardView();
  const { search, setSearch, isCollapsed, toggle } = useSidebarStore();

  return (
    <aside
      className={cn(
        'sticky top-6 h-[calc(100vh-3rem)] rounded-[32px] border border-line bg-white/70 p-5 shadow-float backdrop-blur-sm transition-all',
        isCollapsed ? 'w-[96px]' : 'w-[304px]'
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className={cn('transition-opacity', isCollapsed && 'opacity-0')}>
          <p className="font-display text-xl font-semibold text-ink">SpeakOps</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Voice Ops</p>
        </div>
        <button
          className="rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold text-ink"
          onClick={toggle}
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>

      {!isCollapsed && <Input placeholder="Search panels" value={search} onChange={(event) => setSearch(event.target.value)} />}

      <div className="mt-6 space-y-2">
        {navItems
          .filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
          .map((item) => {
            const Icon = item.icon;
            const active = item.view === view;

            return (
              <Link
                key={item.view}
                href={`/dashboard?view=${item.view}`}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                  active ? 'bg-ink text-white' : 'text-ink hover:bg-accentSoft'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
      </div>
    </aside>
  );
}
