import { Controller, Get, NotFoundException, Param, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { EventsService } from "./events.service";

@Controller("events")
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  list(@Query("category") category?: string, @Query("city") city?: string) {
    return this.eventsService.list(category, city);
  }

  @Get(":id")
  async detail(@Param("id") id: string) {
    const event = await this.eventsService.findById(id);
    if (!event) {
      throw new NotFoundException("Event not found");
    }
    return event;
  }
}
