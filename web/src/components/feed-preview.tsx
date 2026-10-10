import { FeedEvent } from "@thirdspace/shared";

const mockFeed: FeedEvent[] = [
  {
    id: "1",
    title: "Sunrise Run Club",
    description: "Coffee, cardio, and a consistent crew before work.",
    category: "fitness",
    venueName: "Hudson River Park",
    city: "New York",
    startsAt: new Date().toISOString(),
    latitude: 40.74,
    longitude: -74.01,
    popularity: 82,
    trending: true,
    score: 94,
    distanceKm: 1.8,
    reasons: ["Matches one of your interests", "Close to your current area"]
  },
  {
    id: "2",
    title: "Founder House Demo Night",
    description: "A live room of operators, founders, and warm intros.",
    category: "tech",
    venueName: "Flatiron Loft",
    city: "New York",
    startsAt: new Date().toISOString(),
    latitude: 40.74,
    longitude: -73.98,
    popularity: 91,
    trending: true,
    score: 88,
    distanceKm: 3.1,
    reasons: ["Popular with people who share your interests", "Trending right now"]
  },
  {
    id: "3",
    title: "Community Supper Club",
    description: "A long-table dinner designed for meeting people slowly.",
    category: "food",
    venueName: "The Orchard Table",
    city: "Brooklyn",
    startsAt: new Date().toISOString(),
    latitude: 40.67,
    longitude: -73.94,
    popularity: 78,
    trending: true,
    score: 80,
    distanceKm: 4.7,
    reasons: ["Close to your current area", "Trending right now"]
  }
];

export function FeedPreview() {
  return (
    <div className="grid gap-4">
      {mockFeed.map((event) => (
        <article
          key={event.id}
          className="glass-panel overflow-hidden border border-white/50 p-5 shadow-card transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink/80">
              {event.category}
            </span>
            <span className="text-sm text-ink/70">{event.score} match</span>
          </div>
          <h3 className="font-display text-2xl text-ink">{event.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/70">{event.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/70">
            {event.reasons.map((reason) => (
              <span key={reason} className="rounded-full bg-white/80 px-3 py-1">
                {reason}
              </span>
            ))}
          </div>
          <div className="mt-4 text-sm text-ink/60">
            {event.venueName} • {event.city} • {event.distanceKm} km away
          </div>
        </article>
      ))}
    </div>
  );
}

