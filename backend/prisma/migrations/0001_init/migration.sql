CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "city" TEXT,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "interests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "embedding" vector(8),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Event" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "venueName" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "popularityScore" INTEGER NOT NULL DEFAULT 0,
  "trendingScore" INTEGER NOT NULL DEFAULT 0,
  "imageUrl" TEXT,
  "embedding" vector(8),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "RSVP" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'GOING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RSVP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  CONSTRAINT "RSVP_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE,
  CONSTRAINT "RSVP_user_event_unique" UNIQUE ("userId", "eventId")
);

CREATE TABLE "Feedback" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "reaction" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  CONSTRAINT "Feedback_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE,
  CONSTRAINT "Feedback_user_event_reaction_unique" UNIQUE ("userId", "eventId", "reaction")
);

CREATE INDEX "User_email_idx" ON "User" ("email");
CREATE INDEX "RSVP_userId_idx" ON "RSVP" ("userId");
CREATE INDEX "RSVP_eventId_idx" ON "RSVP" ("eventId");
CREATE INDEX "Feedback_userId_idx" ON "Feedback" ("userId");
CREATE INDEX "Feedback_eventId_idx" ON "Feedback" ("eventId");
CREATE INDEX "Feedback_reaction_idx" ON "Feedback" ("reaction");
CREATE INDEX "Event_category_idx" ON "Event" ("category");
CREATE INDEX "Event_city_idx" ON "Event" ("city");
CREATE INDEX "Event_geo_point_idx" ON "Event" USING GIST (point("longitude", "latitude"));
CREATE INDEX "User_geo_point_idx" ON "User" USING GIST (point("longitude", "latitude"));

