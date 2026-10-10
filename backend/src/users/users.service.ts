import { Injectable, NotFoundException } from "@nestjs/common";
import { InterestCategory, UserProfile } from "@thirdspace/shared";
import { PrismaService } from "../common/config/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      city: user.city ?? undefined,
      latitude: user.latitude ?? undefined,
      longitude: user.longitude ?? undefined,
      interests: user.interests as InterestCategory[]
    };
  }

  async setMockEmbedding(userId: string, interests: string[]) {
    const vector = this.buildMockVector(interests);
    await this.prisma.$executeRawUnsafe(
      `UPDATE "User" SET "embedding" = $1::vector WHERE "id" = $2`,
      vector,
      userId
    );
  }

  buildMockVector(interests: string[]) {
    const seed = interests.reduce((acc, item) => acc + item.length, 0);
    return `[${Array.from({ length: 8 }, (_, index) => ((seed + index) % 10) / 10).join(",")}]`;
  }
}

