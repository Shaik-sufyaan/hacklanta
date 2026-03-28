export default function ClaimPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-[32px] border border-line bg-white/75 p-8 shadow-float">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Owner claim</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Activate your workspace</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          This flow is prepared for pending, claimed, and expired states with enforced terms acceptance.
        </p>
        <button className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
          Complete claim
        </button>
      </div>
    </main>
  );
}
