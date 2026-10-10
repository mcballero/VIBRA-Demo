import { Module, forwardRef } from "@nestjs/common";
import { RecommendationsModule } from "../recommendations/recommendations.module";
import { EngagementController } from "./engagement.controller";
import { EngagementService } from "./engagement.service";

@Module({
  imports: [forwardRef(() => RecommendationsModule)],
  controllers: [EngagementController],
  providers: [EngagementService]
})
export class EngagementModule {}
