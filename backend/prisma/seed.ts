import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockVector = (seed: number) =>
  `[${Array.from({ length: 8 }, (_, index) => ((seed + index) % 10) / 10).join(",")}]`;

async function main() {
  await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector;`);

  const events = [
    {
      title: "Sunrise Run Club",
      description: "A community-powered 5k with coffee after the finish.",
      category: "fitness",
      venueName: "Hudson River Park",
      city: "New York",
      latitude: 40.7411,
      longitude: -74.0106,
      startsAt: new Date(Date.now() + 86400000),
      popularityScore: 82,
      trendingScore: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1200&q=80",
      embedding: mockVector(1)
    },
    {
      title: "Indie Film Circle",
      description: "Weekly film discussion and post-screening mixer.",
      category: "arts",
      venueName: "Roxy Cinema",
      city: "New York",
      latitude: 40.7195,
      longitude: -74.0047,
      startsAt: new Date(Date.now() + 172800000),
      popularityScore: 64,
      trendingScore: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
      embedding: mockVector(2)
    },
    {
      title: "Founder House Demo Night",
      description: "Meet local builders, operators, and angel investors.",
      category: "tech",
      venueName: "Flatiron Loft",
      city: "New York",
      latitude: 40.7413,
      longitude: -73.9897,
      startsAt: new Date(Date.now() + 259200000),
      popularityScore: 91,
      trendingScore: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      embedding: mockVector(3)
    },
    {
      title: "Community Supper Club",
      description: "A rotating dinner series for curious locals.",
      category: "food",
      venueName: "The Orchard Table",
      city: "Brooklyn",
      latitude: 40.6782,
      longitude: -73.9442,
      startsAt: new Date(Date.now() + 345600000),
      popularityScore: 78,
      trendingScore: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
      embedding: mockVector(4)
    }
  ];

  for (const [index, event] of events.entries()) {
    await prisma.event.upsert({
      where: { id: `seed-event-${index + 1}` },
      update: {
        ...event,
        embedding: undefined
      },
      create: {
        id: `seed-event-${index + 1}`,
        ...event,
        embedding: undefined
      }
    });

    await prisma.$executeRawUnsafe(
      `UPDATE "Event" SET "embedding" = $1::vector WHERE "id" = $2`,
      mockVector(index + 1),
      `seed-event-${index + 1}`
    );
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
