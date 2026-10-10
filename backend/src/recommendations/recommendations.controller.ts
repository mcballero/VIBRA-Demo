import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtUser } from "../auth/interfaces/jwt-user.interface";
import { RecommendationsService } from "./recommendations.service";

@Controller("feed")
@UseGuards(JwtAuthGuard)
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get()
  getFeed(@CurrentUser() user: JwtUser) {
    return this.recommendationsService.getFeedForUser(user.sub);
  }
}

