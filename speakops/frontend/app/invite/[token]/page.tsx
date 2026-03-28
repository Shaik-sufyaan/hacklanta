export default function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = params as unknown as { token: string };
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-[32px] border border-line bg-white/75 p-8 shadow-float">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Team invite</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Join this workspace</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Invite token: <span className="font-semibold text-ink">{token}</span>. This page is ready for preview,
          accept, and Google account enforcement flows.
        </p>
        <button className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
          Accept invite
        </button>
      </div>
    </main>
  );
}
