'use client';

import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm text-ink outline-none ring-0 placeholder:text-slate-400',
        className
      )}
      {...props}
    />
  );
}
