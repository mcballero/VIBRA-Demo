import { FeedEvent } from "@thirdspace/shared";

export const mockFeed: FeedEvent[] = [
  {
    id: "seed-event-1",
    title: "Sunrise Run Club",
    description: "Coffee, cardio, and easy conversation before the workday.",
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
    id: "seed-event-3",
    title: "Founder House Demo Night",
    description: "A warm room full of builders, operators, and product-minded people.",
    category: "tech",
    venueName: "Flatiron Loft",
    city: "New York",
    startsAt: new Date().toISOString(),
    latitude: 40.74,
    longitude: -73.99,
    popularity: 91,
    trending: true,
    score: 88,
    distanceKm: 3.1,
    reasons: ["Popular with people who share your interests", "Trending right now"]
  }
];

