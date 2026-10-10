import { FeedPreview } from "../../components/feed-preview";

export default function FeedPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-ocean">Feed preview</p>
        <h1 className="mt-2 font-display text-5xl">How ThirdSpace ranks your next outing</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/70">
          The production API returns the top 20 events using interest match, proximity, similar-user likes,
          and trending signals with Redis caching per user.
        </p>
      </div>
      <FeedPreview />
    </main>
  );
}

