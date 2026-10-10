import Link from "next/link";
import { FeedPreview } from "../components/feed-preview";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
      <header className="glass-panel flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-ink/60">ThirdSpace AI</p>
          <h1 className="font-display text-2xl">Find your people in the real world</h1>
        </div>
        <nav className="flex gap-3">
          <Link href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm">
            Login
          </Link>
          <Link href="/signup" className="rounded-full bg-ink px-4 py-2 text-sm text-white">
            Join now
          </Link>
        </nav>
      </header>

      <section className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-coral">Personalized local discovery</p>
          <h2 className="max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            A smarter feed for events, clubs, and communities worth leaving home for.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
            ThirdSpace AI blends your interests, proximity, social proof, and real-time momentum into a
            ranked feed that helps you build a fuller offline life.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup" className="rounded-full bg-coral px-6 py-3 text-white shadow-card">
              Start onboarding
            </Link>
            <Link href="/feed" className="rounded-full border border-slate-300 px-6 py-3">
              Preview feed
            </Link>
          </div>
        </div>
        <FeedPreview />
      </section>
    </main>
  );
}

