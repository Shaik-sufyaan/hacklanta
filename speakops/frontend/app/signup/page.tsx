import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <div className="rounded-[32px] border border-line bg-white/75 p-8 shadow-float">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Launch your workspace</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Create a SpeakOps account</h1>
        <button className="mt-8 w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white">
          Continue with Google
        </button>
        <p className="mt-6 text-sm text-slate-600">
          Already registered? <Link href="/login" className="font-semibold text-ink">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
