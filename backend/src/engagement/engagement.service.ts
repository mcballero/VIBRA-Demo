import { Injectable } from "@nestjs/common";
import { FeedbackReaction, RsvpStatus } from "@prisma/client";
import { PrismaService } from "../common/config/prisma.service";
import { RecommendationsService } from "../recommendations/recommendations.service";
import { FeedbackDto } from "./dto/feedback.dto";
import { RsvpDto } from "./dto/rsvp.dto";

@Injectable()
export class EngagementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recommendationsService: RecommendationsService
  ) {}

  async rsvp(userId: string, dto: RsvpDto) {
    const record = await this.prisma.rSVP.upsert({
      where: {
        userId_eventId: {
          userId,
          eventId: dto.eventId
        }
      },
      update: {
        status: (dto.status ?? "GOING") as RsvpStatus
      },
      create: {
        userId,
        eventId: dto.eventId,
        status: (dto.status ?? "GOING") as RsvpStatus
      }
    });

    await this.recommendationsService.invalidateFeed(userId);
    return record;
  }

  async feedback(userId: string, dto: FeedbackDto) {
    const record = await this.prisma.feedback.upsert({
      where: {
        userId_eventId_reaction: {
          userId,
          eventId: dto.eventId,
          reaction: dto.reaction as FeedbackReaction
        }
      },
      update: {
        reaction: dto.reaction as FeedbackReaction
      },
      create: {
        userId,
        eventId: dto.eventId,
        reaction: dto.reaction as FeedbackReaction
      }
    });

    await this.recommendationsService.invalidateFeed(userId);
    return record;
  }
}

