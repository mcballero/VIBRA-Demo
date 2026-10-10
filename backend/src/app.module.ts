import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppConfigModule } from "./common/config/app-config.module";
import { PrismaService } from "./common/config/prisma.service";
import { RedisService } from "./common/config/redis.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { EventsModule } from "./events/events.module";
import { RecommendationsModule } from "./recommendations/recommendations.module";
import { EngagementModule } from "./engagement/engagement.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "backend/.env"]
    }),
    AppConfigModule,
    AuthModule,
    UsersModule,
    EventsModule,
    RecommendationsModule,
    EngagementModule
  ],
  providers: [PrismaService, RedisService]
})
export class AppModule {}

