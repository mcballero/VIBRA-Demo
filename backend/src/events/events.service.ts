import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/config/prisma.service";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(category?: string, city?: string) {
    return this.prisma.event.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(city ? { city } : {})
      },
      orderBy: [{ startsAt: "asc" }]
    });
  }

  async findById(eventId: string) {
    return this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        rsvps: true,
        feedback: true
      }
    });
  }
}

