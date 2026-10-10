import { Module } from "@nestjs/common";
import { EventsModule } from "../events/events.module";
import { UsersModule } from "../users/users.module";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

@Module({
  imports: [UsersModule, EventsModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService]
})
export class RecommendationsModule {}

