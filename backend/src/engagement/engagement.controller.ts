import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtUser } from "../auth/interfaces/jwt-user.interface";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { FeedbackDto } from "./dto/feedback.dto";
import { RsvpDto } from "./dto/rsvp.dto";
import { EngagementService } from "./engagement.service";

@Controller()
@UseGuards(JwtAuthGuard)
export class EngagementController {
  constructor(private readonly engagementService: EngagementService) {}

  @Post("rsvp")
  rsvp(@CurrentUser() user: JwtUser, @Body() dto: RsvpDto) {
    return this.engagementService.rsvp(user.sub, dto);
  }

  @Post("feedback")
  feedback(@CurrentUser() user: JwtUser, @Body() dto: FeedbackDto) {
    return this.engagementService.feedback(user.sub, dto);
  }
}

