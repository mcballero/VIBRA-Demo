import { Injectable } from "@nestjs/common";
import { FeedbackReaction } from "@prisma/client";
import { FeedEvent } from "@thirdspace/shared";
import { PrismaService } from "../common/config/prisma.service";
import { RedisService } from "../common/config/redis.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly usersService: UsersService
  ) {}

  async getFeedForUser(userId: string): Promise<FeedEvent[]> {
    const cacheKey = `feed:${userId}`;
    const cached = await this.redis.get<FeedEvent[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const user = await this.usersService.findById(userId);
    const [events, likes] = await Promise.all([
      this.prisma.event.findMany({
        include: {
          feedback: true
        }
      }),
      this.prisma.feedback.findMany({
        where: {
          reaction: FeedbackReaction.LIKE
        },
        include: {
          user: true,
          event: true
        }
      })
    ]);

    const feed = events
      .map((event) => {
        let score = 0;
        const reasons: string[] = [];

        if (user.interests.includes(event.category as never)) {
          score += 40;
          reasons.push("Matches one of your interests");
        }

        const distanceKm =
          user.latitude != null && user.longitude != null
            ? this.distanceKm(user.latitude, user.longitude, event.latitude, event.longitude)
            : 99;

        if (distanceKm <= 5) {
          score += 30;
          reasons.push("Close to your current area");
        }

        if (this.hasSimilarUserLike(likes, user.interests, event.id, user.id)) {
          score += 20;
          reasons.push("Popular with people who share your interests");
        }

        if (event.trendingScore > 0 || event.popularityScore >= 80) {
          score += 10;
          reasons.push("Trending right now");
        }

        // Add small deterministic tie-breakers from raw popularity and proximity.
        score += Math.min(9, Math.floor(event.popularityScore / 15));
        score += distanceKm < 99 ? Math.max(0, 5 - Math.floor(distanceKm)) : 0;

        return {
          id: event.id,
          title: event.title,
          description: event.description,
          category: event.category as FeedEvent["category"],
          venueName: event.venueName,
          city: event.city,
          startsAt: event.startsAt.toISOString(),
          latitude: event.latitude,
          longitude: event.longitude,
          popularity: event.popularityScore,
          trending: event.trendingScore > 0,
          imageUrl: event.imageUrl ?? undefined,
          score,
          distanceKm: Number(distanceKm.toFixed(1)),
          reasons
        };
      })
      .sort((left, right) => right.score - left.score || left.distanceKm - right.distanceKm)
      .slice(0, 20);

    await this.redis.set(cacheKey, feed, 300);
    return feed;
  }

  async invalidateFeed(userId: string) {
    await this.redis.del(`feed:${userId}`);
  }

  private hasSimilarUserLike(
    likes: Array<{
      userId: string;
      eventId: string;
      user: { interests: string[] };
    }>,
    currentInterests: string[],
    eventId: string,
    currentUserId: string
  ) {
    return likes.some((like) => {
      if (like.eventId !== eventId || like.userId === currentUserId) {
        return false;
      }

      return like.user.interests.some((interest) => currentInterests.includes(interest));
    });
  }

  private distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const radius = 6371;
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
  }
}

